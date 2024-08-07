import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import axios from 'axios'; // Add axios for making HTTP requests
import { clearUser, setUser } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVhbTLfMiEdvfv_tJbf9DN3DgxN8Pk3_k",
    authDomain: "test-auth-fbe3e.firebaseapp.com",
    projectId: "test-auth-fbe3e",
    storageBucket: "test-auth-fbe3e.appspot.com",
    messagingSenderId: "823346149080",
    appId: "1:823346149080:web:e055e63fb6b3c203eb09ad",
    measurementId: "G-PR75KLJEJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, navigation, handleAuthentication }) => {
    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}> Sign Up</Text>

            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title='Sign Up' onPress={handleAuthentication} color="#3498db" />
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.toggleText} onPress={() => navigation.navigate("UserLogin")}>
                    Already have an account? Sign In
                </Text>
            </View>
        </View>
    );
}

const UserRegister = ({ navigation }) => {

    const auth = getAuth(app);

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');







    const handleAuthentication = async () => {
        try {

            // Sign up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken();
            console.log('User created successfully!', idToken);

            // Send token to your backend for verification or user creation
            await axios.post('http://192.168.0.106:5000/api/adminAuth/register', { idToken });

            navigation.navigate("MainTabs");

        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>


            <AuthScreen
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                navigation={navigation}
                handleAuthentication={handleAuthentication}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        marginBottom: 16,
    },
    toggleText: {
        color: '#3498db',
        textAlign: 'center',
    },
    bottomContainer: {
        marginTop: 20,
    },
    emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default UserRegister;
