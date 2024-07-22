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

const AuthScreen = ({ email, setEmail, password, navigation, setPassword, handleAuthentication }) => {
    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>Sign In</Text>

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
                <Button title='Sign In' onPress={handleAuthentication} color="#3498db" />
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.toggleText} onPress={() => navigation.navigate("UserRegister")}>
                    Need an account? Sign Up
                </Text>
            </View>
        </View>
    );
}

const UserLogin = ({ navigation }) => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const user = useSelector(state => state.auth.user);
  
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Extract only necessary user data
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    // Add other necessary fields as needed
                };

                dispatch(setUser(userData)); //Dispatch is used to call the actions
            } else {
                dispatch(clearUser());
                setEmail('');
                setPassword('');
            }
        });

        return () => unsubscribe();
    }, [auth, dispatch]);






    const handleAuthentication = async () => {
        try {
            // Sign in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await userCredential.user.getIdToken(); // Get ID token
            console.log('User signed in successfully!', idToken);

            // Send ID token to your backend
            await axios.post('http://192.168.0.109:5000/api/adminAuth/authenticate', { idToken });

            navigation.navigate('MainTabs'); // Navigate to HomeScreen

        } catch (error) {
            console.error('Authentication error:', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {user ? (

                navigation.navigate("MainTabs")



            ) : (

                <AuthScreen
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    navigation={navigation}
                    handleAuthentication={handleAuthentication}
                />
            )}
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

export default UserLogin;
