import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal } from 'react-native'
import { ScreenWidth } from '@rneui/base'
import Icon from 'react-native-vector-icons/Ionicons'
import FaceItem from '../../components/setting/FaceItem'
import { axiosClient } from '../../api/axiosSetup'
import { useEffect, useContext, useState } from 'react'
import AuthContext from '../../AuthContext'
import { useIsFocused } from '@react-navigation/native'

import ModalOption from '../../components/ModalOption'

export default function FaceRegconition({navigation}) {
    const { userData } = useContext(AuthContext);
    const [faces, setFaces] = useState([])
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused)
            axiosClient.get(`api/users/getface/${userData._id}`)
                .then(res => setFaces(res.data))
                .catch(err => console.log(err.response))
    }, [isFocused])

    const handlePressItemFace = () => {
        setShowAppOptions(true);
    }

    // console.log('huhu',itemSelected)
    const handleRemoveItemFace = () => {
        console.log(itemSelected)

        axiosClient.post(`api/users/deleteface`, {face_id: itemSelected._id, user_id: itemSelected.userID})
            .then(res => {
                axiosClient.get(`api/users/getface/${userData._id}`)
                    .then(res => {
                        setFaces(res.data)
                        setShowAppOptions(false)
                    })
                    .catch(err => console.log(err.response))
            })
            .catch(err => console.log(err.response))
    }

    const dataModel = [
        {
            title: 'Remove',
            icon: <Icon name = 'close-circle-outline' size = {20}/>,
            action: handleRemoveItemFace,
        },
        {
            title: 'Detail',
            icon: <Icon name = 'filter' size = {20}/>,
            action: () => setShowAppOptions(false),
        },
        {
            title: 'Close',
            icon: <Icon name = 'remove-circle-outline' size = {20}/>,
            action: () => setShowAppOptions(false),
        }
    ]
    return (
        <View style = {styles.container} >
                <TouchableOpacity onPress = {() => navigation.navigate('Add Face')}>
                    <View style = {styles.upload}>
                        <Icon name = "md-cloud-upload-outline" size={46} color='#75A7F7' />    
                        <Text style={{fontWeight: '600'}}>Add Face Recognition</Text>
                    </View>
                </TouchableOpacity>
                <View style = {styles.faceitem}>
                    {
                        faces.map((item, index) => {
                            return (
                                <TouchableOpacity key = {index} onPress={() => {setItemSelected(item); handlePressItemFace()}}>
                                    <FaceItem data = {item} />
                                </TouchableOpacity>
                            )
                        } 
                        )
                    }
                </View>
            <ModalOption visible={showAppOptions} data = {dataModel} actionPressOutside={() => setShowAppOptions(false)}/>
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
    },

})
