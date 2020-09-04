import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
} from "react-native";

import SessionNavbar from "./../security/SessionNavbar";

export default class Publicaiones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      mangas: [],
      url:
        'http://127.1.1.1:3000/publicaciones',
    };
  }

  componentDidMount = () => {
    this.getProducts();
  };

  getProducts = () => {
    this.setState({ loading: true });
    fetch(this.state.url)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          mangas: data,
          loading: false,
        });
      })
      .catch((err) => {
        //console.log(err);
        Alert.alert("Error", "Error loading mangas.");
      });
  };

  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      return (
        <View style={styles.dataViewLoading}>
          <Text>Cargando,espere por favor.</Text>

                    <Button
          title="Ir al login"
          onPress={()=>this.props.navigation.navigate("Login")}
          />

        </View>
      );
    } else {
      return (

        <View style={styles.mangasView}>
          <SessionNavbar navigation={navigation}></SessionNavbar>
          <Text style={{ color: "orange", fontSize: 25 }}>Publicaciones</Text>
          <FlatList
            style={styles.flatList}
            data={this.state.mangas}
            renderItem={({ item }) => (
              <View style={styles.mangaViewContent}>

                <Text style={styles.mangaName}>Usuario: {item.usuarioId}</Text>
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert("Image Tapped", `manga: ${item.name}`);
                  }}
                >

                  <Image
                    source={{
                      width: 600,
                      height: 400,
                      uri: `${item.urlImagen}`,
                    }}
                  />
                </TouchableHighlight>
                <Text >{item.texto}</Text>

                
              </View>
            )}
          ></FlatList>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mangaViewContent: {
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
  },
  mangaName: {
    fontSize: 18,
    color: "#ff0000",
  },
  mangasView: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  dataViewLoading: {
    alignItems: "center",
    alignContent: "center",
    flex: 1,
  },
  button: {
    alignSelf: "center",
    alignContent: "flex-start",
  },
  itemTitle: {
    padding: 10,
    fontSize: 25,
    height: 44,
    fontWeight: "bold",
  },
  flatList: {
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
  separator: {
    height: 4,
    backgroundColor: "black",
    width: Dimensions.get("window").width / 2,
  },
});
