import { Text, View, StyleSheet, Platform, TextInput, TouchableOpacity} from "react-native";
import { Link } from "expo-router";
import { useApp } from "@/components/AppProvider";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {

  const {user , setUser} = useApp();
  const BASE_URL = Platform.select({
    ios: "http://localhost:8800",
    android: "http://10.0.2.2:8800",
    default: "http://localhost:8800",
  });
  const api = `${BASE_URL}/users/login`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginData = () => {
		if (!username || !password) {
			return false;
		}

		fetch(api, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async res => {
			if (res.ok) {
				const { user, token } = await res.json();
				await AsyncStorage.setItem("token", token);
				setUser(user);
      } else { 
        setErrorMessage("Invalid username or password");
			} 
		});
	};


  const login = (
    <View style={styles().form}>
      <Text style={styles().title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles().input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles().input}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles().button}
        onPress={loginData}
      >
        <Text style={styles().buttonText}>Login In</Text>
      </TouchableOpacity>
    </View>
  );

  const logout = (
    <View style={styles().form}>
      <Text style={styles().title}>Profile</Text>
      <Text style={styles().text}>Signed in as: {user?.username}</Text>
      <TouchableOpacity
        style={[styles().button, styles().dangerButton]}
        onPress={() => setUser(null)}
      >
        <Text style={styles().buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles().container}>
      {(user) ? (logout) : (login)}
      
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
    form: {
        width: '90%',
        maxWidth: 420,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 12,
        color: '#111',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: '#fafafa',
    },
    button: {
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2563eb',
    },
    dangerButton: {
        backgroundColor: '#dc2626',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
  error: {
    color: '#dc2626',
    marginBottom: 8,
    textAlign: 'center',
  },
});
}