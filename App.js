import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/homeScreen';
import BookList from './screens/BookList';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import AddScreen from './screens/AddScreen';
import BookInfo from './screens/BookInfo';
import Carousel from './screens/carosal';
import userRegister from './screens/userRegister';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BookStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookListScreen" component={BookList} options={{ headerShown: false }} />
      <Stack.Screen name="BookInfo" component={BookInfo} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'BookList') {
            iconName = 'book';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="BookList" component={BookStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Carousal" component={Carousel} options={{ headerShown: false }} />
      <Tab.Screen name="AddScreen" component={AddScreen} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./fonts/Poppins-Medium.ttf'),

  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#D4A056" />
      </SafeAreaView>
    );
  }

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="userRegister">
        <Stack.Screen name="userRegister" component={userRegister} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    height: 60,
    borderTopWidth: 0,
    elevation: 20,
    alignItems: 'center',
    paddingBottom: 5,
  },
  tabBarLabelStyle: {
    gap: 10,
    marginBottom: 5,
  },
});
