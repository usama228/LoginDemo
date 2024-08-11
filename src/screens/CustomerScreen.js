import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FAB, Checkbox } from 'react-native-paper';

const CustomerScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([
    {
      id: '1',
      name: 'John Doe',
      number: '1234567890',
      email: 'john@example.com',
      sizes: {
        pant: { selected: false, waist: '', bottom: '', length: '', alteration: '' },
        waistcoat: { selected: false, collar: '', chest: '' },
        shalwarKameez: { selected: false, collar: '', chest: '', shoulders: '' },
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      number: '0987654321',
      email: 'jane@example.com',
      sizes: {
        pant: { selected: false, waist: '', bottom: '', length: '', alteration: '' },
        waistcoat: { selected: false, collar: '', chest: '' },
        shalwarKameez: { selected: false, collar: '', chest: '', shoulders: '' },
      },
    },
  ]);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    id: '',
    name: '',
    number: '',
    email: '',
    sizes: {
      pant: { selected: false, waist: '', bottom: '', length: '', alteration: '' },
      waistcoat: { selected: false, collar: '', chest: '' },
      shalwarKameez: { selected: false, collar: '', chest: '', shoulders: '' },
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = customers.filter(customer => customer.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.number && newCustomer.email) {
      if (isEdit) {
        setCustomers(customers.map(customer => (customer.id === newCustomer.id ? newCustomer : customer)));
        setFilteredCustomers(customers.map(customer => (customer.id === newCustomer.id ? newCustomer : customer)));
      } else {
        const newCustomerId = (customers.length + 1).toString();
        setCustomers([...customers, { ...newCustomer, id: newCustomerId }]);
        setFilteredCustomers([...customers, { ...newCustomer, id: newCustomerId }]);
      }
      setNewCustomer({
        id: '',
        name: '',
        number: '',
        email: '',
        sizes: {
          pant: { selected: false, waist: '', bottom: '', length: '', alteration: '' },
          waistcoat: { selected: false, collar: '', chest: '' },
          shalwarKameez: { selected: false, collar: '', chest: '', shoulders: '' },
        },
      });
      setModalVisible(false);
      setIsEdit(false);
    }
  };

  const handleEditCustomer = (customer) => {
    setNewCustomer(customer);
    setModalVisible(true);
    setIsEdit(true);
  };

  const handleDeleteCustomer = (id) => {
    Alert.alert(
      'Delete Customer',
      'Are you sure you want to delete this customer?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedCustomers = customers.filter(customer => customer.id !== id);
            setCustomers(updatedCustomers);
            setFilteredCustomers(updatedCustomers);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleSizeChange = (type, field, value) => {
    setNewCustomer({
      ...newCustomer,
      sizes: {
        ...newCustomer.sizes,
        [type]: { ...newCustomer.sizes[type], [field]: value },
      },
    });
  };

  const handleCheckboxChange = (type) => {
    setNewCustomer({
      ...newCustomer,
      sizes: {
        ...newCustomer.sizes,
        [type]: { ...newCustomer.sizes[type], selected: !newCustomer.sizes[type].selected },
      },
    });
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setDetailsVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Customers"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCustomers}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.customerItem}>
            <Text style={styles.customerNumber}>{index + 1}.</Text>
            <View style={styles.customerInfo}>
              <TouchableOpacity onPress={() => handleViewDetails(item)}>
                <Text style={styles.customerText}>{item.name}</Text>
              </TouchableOpacity>
              <Text style={styles.customerText}>{item.number}</Text>
              <Text style={styles.customerText}>{item.email}</Text>
            </View>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => handleEditCustomer(item)}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDeleteCustomer(item.id)}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsEdit(false);
        }}
      >
        <ScrollView contentContainerStyle={styles.modalView}>
          <Text style={styles.modalText}>{isEdit ? 'Edit Customer' : 'Add New Customer'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newCustomer.name}
            onChangeText={text => setNewCustomer({ ...newCustomer, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Number"
            value={newCustomer.number}
            onChangeText={text => setNewCustomer({ ...newCustomer, number: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newCustomer.email}
            onChangeText={text => setNewCustomer({ ...newCustomer, email: text })}
          />
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={newCustomer.sizes.pant.selected ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('pant')}
            />
            <Text style={styles.checkboxLabel}>Pant</Text>
          </View>
          {newCustomer.sizes.pant.selected && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Waist"
                value={newCustomer.sizes.pant.waist}
                onChangeText={text => handleSizeChange('pant', 'waist', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Bottom"
                value={newCustomer.sizes.pant.bottom}
                onChangeText={text => handleSizeChange('pant', 'bottom', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Length"
                value={newCustomer.sizes.pant.length}
                onChangeText={text => handleSizeChange('pant', 'length', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Alteration"
                value={newCustomer.sizes.pant.alteration}
                onChangeText={text => handleSizeChange('pant', 'alteration', text)}
              />
            </>
          )}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={newCustomer.sizes.waistcoat.selected ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('waistcoat')}
            />
            <Text style={styles.checkboxLabel}>Waistcoat</Text>
          </View>
          {newCustomer.sizes.waistcoat.selected && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Collar"
                value={newCustomer.sizes.waistcoat.collar}
                onChangeText={text => handleSizeChange('waistcoat', 'collar', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Chest"
                value={newCustomer.sizes.waistcoat.chest}
                onChangeText={text => handleSizeChange('waistcoat', 'chest', text)}
              />
            </>
          )}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={newCustomer.sizes.shalwarKameez.selected ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('shalwarKameez')}
            />
            <Text style={styles.checkboxLabel}>Shalwar Kameez</Text>
          </View>
          {newCustomer.sizes.shalwarKameez.selected && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Collar"
                value={newCustomer.sizes.shalwarKameez.collar}
                onChangeText={text => handleSizeChange('shalwarKameez', 'collar', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Chest"
                value={newCustomer.sizes.shalwarKameez.chest}
                onChangeText={text => handleSizeChange('shalwarKameez', 'chest', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Shoulders"
                value={newCustomer.sizes.shalwarKameez.shoulders}
                onChangeText={text => handleSizeChange('shalwarKameez', 'shoulders', text)}
              />
            </>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddCustomer}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false);
                setIsEdit(false);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailsVisible}
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Customer Details</Text>
          {selectedCustomer && (
            <>
              <Text style={styles.customerDetailsText}>Name: {selectedCustomer.name}</Text>
              <Text style={styles.customerDetailsText}>Number: {selectedCustomer.number}</Text>
              <Text style={styles.customerDetailsText}>Email: {selectedCustomer.email}</Text>
              {selectedCustomer.sizes.pant.selected && (
                <>
                  <Text style={styles.sizeTitle}>Pant Sizes:</Text>
                  <Text style={styles.sizeDetails}>Waist: {selectedCustomer.sizes.pant.waist}</Text>
                  <Text style={styles.sizeDetails}>Bottom: {selectedCustomer.sizes.pant.bottom}</Text>
                  <Text style={styles.sizeDetails}>Length: {selectedCustomer.sizes.pant.length}</Text>
                  <Text style={styles.sizeDetails}>Alteration: {selectedCustomer.sizes.pant.alteration}</Text>
                </>
              )}
              {selectedCustomer.sizes.waistcoat.selected && (
                <>
                  <Text style={styles.sizeTitle}>Waistcoat Sizes:</Text>
                  <Text style={styles.sizeDetails}>Collar: {selectedCustomer.sizes.waistcoat.collar}</Text>
                  <Text style={styles.sizeDetails}>Chest: {selectedCustomer.sizes.waistcoat.chest}</Text>
                </>
              )}
              {selectedCustomer.sizes.shalwarKameez.selected && (
                <>
                  <Text style={styles.sizeTitle}>Shalwar Kameez Sizes:</Text>
                  <Text style={styles.sizeDetails}>Collar: {selectedCustomer.sizes.shalwarKameez.collar}</Text>
                  <Text style={styles.sizeDetails}>Chest: {selectedCustomer.sizes.shalwarKameez.chest}</Text>
                  <Text style={styles.sizeDetails}>Shoulders: {selectedCustomer.sizes.shalwarKameez.shoulders}</Text>
                </>
              )}
            </>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setDetailsVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10,
  },
  searchBar: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  customerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  customerNumber: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerInfo: {
    flex: 1,
  },
  customerText: {
    fontSize: 16,
  },
  actionButton: {
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#FFA500',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
  },
  actionButtonText: {
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customerDetailsText: {
    fontSize: 16,
    marginVertical: 2,
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  sizeDetails: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default CustomerScreen;
