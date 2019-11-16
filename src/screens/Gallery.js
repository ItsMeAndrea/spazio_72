import React, { Component } from "react";
import { Image, Linking } from "react-native";
import {
  View,
  DeckSwiper,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Button
} from "native-base";

class Gallery extends Component {
  static navigationOptions = {
    title: "Galeria ",
    headerStyle: {
      backgroundColor: "#282828"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  onButtonPress() {
    Linking.openURL("https://www.instagram.com/spazio72");
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#282828" }}>
        <Text
          style={{
            marginHorizontal: 30,
            color: "white",
            textAlign: "center",
            marginVertical: 20
          }}
        >
          Estos son algunos looks exitosos de nuestros clientes
        </Text>
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item => (
              <Card style={{ elevation: 3 }}>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
              </Card>
            )}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            justifyContent: "space-between",
            padding: 15
          }}
        >
          <Text style={{ width: 180, fontSize: 12, color: "white" }}>
            Para ver mas de nosotros ingresa a nuestro instragram
          </Text>
          <Button transparent onPress={() => this.onButtonPress()}>
            <Text style={{ color: "#D5C046" }}>@spazio72</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const cards = [
  {
    image: require("../images/instagram-1.png")
  },
  {
    image: require("../images/instagram-2.png")
  },
  {
    image: require("../images/instagram-3.png")
  },
  {
    image: require("../images/instagram-4.png")
  },
  {
    image: require("../images/instagram-5.png")
  },
  {
    image: require("../images/instagram-6.png")
  },
  {
    image: require("../images/instagram-7.png")
  },
  {
    image: require("../images/instagram-8.png")
  },
  {
    image: require("../images/instagram-9.png")
  },
  {
    image: require("../images/instagram-10.png")
  }
];

export default Gallery;
