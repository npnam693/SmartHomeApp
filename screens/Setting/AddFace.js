import { View, Text, StyleSheet, Image, TextInput} from 'react-native'
import { ScreenWidth } from '@rneui/base'
import { useState, useContext} from 'react'
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from '../../firebase/firebaseConfig';
import uuid from 'react-native-uuid';
import { axiosClient } from '../../api/axiosSetup';
import AuthContext from '../../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

export default function AddFace({navigation}) {
    const [data, setData] = useState({
        name: '',
        images: []
    })
    const [uploading, setUploading] = useState(false)
    const [images, setImages] = useState([]);
    const { userData } = useContext(AuthContext);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            allowsMultipleSelection: true,
            // aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            console.log(result.assets)
            setImages(result.assets);
        }
    }

    async function uploadFile () {
        const promise = images.map(async(item) => {
            console.log(item)
            const response = await fetch(item.uri)
            const blobFile = await response.blob()
            // const ID = await genID()
            const imageRef = ref(storage, `images/home${userData.homeID}/${data.name.split(' ').join('')}/${uuid.v4()}`);
            const result = await uploadBytes(imageRef, blobFile)
            const url = await getDownloadURL(result.ref)
            return url
        })

        const listURLs = await Promise.all(promise)
        console.log(listURLs)
        return listURLs
    }
        
    const handleClickSubmitFace = async () => {
        if (data.name == '') {
            alert('Please fill your name')
            return
        } 
        setUploading(true)
        axiosClient.post(`api/users/addface`, {
            userID: userData._id,
            name: data.name,
            images: await uploadFile(),
        })
            .then(res => {
                console.log(res)
                setUploading(false)
                navigation.navigate('Face Regconition',  )
            })
            .catch(err =>  {
                console.log(err)
                setUploading(false)
            })
    }

    return (
        <View style = {styles.container}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={uploading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={styles.spinnerTextStyle}
            />
            <Button title="Pick images from camera roll" onPress={pickImage} />

            <View style = {styles.listitem}>
                {
                    Array(8).fill(0).map((item, index) => {
                        if (index < images.length) {
                            return (
                                <Image source={{uri:images[index].uri}}
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
                    value = {data.name}
                    onChangeText={(input) => setData({...data, name: input})}
                />
            {
                !uploading &&
                <Button radius={'sm'} containerStyle={{width: 100, marginLeft: 'auto', marginTop: 10, marginRight: 35}}
                    onPress = {handleClickSubmitFace}
                >Next</Button> 
                
            }
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
