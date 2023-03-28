
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function FaceItem({data}) {

    return (
        <View style = {styles.container}>
            <View style = {{flexDirection: 'row', justifyContent:'space-between', marginBottom: 4}}>
                    <Image source={{uri: data.images[0]}} 
                            style = {{width: 110, height: 88, borderRadius: 6, borderWidth: 1, borderColor:'#C4BEBE'}}
                    />  
                
                <Icon name = 'md-ellipsis-vertical' size={24} style={{top: 6}}/>
            </View>
            <Text style = {{fontSize: 16, fontWeight: '600', color: '#10101'}}>{data.name}</Text>
            <Text style = {{fontSize: 12, fontWeight: '400', color: '#666'}}>03/04/2023</Text>
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: 150,
        borderColor: "#C4BEBE",
        borderWidth: 1,
        padding: 6,
        borderRadius: 10,
        marginBottom: 20,
    }
})
