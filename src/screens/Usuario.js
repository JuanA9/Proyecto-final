// Card
import React from 'react';
import { FlatList, Box, Text } from 'native-base';
import { Swipeable } from 'react-native-gesture-handler';

const recipes = [
  { id: '1', title: 'Grupo 1', description: 'Rico en sabor y fácil de preparar.' },
  { id: '2', title: 'Grupo 2', description: 'Refrescante y perfecta para el verano.' },
  { id: '3', title: 'Grupo 3', description: 'Tradicionales y llenos de sabor.' },
];

const Usuario = () => {
  const renderRightActions = () => (
    <Box
      bg="red.500"
      justifyContent="center"
      alignItems="flex-end"
      px="5"
      height="100%"
    >
      <Text color="white" fontSize="md">
        Eliminar
      </Text>
    </Box>
  );

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Swipeable renderRightActions={renderRightActions}>
          <Box bg="black" px="4" py="3" borderBottomWidth="1" borderColor="coolGray.200">
            <Text fontSize="lg">{item.title}</Text>
          </Box>
        </Swipeable>
      )}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  );
};

export default Usuario;
