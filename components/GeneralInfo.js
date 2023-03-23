import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { ScreenWidth } from '@rneui/base';
import IconOcticons from 'react-native-vector-icons/Octicons'

import { axiosClient, axiosAdafruit } from '../api/axiosClient';

import { useEffect, useState, useContext } from 'react';
import AuthContext from '../AuthContext';
import  moment from 'moment'
export const typeSensor = {
    temp: {
        name: "Temperature",
        feedId: "bbc-temp",
    },
    humidity: {
        name: "Humidity",
        feedId: "bbc-humi",
    },
    lightIntensity: {
        name: "Light Intensity",
        feedId: "bbc-humi"
    },
}
export default function GeneralInfo({ navigation }) {
    const [temp, setTemp] = useState(30)
    const [humidity, setHumidity] = useState(30)
    const [lightIntensity, setlightIntensity] = useState(30)

    const { socket } = useContext(AuthContext);


    useEffect(() => {
        Object.entries(typeSensor).map(([key, value]) => {
            axiosAdafruit.get(`${value.feedId}/data?limit=1`)
                .then(res => {
                    if (key === 'temp') setTemp(res.data[0].value)
                    if (key === 'humidity') setHumidity(res.data[0].value)
                    if (key === 'lightIntensity') setlightIntensity(res.data[0].value)
                })
                .catch(err => console.log(err.response))
        })
    }, [])
    
    socket.on("toggle bbc-temp", (msg) => {
        setTemp(msg)
        console.log('zozo r')
    })

    socket.on(`toggle ${typeSensor.humidity.feedId}`, (msg) => {
        setHumidity(msg)
        console.log(' humidity r')
    })

    socket.on(`toggle ${typeSensor.lightIntensity.feedId}`, (msg) => {
        setlightIntensity(msg)
        console.log(' humidity r')
    })
    
    console.log(temp, humidity, lightIntensity)

    return (
        <View style = {styles.container}>
            <View style = {{ width: ScreenWidth - 80 }}>
                <View style = {styles.topContainer}>
                    <View style={{ display: 'flex',  flexDirection: 'row' }}>
                        <Image source = {require('../assets/images/Sunny.png')} />
                        <View style = {styles.infoToday}>
                            <Text style = {{fontSize: 13}}>{moment().format("MMM Do YY")}</Text>
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
                <View style = {{flexDirection: 'row', width:'100%', justifyContent:'space-between', alignItems:'flex-end'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <View style={{position:'relative'}}>
                            <Text style ={styles.temparatureText}>{temp}</Text>
                            <View style={{position: 'absolute', right: -8}}>
                                <View style = {styles.tempO}></View>
                            </View>
                        </View>
                        <Text>Temperature</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.humidityText}>{humidity}%</Text>
                        <Text>Humidity</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.lightText}>{lightIntensity} lux</Text>
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
        paddingTop: 20,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
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
        fontWeight: '700',
        bottom: 2,
    },
    lightText: {
        color: '#ECC94B',
        fontSize: 24,
        fontWeight: '700',
        bottom: 6,
    },
    tempO: {
        
        width: 12,
        height: 12,
        borderWidth: 4,
        borderRadius: 100,
        borderColor: '#C43D3D',
    }
})


