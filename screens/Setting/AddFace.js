import { View, Text, StyleSheet, Image, TextInput} from 'react-native'
import { ScreenWidth } from '@rneui/base'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'

import { Button } from '@rneui/themed';

export default function AddFace() {
    const [images, setImage] = useState([])
    const [data, setData] = useState('')
    const [numImg, setNumImg] = useState(5)

    const handleClickSubmitFace = () => {
        console.log('Submit Face')
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.upload}>
                <Icon name = "md-cloud-upload-outline" size={46} color='#75A7F7' />    
                <Text style={{fontWeight: '600'}}>Upload Face Image</Text>
            </View>
            <View style = {styles.listitem}>
                {
                    Array(8).fill(0).map((item, index) => {
                        if (index < numImg) {
                            return (
                                <Image source={{uri:'https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png'}} 
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
