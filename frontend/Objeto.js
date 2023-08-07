import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';

const App = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/objeto/categoria/1');
        setCategorias(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorias();
  }, []);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleConfirm = () => {
    
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Listado de Objetos:</Text>
      </View>
      <View style={styles.categoryBox}>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
              <Text style={styles.category}>{item.Nombre}</Text>
              <Button title="Solicitar Préstamo" onPress={() => handleItemPress(item)} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Confirmar solicitud de préstamo para:</Text>
          <Text style={styles.modalSelectedItem}>{selectedItem ? selectedItem.Nombre : ''}</Text>
          <Button title="Confirmar" onPress={handleConfirm} />
          <Button title="Cancelar" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'blue',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryBox: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
  },
  separator: {
    height: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSelectedItem: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;