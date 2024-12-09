import React from 'react';
import { Center, Box, Button, Image, VStack, useBreakpointValue, useColorModeValue } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  const navigation = useNavigation();

  const flexDir = useBreakpointValue({ base: 'column', lg: 'row' });
  const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
  const buttonBgColor = useColorModeValue('green.500', 'green.300');
  const buttonHoverColor = useColorModeValue('green.600', 'green.400');
  const buttonTextColor = useColorModeValue('white', 'black');
  return (
    <Center flex={1} w="100%" bg={bgColor}>
      {/* Logo centrado */}
      <Image
        source={require('../../assets/Rectangle60.png')}  // Cambia a la ruta de tu logo
         alt="Rectangle60"
         style={{
         marginBottom: 70,
          width: 250,  // Ajusta el tamaño a lo que necesites
          height: 250, // Ajusta el tamaño a lo que necesites
         }}
         />
      
      {/* Tres recuadros con botones cuadrados */}
      <VStack space={4} alignItems="center" w="80%">
        <Box width="100%" alignItems="center">
          <Button
            onPress={() => navigation.navigate('PasedeLista')}  // Cambia 'Lista' por 'Pasedelista'
            size="lg"
            colorScheme="green"
            width="90%"
            height={50}
            borderRadius="0"  // Hacer el botón cuadrado
            bg={buttonBgColor}
            _hover={{ bg: buttonHoverColor }}
            _text={{ color: buttonTextColor, fontWeight: 'bold' }}
            shadow={3}>
            Pase de Lista
          </Button>
        </Box>

        <Box width="100%" alignItems="center">
          <Button
            onPress={() => navigation.navigate('GruposProfesor')}  // Redirige a GruposProfesor
            size="lg"
            colorScheme="green"
            width="90%"
            height={50}
            borderRadius="0"  // Hacer el botón cuadrado
            bg={buttonBgColor}
            _hover={{ bg: buttonHoverColor }}
            _text={{ color: buttonTextColor, fontWeight: 'bold' }}
            shadow={3}
          >
            Profesor
          </Button>
        </Box>
      </VStack>
    </Center>
  );
};

export default Inicio;
