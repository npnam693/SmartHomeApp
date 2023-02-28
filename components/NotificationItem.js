import { Text, View, StyleSheet, Image } from "react-native"
import { ScreenWidth } from "@rneui/base"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const getIconNoti = (type, mode) =>  {
    const size = 46
    let name  = "fan"
    let color = '#75A7F7'
    if (type === 'light') {
        name = "lightbulb-variant-outline"
    }
    else if (type === 'door')
        name = 'door-open'
    if (mode === 0)     
        color =  '#757575'
    return <Icon name = {name} size = {size} color = {color}/>
}

export default function NotificationItem() {
    const type = 'light'
    return (
        <View style = {styles.container}>
            <View style = {styles.containerDevice}>
                {getIconNoti(type, 1)}
            </View>
            <View style = {{width: '100%', flexDirection: 'column', justifyContent:'space-around'}}>
                <View style = {{width: 230, justifyContent: 'space-between'}}>
                    <Text style = {{
                        fontSize: 12,
                    }}>Smart Light has been turned on by <Text>Nam Nguyen Phi</Text>
                    </Text>
                    <View style = {{flexDirection:'row', justifyContent: 'space-between'}}>
                        <Text style = {{
                        fontSize: 12,
                    }}>1m ago</Text>
                        <Text style = {{
                        fontSize: 12,
                    }}>22:03 26/02/2023</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: ScreenWidth - 60,
        height: 80,
        backgroundColor: '#E6FFFA',
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 10,
        overflow: "hidden"
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