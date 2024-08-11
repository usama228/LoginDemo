import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

const userList = [
  {
    id: 1,
    role: "SA",
    name: "Jason Alexander",
    username: "jason_alexander",
    email: "jason@ui-lib.com",
    avatar: "/assets/images/face-6.jpg",
    password: "password123" // Add a password field for the mock user
  }
];

mock.onPost("/api/auth/login").reply(async (config) => {
  try {
    const { name, password } = JSON.parse(config.data);
    const user = userList.find((u) => u.name === name && u.password === password);

    if (!user) return [400, { message: "Invalid name or password" }];

    const payload = { user };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

mock.onPost("/api/auth/register").reply((config) => {
  try {
    const { name, email, password } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (user) return [400, { message: "User already exists!" }];

    const newUser = {
      id: userList.length + 1,
      role: "GUEST",
      name,
      email,
      password,
      username: name,
      avatar: "/assets/images/face-6.jpg"
    };

    userList.push(newUser);

    const payload = { user: newUser };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

mock.onGet("/api/auth/profile").reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: "Invalid Authorization token" }];
    }

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});

export default mock;
