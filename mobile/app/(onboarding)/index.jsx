import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import COLORS from '../../constants/colors';
import styles from '../../assets/styles/login.styles'
import {useAuthStore} from '../../store/authStore';
import { useEffect } from "react";
import { router } from 'expo-router'; // Import router from expo-router


export default function Onboarding() {
  const {checkAuth, user, token} = useAuthStore()
  useEffect(() => {
    checkAuth();
  }, [])

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/welcome.png')} 
      style={styles.container2}
    >
      <View style={styles.card2}>
        <View style={styles.header}>
          <Text style={styles.onboardingTitle}>Mabuhay, {user.username}!</Text>
          <Text style={styles.onboardingSubtitle}>Welcome to DSWTree
          </Text>
          <Text style={styles.onboardingText}>Plant. Adopt. Make a difference, one seed at a time.
          </Text>
        </View>


       
      </View>
      <View style={styles.container3}>
           <TouchableOpacity 
            style={styles.buttonOnboarding}
            onPress={handleGetStarted} // Add the onPress handler
          >
            <Text style={styles.buttonTextOnboarding}>GET STARTED</Text>  
          </TouchableOpacity>
        </View>
    </ImageBackground>
  )
}