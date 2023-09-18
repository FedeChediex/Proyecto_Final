import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newObject, setNewObject] = useState({ Nombre: '', Categoria: '' });
  const [isAddingObject, setIsAddingObject] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/objeto');
        setCategorias(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de objetos:', error);
        // Puedes manejar el error de la forma que desees, como mostrar un mensaje de error.
        Alert.alert('Error', 'No se pudo cargar la lista de objetos.');
      }
    };

    fetchCategorias();
  }, []);

  const updateObjectState = async (itemId) => {
    try {
      await axios.put(`http://localhost:3000/objeto/${itemId}`, { Estado: 'Prestado' });
      setShowModal(false);
      // Actualiza el estado local para reflejar el cambio de estado.
      setCategorias((prevCategorias) =>
        prevCategorias.map((item) => {
          if (item.Id === itemId) {
            return { ...item, Estado: 'Prestado' };
          }
          return item;
        })
      );
    } catch (error) {
      console.error('Error al actualizar el estado del objeto:', error);
      // Puedes manejar el error de la forma que desees, como mostrar un mensaje de error.
      Alert.alert('Error', 'No se pudo actualizar el estado del objeto.');
    }
  };

  const addObject = async () => {
    try {
      // Realiza una solicitud POST al servidor para agregar un nuevo objeto
      const response = await axios.post('http://localhost:3000/objeto', {
        Nombre: newObject.Nombre,
        Categoria: newObject.Categoria,
      });

      // Agrega el nuevo objeto a la lista de objetos local
      setCategorias((prevCategorias) => [...prevCategorias, response.data]);

      // Limpia el formulario después de agregar el objeto
      setNewObject({ Nombre: '', Categoria: '' });
      setIsAddingObject(false);
    } catch (error) {
      console.error('Error al agregar el objeto:', error);
      // Puedes manejar el error de la forma que desees, como mostrar un mensaje de error.
      Alert.alert('Error', 'No se pudo agregar el objeto.');
    }
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (selectedItem) {
      updateObjectState(selectedItem.Id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Listado de Objetos:</Text>
      </View>
      <View style={styles.addButtonContainer}>
        <Button title="Agregar Objeto" onPress={() => setIsAddingObject(true)} />
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

      <Modal visible={isAddingObject} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Agregar Objeto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Objeto"
            value={newObject.Nombre}
            onChangeText={(text) => setNewObject({ ...newObject, Nombre: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoría del Objeto"
            value={newObject.Categoria}
            onChangeText={(text) => setNewObject({ ...newObject, Categoria: text })}
          />
          <Button title="Guardar" onPress={addObject} />
          <Button title="Cancelar" onPress={() => setIsAddingObject(false)} />
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
  addButtonContainer: {
    marginBottom: 10,
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default App;