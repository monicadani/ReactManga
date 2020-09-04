import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, Alert, Button, AsyncStorage,View } from "react-native";

export default class SessionNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoggedIn: false,
    name: "",
  };

  async componentDidMount() {
    let session = await AsyncStorage.getItem("session");

    if (session) {
      
      this.setState({
        isLoggedIn: true,
        name: JSON.parse(session).data.nombre_usuario,
      });
    }
  }

  signOut = () => {

          AsyncStorage.removeItem("session");
          this.setState({
            isLoggedIn: false,
            name: "",
          });
          this.props.navigation.navigate("Home")
          

  };

  render() {
    if (this.state.isLoggedIn) {
      return (      
        <View>
          <Text style={styles.userText}>Bienvenido {this.state.name}</Text>
        <View style={styles.container}>
          <Button
            title="Ir a publicaciones"
            onPress={() => this.props.navigation.navigate("Publicaciones")}
          />
          <Button
            title="Contacto"
            onPress={() => this.props.navigation.navigate("Formulario")}
          />
          <Button
            title="Cerrar sesion"
            onPress={this.signOut}
          />

        </View>
        </View>
        
        );
    } else {
      return (
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 50,
    zIndex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-manga'
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40
  }  
  ,  userText: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
});
