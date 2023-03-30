import { Text, View, StyleSheet, Image } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const getIconNoti = (type, mode) =>  {
    const size = 46
    let name  = "fan"
    let nameReturn = "Smart Fan"
    let color = '#75A7F7'
    if (type == 'light') {
        name = "lightbulb-variant-outline"
        nameReturn = "Smart Light"
    }
    else if (type == 'door')
        name = 'door-open'
        nameReturn = "Smart Door"
    if (mode === 0)     
        color =  '#757575'
    return {
        icon : <Icon name = {name} size = {size} color = {color}/>,
        name : nameReturn
    }
}

export default function NotificationItem({bgColor, data}) {
    const date = new Date(data.createdAt)

    return (
        <View style = {[styles.container, {backgroundColor:bgColor}]}>
            <View style = {styles.containerDevice}>
                {getIconNoti(data.deviceID.type, data.value).icon}
            </View>
            <View style = {{width: 226, justifyContent: 'space-between'}}>
                <Text style = {{
                    fontSize: 12,
                }}>{getIconNoti(data.deviceID.type,data.value).name} has been turned {data.value ? 'on' : 'off'} by 
                    {
                        data.creatorID?.name ? 
                            <Text style = {{fontWeight: '600', color: '#1EA0E9'}}> {data.creatorID.name}</Text>
                        :
                            <Text style = {{fontWeight: '600', color: '#C43D3D'}}> automatically</Text>
                        }
                
                </Text>
                <View style = {{flexDirection:'row', justifyContent: 'space-between', marginTop: 10}}>
                    <Text style = {{
                    fontSize: 12,
                }}></Text>
                    <Text style = {{
                    fontSize: 12,
                }}>{date.toLocaleString()}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#E6FFFA',
        margin: 10,
        marginHorizontal: 30,

        padding: 20,
        paddingVertical: 14,
        borderRadius: 10,

        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    containerDevice: {
        backgroundColor: '#D2E0EE',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#333',
        height: 62,
        width: 62,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    }
})