import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, ScrollView, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../assets/styles/create.styles'
import { Ionicons } from "@expo/vector-icons"
import COLORS from '../../constants/colors';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function create() {
  const [treeData, setTreeData] = useState({
    name: "",
    commonNames: "",
    type: "",
    description: "",
    Toxicity: "",
    Humidity: "",
    Sunlight: "",
    Location: "",
    Water: "",
    FertilizerType: "",
    FertilizeEvery: "",
    Temperature: "",
    ResistanceZone: "",
  });

  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const treeTypes = ["Fruit Bearing", "Shade", "Native", "Timber"];

  const router = useRouter();

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web"){
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== "granted"){
          Alert.alert("Permission Denied", "We need camera roll permission to upload image");
          return;
        }
      }

      //launch image lib
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4,3],
        quality: 0.5,
        base64: true,
      })

      if(!result.canceled){
        setImage(result.assets[0].uri)

        if(result.assets[0].base64){
          setImageBase64(result.assets[0].base64);
        } else{
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      Alert.alert("Error", "There was a problem selecting your image");
    }
  }

  const handleSubmit = async () => {}

  const selectTreeType = (type) => {
    setTreeData({ ...treeData, type: type });
    setDropdownVisible(false);
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding":"height"}
    >
      <ScrollView 
      contentContainerStyle={styles.container} 
      style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          <View style={styles.header}>
          <Text style = {styles.title}>🌱</Text>
            <Text style = {styles.title}>Add Tree</Text>
            <Text style = {styles.subtitle}>Modify tree details</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style = {styles.label}>Tree Name</Text>
              <View style={styles.inputContainer}> 
                <Ionicons
                  name = 'leaf-outline'
                  size = {20}
                  color = {COLORS.textSecondary}
                  style = {styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter tree name"
                  placeholderTextColor={COLORS.placeholderText}
                  value={treeData.name} 
                  onChangeText={(text) => setTreeData({ ...treeData, name: text })} 
                  autoCapitalize="none" 
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style = {styles.label}>Type</Text>
              <TouchableOpacity 
                style={styles.inputContainer}
                onPress={() => setDropdownVisible(true)}
              > 
                <Ionicons
                  name = 'list'
                  size = {20}
                  color = {COLORS.textSecondary}
                  style = {styles.inputIcon}
                />
                <Text 
                  style={[
                    styles.input, 
                    { paddingVertical: 15 },
                    !treeData.type && { color: COLORS.placeholderText }
                  ]}
                >
                  {treeData.type || "Select tree type"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={COLORS.textSecondary}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
              
              <Modal
                transparent={true}
                visible={dropdownVisible}
                animationType="fade"
                onRequestClose={() => setDropdownVisible(false)}
              >
                <TouchableOpacity 
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  activeOpacity={1}
                  onPress={() => setDropdownVisible(false)}
                >
                  <View 
                    style={{
                      width: '80%',
                      backgroundColor: 'white',
                      borderRadius: 10,
                      paddingVertical: 10,
                      elevation: 5,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    }}
                  >
                    {treeTypes.map((type, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          paddingVertical: 12,
                          paddingHorizontal: 20,
                          borderBottomWidth: index < treeTypes.length - 1 ? 1 : 0,
                          borderBottomColor: '#f0f0f0'
                        }}
                        onPress={() => selectTreeType(type)}
                      >
                        <Text style={{ fontSize: 16, color: COLORS.textPrimary }}>{type}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={styles.formGroup}>
              <Text style = {styles.label}>Tree Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress = {pickImage}>
                {image ? (
                  <Image source={{uri: image}} style={styles.previewImage} />
                ) : (
                  <View style = {styles.placeholderContainer}>
                  <Ionicons name = "image-outline" size={40} color = {COLORS.textSecondary} />
                  <Text style = {styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}
                    
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style = {styles.label}>Description</Text>
                
                <TextInput
                  style={styles.textArea}
                  placeholder="Provide short description"
                  placeholderTextColor={COLORS.placeholderText}
                  value={treeData.description} 
                  onChangeText={(text) => setTreeData({ ...treeData, description: text })} 
                  multiline
                />
            </View>
            
            <TouchableOpacity style = {styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? ( 
                <ActivityIndicator color = {COLORS.white}/>
              ):(
                <>
                <Ionicons
                  name = 'cloud-upload-outline'
                  size = {20}
                  color = {COLORS.white}
                  style = {styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Add</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}