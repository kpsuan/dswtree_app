import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import styles from '../../assets/styles/login.styles'
import { useState } from 'react'
import { Image } from "expo-image";
import {Ionicons} from "@expo/vector-icons"
import COLORS from '../../constants/colors';
import {Link, useRouter} from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = () => {

  }
  return (
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={70}
        >
      <View style = {styles.container}>
        <View style = {styles.card}>
          <View style = {styles.header}>
            <Text style = {styles.title}>🌱</Text>
            <Text style = {styles.title}>DSWTree</Text>
            <Text style = {styles.subtitle}>Plant. Adopt. Make a difference, one seed at a time.
            </Text>
          </View>

          <View style = {styles.formContainer}>
          <View style = {styles.inputGroup}>
              <Text style = {styles.label}>Name</Text>
              <View style = {styles.inputContainer}>
                <Ionicons
                  name = 'person-outline'
                  size = {20}
                  color = {COLORS.primary}
                  style = {styles.inputIcon}
                />
                <TextInput
                  style = {styles.input}
                  placeholder='John Doe'
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize='none' 
                />
              </View>
              
            </View>

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

            <TouchableOpacity style = {styles.button} onPress={handleSignUp} disabled={isLoading}>
              {isLoading ? ( 
                <ActivityIndicator color = '#fff'/>
              ):(
                <Text style = {styles.buttonText}>Signup</Text>
              )}
            </TouchableOpacity>

            <View style = {styles.footer}>
              <Text style = {styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                  <Text style = {styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}