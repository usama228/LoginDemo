import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Modal, FlatList } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState([{ title: '', price: '' }]);
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState(null);

  const addItemSize = () => {
    setSizes([...sizes, { title: '', price: '' }]);
  };

  const handleImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setImage(response.assets[0]);
      }
    });
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = sizes.slice();
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleSubmit = () => {
    if (title && description && price && image) {
      const newItem = { title, description, price, image, sizes };
      if (editMode) {
        const updatedItems = items.slice();
        updatedItems[editingItemIndex] = newItem;
        setItems(updatedItems);
        setEditMode(false);
      } else {
        setItems([...items, newItem]);
      }
      resetForm();
      setModalVisible(false);
    } else {
      Alert.alert('Error', 'Please fill all required fields');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
    setSizes([{ title: '', price: '' }]);
    setEditingItemIndex(null);
  };

  const editItem = (index) => {
    const item = items[index];
    setTitle(item.title);
    setDescription(item.description);
    setPrice(item.price);
    setSizes(item.sizes);
    setImage(item.image);
    setEditMode(true);
    setEditingItemIndex(index);
    setModalVisible(true);
  };

  const deleteItem = (index) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item permanently?',
      [
        {
          text: 'No',
          onPress: () => console.log('Deletion cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const updatedItems = items.filter((_, i) => i !== index);
            setItems(updatedItems);
            console.log('Item deleted');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Button title="Add Item" onPress={() => setModalVisible(true)} color="#007bff" />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image.uri }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{`${index + 1}. ${item.title}`}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              {item.sizes.map((size, idx) => (
                <Text key={idx} style={styles.itemSize}>{`Size: ${size.title}, Price: $${size.price}`}</Text>
              ))}
            </View>
            <View style={styles.actionButtons}>
              <Button title="Edit" onPress={() => editItem(index)} color="#007bff" />
              <Button title="Delete" onPress={() => deleteItem(index)} color="#ff4444" />
            </View>
          </View>
        )}
      />
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity onPress={handleImagePicker}>
            <View style={styles.imageContainer}>
              {image ? <Image source={{ uri: image.uri }} style={styles.image} /> : <Text>Select Image</Text>}
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title *"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description *"
          />
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Price *"
            keyboardType="numeric"
          />
          <Text style={styles.itemSizeLabel}>Item Sizes</Text>
          {sizes.map((size, index) => (
            <View key={index}>
              <TextInput
                style={styles.input}
                value={size.title}
                onChangeText={value => handleSizeChange(index, 'title', value)}
                placeholder="Size Title *"
              />
              <TextInput
                style={styles.input}
                value={size.price}
                onChangeText={value => handleSizeChange(index, 'price', value)}
                placeholder="Size Price *"
                keyboardType="numeric"
              />
            </View>
          ))}
          <Button title="+ Add Size" onPress={addItemSize} />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={() => { resetForm(); setModalVisible(false); }} color="#ff9800" />
            <Button title={editMode ? "Save Changes" : "Add"} onPress={handleSubmit} color="#007bff" />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemSizeLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 16,
    color: '#777',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
  },
  itemSize: {
    fontSize: 14,
    color: '#555',
  },
  actionButtons: {
    flexDirection: 'column',
  },
});

export default ItemScreen;
