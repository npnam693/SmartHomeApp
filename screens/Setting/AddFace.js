import { View, Text, StyleSheet, Image, TextInput} from 'react-native'
import { ScreenWidth } from '@rneui/base'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from '../../firebase/firebaseConfig';



export default function AddFace() {
    const [data, setData] = useState('')
    // const [numImg, setNumImg] = useState(5)
    
    const [image, setImage] = useState([]);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        allowsMultipleSelection: true,
        // aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets);
      }
    }

    
    const handleClickSubmitFace = () => {
        console.log('Submit Face')
    }

    return (
        <View style = {styles.container}>
                {/* <View style = {styles.upload}>
                <Icon name = "md-cloud-upload-outline" size={46} color='#75A7F7' />    
                <Text style={{fontWeight: '600'}}>Upload Face Image</Text> */}
            {/* </View> */}

            <Button title="Pick an image from camera roll" onPress={pickImage} />

            <View style = {styles.listitem}>
                {
                    Array(8).fill(0).map((item, index) => {
                        if (index < image.length) {
                            return (
                                <Image source={{uri:image[index].uri}}
                                    style = {styles.faceitem}
                                    key = {index}
                                /> 
                            )
                        }
                        else return (
                            <View key = {index} style={styles.faceitem}>
                            </View>
                        )
                    })
                }
            </View>

            <TextInput
                    placeholder = {'Enter your name'}
                    style={{
                        backgroundColor : "#EBF8FF",
                        height: 48,
                        width: ScreenWidth - 70,
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 15,
                        paddingHorizontal: 20,
                        marginVertical: 10,
                    }}
                    value = {data.username}
                    onChangeText={(input) => setData({...data, username: input})}
                />

            <Button radius={'sm'} containerStyle={{width: 100, marginLeft: 'auto', marginTop: 10, marginRight: 35}}
            onPress = {handleClickSubmitFace}
            >Next</Button>
        </View>
    )
}   
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 40,
    },
    upload: {
        width: ScreenWidth - 70,
        height: 110,
        backgroundColor: '#EBF8FF',
        borderWidth: 1,
        borderColor: '#A8B7FF',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    listitem: {
        width: ScreenWidth - 70,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    faceitem: {
        width:70, 
        height: 60, 
        borderWidth: 1, 
        borderColor:'#C4BEBE',
        marginBottom: 10,
    }

})
