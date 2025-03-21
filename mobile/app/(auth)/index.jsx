import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import styles from '../../assets/styles/login.styles'
import { useState, useEffect } from 'react'
import { Image } from "expo-image";
import {Ionicons} from "@expo/vector-icons"
import COLORS from '../../constants/colors';
import {Link} from "expo-router";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  withDelay,
  Easing,
  withSpring,
  cancelAnimation,
  Keyframe
} from 'react-native-reanimated';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {

  }

// Create shared values for animations
const scale = useSharedValue(1);
const opacity = useSharedValue(1);
const translateY = useSharedValue(0);

useEffect(() => {
  // Scale animation
  scale.value = withRepeat(
    withSequence(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
    ),
    -1, // infinite repeats
    true // reverse
  );

  // Opacity animation
  opacity.value = withRepeat(
    withSequence(
      withTiming(0.7, { duration: 1500 }),
      withTiming(1, { duration: 1500 })
    ),
    -1,
    true
  );

  // Floating animation (up and down)
  translateY.value = withRepeat(
    withSequence(
      withTiming(-10, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
      withTiming(10, { duration: 1500, easing: Easing.inOut(Easing.quad) })
    ),
    -1,
    true
  );

  // Clean up animations when component unmounts
  return () => {
    cancelAnimation(scale);
    cancelAnimation(opacity);
    cancelAnimation(translateY);
  };
}, []);

// Define animated styles using our shared values
const animatedStyles = useAnimatedStyle(() => {
  return {
    transform: [
      { scale: scale.value },
      { translateY: translateY.value }
      // Rotation removed
    ],
    opacity: opacity.value,
  };
});



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={70}
    >
    <View style = {styles.container}>
      {/* PIC ni diri */}
      <View style = {styles.topIllustration}>
        <Animated.Image
        source={require("../../assets/images/3.png")}
        style={[styles.illustrationImage, animatedStyles]}
        resizeMode="contain"
      />
      </View>

      <View style = {styles.card}>
        <View style = {styles.formContainer}>
          <View style = {styles.inputGroup}>
            <Text style = {styles.label}>Email</Text>
            <View style = {styles.inputContainer}>
              <Ionicons
                name = 'mail-outline'
                size = {20}
                color = {COLORS.primary}
                style = {styles.inputIcon}
              />
              <TextInput
                style = {styles.input}
                placeholder='Enter your email'
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none' 
              />
            </View>
            
          </View>

          {/* Password */}
          <View style = {styles.inputGroup}>
            <Text style = {styles.label}>Password</Text>
            <View style = {styles.inputContainer}>
              <Ionicons
                name = 'lock-closed-outline'
                size = {20}
                color = {COLORS.primary}
                style = {styles.inputIcon}
              />
              <TextInput
                style = {styles.input}
                placeholder='Enter password'
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style = {styles.eyeIcon}
              >
                <Ionicons
                  name = {showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                />

              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style = {styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? ( 
              <ActivityIndicator color = '#fff'/>
            ):(
              <Text style = {styles.buttonText}>Login </Text>
            )}
          </TouchableOpacity>

          <View style = {styles.footer}>
            <Text style = {styles.footerText}>Don't have an account</Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style = {styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  )
}