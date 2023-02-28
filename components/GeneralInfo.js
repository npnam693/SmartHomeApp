import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { ScreenWidth } from '@rneui/base';

import IconOcticons from 'react-native-vector-icons/Octicons'
export default function GeneralInfo({ navigation }) {
    return (
        <View style = {styles.container}>
            <View style = {{ width: ScreenWidth - 80 }}>
                <View style = {styles.topContainer}>
                    <View style={{ display: 'flex',  flexDirection: 'row' }}>
                        <Image source = {require('../assets/images/Sunny.png')} />
                        <View style = {styles.infoToday}>
                            <Text style = {{fontSize: 13}}>21 Feb 2023</Text>
                            <Text style = {{fontSize: 16, fontWeight: '700'}}>Sunny</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress = {() => navigation.navigate('NotificationScreen')}>
                        <View style = {styles.notification}>
                            <View style={{width: '100%', alignItems:'center'}}>
                                <IconOcticons name = 'bell-fill' size={20} color = 'white'/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{width: '100%', fontSize: 14, fontWeight:'600'}}>General Infomation</Text>
                <View style = {{flexDirection: 'row', width:'100%', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style ={styles.temparatureText}>31
                            <View style = {styles.tempO}></View>
                        </Text>
                        <Text>Temperature</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.humidityText}>6%</Text>
                        <Text>Humidity</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.lightText}>334 lux</Text>
                        <Text>Light Intensity</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBF8FF',
        width: ScreenWidth,
        alignItems: 'center',
        justifyContent: 'center', 
        display: 'flex',
        height: 190,
    },
    notification: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#3575DF',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoToday: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 14,
    },
    textCenter: {
        width: '100%',
        alignItems: 'center',
    },
    infoTitleText: {

    },
    temparatureText: {
        fontSize: 36,
        color: '#C43D3D',
        fontWeight: '700',
        position: 'relative'
    },
    humidityText: {
        color : '#1EA0E9',  
        fontSize: 32,
        fontWeight: '700'

    },
    lightText: {
        color: '#ECC94B',
        fontSize: 24,
        fontWeight: '700'
    },
    tempO: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderWidth: 3,
        borderRadius: 100,
        borderColor: '#C43D3D',
        top: 20,
    }
})


