import { View, Text } from "react-native";
import  Icon  from "react-native-vector-icons/Ionicons";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { ScreenWidth } from "@rneui/base";
const typeOption = {
    PROFILE: {
        name : 'Profile details',
        icon : <Icon name = "people" size = {24} color = '#75A7F7'/>,
    },
    NOTIFICATION: {
        name : 'Push Notifications',  
        icon : <Icon name = "notifications-sharp" size = {24} color = '#75A7F7'/>,
    },
    SUPPORT : {
        name : 'Support',    
        icon : <IconMaterial name = "support" size = {24} color = '#75A7F7'/>,
    },
    LOGOUT: {
        name: 'Logout',
        icon : <Icon name = "exit" size = {24} color = '#75A7F7'/>,
    }
}

export default function SettingRectangle({type}) {
    console.log(type)
    return (
        <View style = {{width: ScreenWidth - 32, height: 64,
            backgroundColor:'#EBF8FF', flexDirection: 'row', alignItems:'center',
            padding: 12, marginLeft: 4, borderRadius: 12, marginBottom: 12,
            borderWidth: 1, borderColor: '#ccc'
            }}>
            <View style = {{backgroundColor: '#D2E0EE', width: 40,  height: 40,  
                            borderRadius: 30, alignItems: 'center', 
                            justifyContent:'center', marginRight: 12}}>
                {typeOption[type].icon}
            </View>
            <Text style={{fontSize: 16, fontWeight: '500'}}>{typeOption[type].name}</Text>
        </View>
    )
}



