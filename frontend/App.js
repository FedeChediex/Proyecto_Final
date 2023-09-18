import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/categoria');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategorias(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorias();
  }, []);

  const renderCategoria = ({ item }) => (
    <View style={styles.categoryBox}>
      <Text style={styles.category}>{item.Nombre}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Listado de Categorías:</Text>
      </View>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderCategoria}
      />
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
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default App;