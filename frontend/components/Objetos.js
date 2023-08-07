import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ObjetosComponent = () => {
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    const fetchObjetos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/objeto');
        setObjetos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchObjetos();
  }, []);

  return (
    <View>
      <Text>Listado de Objetos:</Text>
      <FlatList
        data={objetos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.nombre}</Text>}
      />
    </View>
  );
};


  

export default ObjetosComponent;