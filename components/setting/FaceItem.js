
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function FaceItem() {
    return (
        <View style = {styles.container}>
            <View style = {{flexDirection: 'row', justifyContent:'space-between', marginBottom: 4}}>
                <TouchableOpacity 
                // onPress={() => navigation.navigate()}
                >
                    <Image source={{uri:'https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png'}} 
                            style = {{width: 70, height: 60, borderRadius: 10, borderWidth: 1, borderColor:'#C4BEBE'}}
                    />  
                </TouchableOpacity>
                
                <TouchableOpacity onPress = {() => console.log('press option')}>
                    <Icon name = 'md-ellipsis-vertical' size={24} style={{top: 6}}/>
                </TouchableOpacity>
            </View>
            <Text style = {{fontSize: 16, fontWeight: '600', color: '#10101'}}>Nam Nguyen</Text>
            <Text style = {{fontSize: 12, fontWeight: '400', color: '#666'}}>03/04/2023</Text>
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: 150,
        borderColor: "#00B5D8",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    }
})
