import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/Main";
import LoginScreen from "./app/security/Login";
import RegistroScreen from "./app/security/Registro";
import PublicacionScreen from "./app/screens/Publicaciones";
import FormularioScreen from "./app/screens/Formulario";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Publicaciones" component={PublicacionScreen} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
