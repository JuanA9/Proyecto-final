import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider, VStack, useColorModeValue } from 'native-base';
import theme from './theme';
import ToggleDarkMode from './ToggleDarkMode';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Inicio from './src/screens/Inicio';
import Scanner from './src/screens/Scanner';
import Usuario from './src/screens/Usuario';
import Historial from './src/screens/Historial';
import Config from './src/screens/Config';
import Register from './src/screens/Register';
import Register2 from './src/screens/RegisterAlumno';
import Login from './src/screens/Login';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import PasedeLista from './src/screens/PasedeLista';
import Grupos from './src/screens/Grupos';
import GruposProfesor from './src/screens/GruposProfesor';
import Alumno from "./src/screens/Alumno";
import Profesor from "./src/screens/Profesor";
import { AsistenciaProvider } from './src/context/AsistenciaContext'; // Corrige la importación del proveedor del contexto

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Scanner') iconName = focused ? 'scan' : 'scan-outline';
          else if (route.name === 'Usuario') iconName = focused ? 'person' : 'person-outline';
          else if (route.name === 'Historial') iconName = focused ? 'time' : 'time-outline';
          else if (route.name === 'Config') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
      <Tab.Screen name="Usuario" component={Usuario} options={{ headerShown: false }} />
      <Tab.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
      <Tab.Screen name="Historial" component={Historial} options={{ headerShown: false }} />
      <Tab.Screen name="Config" component={Config} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NativeBaseProvider theme={theme}>
      <AsistenciaProvider> {/* Proveedor del contexto envuelve la navegación */}
        <NavigationContainer>
          <VStack flex={1} bg={useColorModeValue("light.background.50", "dark.background.900")}>
            <Box safeAreaTop bg={useColorModeValue('light.background.100', 'dark.background.900')}>
              <ToggleDarkMode />
            </Box>
            <Stack.Navigator initialRouteName={isAuthenticated ? "MainTab" : "RoleSelectionScreen"}>
              <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {() => <Login setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="Register" options={{ headerShown: false }}>
                {() => <Register setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="Register2" options={{ headerShown: false }}>
                {() => <Register2 setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="PasedeLista" component={PasedeLista} options={{ headerShown: false }} />
              <Stack.Screen name="Grupos" component={Grupos} options={{ headerShown: false }} />
              <Stack.Screen name="GruposProfesor" component={GruposProfesor} options={{ headerShown: false }} />
              <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
              <Stack.Screen name="Profesor" component={Profesor} options={{ headerShown: false }} />
              <Stack.Screen name="Alumno" component={Alumno} options={{ headerShown: false }} />
              <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
            </Stack.Navigator>
          </VStack>
        </NavigationContainer>
      </AsistenciaProvider>
    </NativeBaseProvider>
  );
};

export default App;
