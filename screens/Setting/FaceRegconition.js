import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ScreenWidth } from '@rneui/base'
import Icon from 'react-native-vector-icons/Ionicons'
import FaceItem from '../../components/setting/FaceItem'
import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import AuthContext from '../../AuthContext'
export default function FaceRegconition({navigation}) {
    const { userData } = useContext(AuthContext);
    const [faces, setFaces] = useState([])
    
    useEffect(() => {
        axios.get(`http://10.0.2.2:3000/api/users/getface/${userData._id}`)
            .then(res => setFaces(res.data))
            .catch(err => console.log(err.response))
    }, [])
    console.log(faces)
    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress = {() => navigation.navigate('Add Face')}>
                <View style = {styles.upload}>
                    <Icon name = "md-cloud-upload-outline" size={46} color='#75A7F7' />    
                    <Text style={{fontWeight: '600'}}>Add Face Recognition</Text>
                </View>
            </TouchableOpacity>
            <View style = {styles.faceitem}>
                {
                    faces.map((item, index) => <FaceItem data = {item} key = {index}/>)
                }
            </View>


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
    faceitem: {
        width: ScreenWidth - 70,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }

})
