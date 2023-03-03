import { View, Text, StyleSheet} from "react-native";
import  Icon  from "react-native-vector-icons/Ionicons";
const typeButton = {
    SHARE_KEY: {
        name : 'Share Key',
        icon : <Icon name = "key-outline" size = {38} color = '#1E7F68'/>,
        bgColor: '#C4DFE0'
    },
    FACE_RECOGNITION: {
        name : 'Face Reg.',  
        icon : <Icon name = "eye-outline" size = {38} color = '#670E03'/>,
        bgColor: '#F5E4E2'
    },
    CHANGE_PIN: {
        name : 'Change PIN',    
        icon : <Icon name = "keypad-outline" size = {38} color = '#DB950A'/>,
        bgColor: '#FEF5E3'
    },
    ADD_DEVICE: {
        name: 'Add Device',
        icon : <Icon name = "add-circle-outline" size = {38} color = '#381E82'/>,
        bgColor: '#F1EDFC'
    }
}
export default function SettingSquare({type}) {
    console.log(type)
    return (
        <View style = {{alignItems:'center', justifyContent:'center', width: 76}}>
        
            <View style = {[styles.box,{backgroundColor: typeButton[type].bgColor}]}>
                {typeButton[type].icon}
            </View>
            <Text>{typeButton[type].name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box:{
        width: 60, 
        height: 60, 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent:'center', 
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
        marginBottom: 5,
    }
})