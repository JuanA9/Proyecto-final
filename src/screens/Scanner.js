import React, { useState } from 'react';
import { Box, Text, Button } from 'native-base';

const Scanner = () => {
  const recipes = [
    { 
      id: '1', 
      title: 'Grupo 1', 
      description: 'Negocios Electrónicos', 
      schedule: 'Lunes y Miércoles: 10:00 AM - 12:00 PM' 
    },
    { 
      id: '2', 
      title: 'Grupo 2', 
      description: 'Seguridad en Aplicaciones', 
      schedule: 'Martes y Jueves: 2:00 PM - 4:00 PM' 
    },
    { 
      id: '3', 
      title: 'Grupo 3', 
      description: 'Aplicaciones Multiplataforma', 
      schedule: 'Viernes: 8:00 AM - 11:00 AM' 
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <Box flex={1} bg="gray.100" p="4">
      {recipes.map((recipe) => (
        <Box key={recipe.id} bg="white" shadow={2} borderRadius="10" p="4" mb="4">
          <Text fontSize="lg" fontWeight="bold">
            {recipe.title}
          </Text>
          <Text mt="2" color="gray.500">
            {recipe.description}
          </Text>
          {selectedGroup === recipe.id ? (
            <Text mt="2" color="primary.600" fontSize="md">
              {recipe.schedule}
            </Text>
          ) : (
            <Button
              mt="4"
              variant="outline"
              colorScheme="primary"
              onPress={() => setSelectedGroup(recipe.id)}
            >
              Ver más
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Scanner;
