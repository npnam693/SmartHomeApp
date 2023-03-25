import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from '@rneui/themed';
import AuthContext from "../AuthContext";
import { axiosClient, axiosAdafruit } from '../api/axiosSetup';

export const typeDevice = {
    light: {
        name : 'Smart Light',
        iconTurn : <Icon name = "lightbulb-variant-outline" size = {42} color = '#75A7F7'/>,
        iconOff : <Icon name = "lightbulb-variant-outline" size = {42} color = '#9A9B9E'/>,
        feedId: "led",
        feedAdjustId: 'bbc-led-light',
        unitTitle: 'Light Insensity'
    },
    fan: {
        name : 'Smart Fan',
        iconTurn : <Icon name = "fan" size = {38} color = '#75A7F7'/>,
        iconOff : <Icon name = "fan" size = {38} color = '#9A9B9E'/>,
        feedId: "bbc-fan",
        feedAdjustId: 'bbc-fan-power',
        unitTitle: 'Number'
    },
    door: {
        name : 'Smart Door',    
        iconTurn : <Icon name = "door-open" size = {38} color = '#75A7F7'/>,
        iconOff : <Icon name = "door-open" size = {38} color = '#9A9B9E'/>,
        feedId: "bbc-door",
        unitTitle: 'Smart door'
    }
}

export default function ControlDevice({ navigation, type, deviceID }) {
    const { userData, socket } = useContext(AuthContext);

    const [checked, setChecked] = useState(false);
    
    socket.on(`toggle ${typeDevice[type].feedId}`, (msg) => {
        console.log('ben client ngke toggle r')
        if (msg == 1) setChecked(true)
        else setChecked(false)
    });

    useEffect(()=> {
        axiosAdafruit.get(`${typeDevice[type].feedId}/data?limit=1`)
            .then((res) => {
                if (res.data[0].value == '0') setChecked(false)
                else setChecked(true)
            })
            .catch((err) => console.log(err))
    }, [])

    
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('DeviceScreen', { type, deviceId: deviceID })}>
            <View style = {styles.leftContainer}>
                <View style = {styles.iconContainer}>
                    {checked ? typeDevice[type].iconTurn : typeDevice[type].iconOff }
                </View>
                <View>
                    <Text style = {styles.nameDevice}>{typeDevice[type].name}</Text>
                    <Text>Living Room</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Switch       
                    value={checked}
                    onValueChange={(value) => {
                        socket.emit('toggleswitch', value ? '1' : '0', typeDevice[type].feedId)
                        
                        axiosClient.post('api/devicelog/', {
                            deviceID: deviceID,
                            creatorID: userData._id,
                            value
                        })
                            .then((res) => {
                                socket.emit('send notif', res.data, userData.homeID)
                            })
                            .catch((err) => console.log(err.response.data.message))
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