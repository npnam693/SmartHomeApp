import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from '@rneui/themed';
import { io } from "socket.io-client";
import axios from 'axios';

export const typeDevice = {
    light: {
        name : 'Smart Light',
        icon : <Icon name = "lightbulb-variant-outline" size = {42} color = '#75A7F7'/>,
        feedId: "smarthome-dadn.smart-light"
    },
    fan: {
        name : 'Smart Fan',
        icon : <Icon name = "fan" size = {38} color = '#75A7F7'/>,
        feedId: "smarthome-dadn.smart-fan"
    },
    door: {
        name : 'Smart Door',    
        icon : <Icon name = "door-open" size = {38} color = '#75A7F7'/>,
        feedId: "smarthome-dadn.smart-door"
    }
}

export default function ControlDevice({ navigation, type }) {
    const [checked, setChecked] = useState(false);
    const socket = io("http://10.0.2.2:3000");
    
    socket.on(`toggle ${typeDevice[type].feedId}`, (msg) => {
        console.log('ben client ngke toggle r')
        if (msg == 1) setChecked(true)
        else setChecked(false)
    });

    useEffect(()=> {
        axios.get(`https://io.adafruit.com/api/v2/nguyenphinam2k2/feeds/${typeDevice[type].feedId}/data?limit=1`)
            .then((res) => {
                if (res.data[0].value == '0') setChecked(false)
                else setChecked(true)
            })
            .catch((err) => console.log(err))
    }, [])

    
    return (
        <TouchableOpacity style = {styles.container} onPress={() => navigation.navigate('DeviceScreen')}>
            <View style = {styles.leftContainer}>
                <View style = {styles.iconContainer}>
                    {typeDevice[type].icon}
                </View>
                <View>
                    <Text style = {styles.nameDevice}>{typeDevice[type].name}</Text>
                    <Text>4 Devices</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Switch       
                    value={checked}
                    onValueChange={(value) => {
                        socket.emit('toggleswitch', value ? '1' : '0', typeDevice[type].feedId)
                        console.log('alo')
                        setChecked(value)
                    }}
                />
                <View style = {styles.autoView}>
                    <Text style = {{color: '#9A9B9E'}}>Auto</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 144,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        shadowColor: "#00B5D8",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        borderRadius: 30,
        elevation: 7,

        marginTop: 20
        
    },

    leftContainer : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        
    },
    iconContainer : {
        backgroundColor: '#D2E0EE',
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    nameDevice: {
        fontSize: 18,
        fontWeight: 'bold'

    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    autoView: {
        backgroundColor: '#F7F7F9',
        padding: 17,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 20
    }
    
})