import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Setting() {
  return (
    <View style={styles().container}>
      <Text style={styles().text}>Hello, Setting!</Text>
      <Text>Welcome to My Setting by using expo router</Text>
      
    </View>
  )
}

function styles() {
    return StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
}