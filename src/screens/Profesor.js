import React, { useState } from "react";
import { Text, Image } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  HStack,
  Input,
  Button,
  Link,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Alumno = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const bgColor = useColorModeValue(
    "light.background.50",
    "dark.background.900"
  );
  const textColor = useColorModeValue("light.text.50", "dark.text.50");
  const linkColor = useColorModeValue("green.500", "green.300");

  const flexDir = useBreakpointValue({ base: "column", lg: "row" });

  const handleLogin = async () => {
    if (email && password) {
      try {
        // Realiza la solicitud POST a la API
        const response = await axios.post(
          "http://192.168.1.3:3005/users/login",
          {
            usuario: email,
            contra: password,
            tipo: 1,
          }
        );

        // Si la API responde correctamente, maneja el token y navega
        if (response.data && response.data.token) {
          console.log("Login exitoso, token:", response.data.token);
          setErrorMessage(""); // Limpia el mensaje de error
          navigation.navigate("MainTab"); // Navega a la pantalla principal
        }
      } catch (error) {
        console.error("Error en la autenticación:", error);
        // Muestra un mensaje de error basado en la respuesta
        if (error.response && error.response.data) {
          setErrorMessage(`Error: ${error.response.data.message}`);
        } else {
          setErrorMessage("Error de conexión. Por favor, intenta más tarde.");
        }
      }
    } else {
      setErrorMessage("LLENAR LOS CAMPOS SON NECESARIOS"); // Muestra alerta si faltan credenciales
    }
  };

  return (
    <Center w="100%" bg={bgColor} flex={1}>
      <Image
        source={require("../../assets/Rectangle60.png")}
        style={{ width: "100%", height: 200, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color={textColor}>
          Welcome
        </Heading>
        <Heading mt="1" color={textColor} fontWeight="medium" size="xs">
          Sign in to continue Profesor!
        </Heading>

        <VStack space={3} mt="5" flexDirection={flexDir}>
          <FormControl>
            <FormControl.Label>User</FormControl.Label>
            <Input value={email} onChangeText={setEmail} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "1000",
                color: linkColor,
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="green" onPress={handleLogin}>
            Login
          </Button>
          {errorMessage && <Text>{errorMessage}</Text>}
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color={textColor}>
              I'm a new user.
              <Button
                variant="link"
                colorScheme="green"
                onPress={() => navigation.navigate("Register")}
              >
                Register
              </Button>
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Alumno;
