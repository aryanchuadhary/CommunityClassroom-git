import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

// Import screens
import OnboardingFlow from './src/screens/OnboardingFlow';
import MainApp from './src/screens/MainApp';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

// Splash Screen Component
const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashContent}>
        <Animatable.View 
          animation="fadeInUp" 
          duration={1500}
          style={styles.logoContainer}
        >
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.appName}>ExpenseTrack AI</Text>
        </Animatable.View>
      </View>
    </View>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingFlow} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dollarSign: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
});
