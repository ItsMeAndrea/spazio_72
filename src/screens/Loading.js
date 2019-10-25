import _ from "lodash";
import React, { Component } from "react";
import app from "../firebase/firebaseConfig";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

class Loading extends Component {
  componentDidMount() {
    app.auth().onAuthStateChanged(user => {
      user ? this.authUser() : this.props.navigation.navigate("Auth");
    });
  }

  authUser() {
    const { currentUser } = app.auth();
    const auth = currentUser.emailVerified;
    auth
      ? app
          .database()
          .ref(`usuarios/${currentUser.uid}/datos`)
          .on("value", snapshot => {
            const usuario = snapshot.val();
            this.props.navigation.navigate(usuario.isAdmin ? "Admin" : "App");
          })
      : this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoStyle}
          source={require("../images/logo.png")}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282828"
  },
  logoStyle: {
    width: 350,
    height: 80
  }
});

export default Loading;
