import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <Icon name="users" size={30} color="#6200EE" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>New Leads</Text>
            <Text style={styles.cardValue}>3050</Text>
          </View>
          <Icon name="arrow-right" size={20} color="#ccc" />
        </View>

        <View style={styles.card}>
          <Icon name="dollar" size={30} color="#6200EE" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>This week Sales</Text>
            <Text style={styles.cardValue}>$80,500</Text>
          </View>
          <Icon name="arrow-right" size={20} color="#ccc" />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Icon name="archive" size={30} color="#6200EE" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Inventory Status</Text>
            <Text style={styles.cardValue}>8.5% Stock Surplus</Text>
          </View>
          <Icon name="arrow-right" size={20} color="#ccc" />
        </View>

        <View style={styles.card}>
          <Icon name="shopping-cart" size={30} color="#6200EE" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Orders to deliver</Text>
            <Text style={styles.cardValue}>305 Orders</Text>
          </View>
          <Icon name="arrow-right" size={20} color="#ccc" />
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Active Users</Text>
        <Text style={styles.cardValue}>10.8k</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Transactions</Text>
        <Text style={styles.cardValue}>$2.8M</Text>
      </View>

      <View style={styles.table}>
        <Text style={styles.tableTitle}>Top Selling Products</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Pic</Text>
          <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Title</Text>
          <Text style={[styles.tableHeaderCell, { flex: 4 }]}>Description</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Price</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5 }]}>Count</Text>
        </View>
        {['Product 1', 'Product 2', 'Product 3'].map((product, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Pic</Text>
            <Text style={[styles.tableCell, { flex: 3 }]}>{product}</Text>
            <Text style={[styles.tableCell, { flex: 4 }]}>Description</Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>Price</Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>count</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  table: {
    marginTop: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
});

export default HomeScreen;
