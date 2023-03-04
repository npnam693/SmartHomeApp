import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ScreenWidth } from '@rneui/base'
import Icon from 'react-native-vector-icons/Ionicons'
import FaceItem from '../../components/setting/FaceItem'
export default function FaceRegconition({navigation}) {
    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress = {() => navigation.navigate('AddFace')}>
                <View style = {styles.upload}>
                    <Icon name = "md-cloud-upload-outline" size={46} color='#75A7F7' />    
                    <Text style={{fontWeight: '600'}}>Add Face Recognition</Text>
                </View>
            </TouchableOpacity>

            <View style = {styles.faceitem}>
                <FaceItem />
                <FaceItem /> 
                <FaceItem /> 
                <FaceItem /> 
                <FaceItem /> 
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
