import React from 'react';
import { View, Text, FlatList } from 'react-native';

const Categorias = () => {
  return (
    <View>
      <FlatList
        data={categorias} 
        renderItem={({item}) => {
          return <Text>{item.title}</Text>
        }}
      />
    </View>
  );
};


  

export default Categorias;
