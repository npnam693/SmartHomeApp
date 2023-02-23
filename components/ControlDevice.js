import {View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from '@rneui/themed';



const typeDevice = {
    light: {
        name : 'Smart Light',
        icon : <Icon name = "lightbulb-variant-outline" size = {42} color = '#75A7F7'/>
    },
    fan: {
        name : 'Smart Fan',
        icon : <Icon name = "fan" size = {42} color = '#75A7F7'/>
    }
}

export default function ControlDevice({type, data}) {
    type = 'light'
    const [checked, setChecked] = useState(false);
    const toggleSwitch = () => {
        setChecked(!checked);
      };
      
    return (
        <View style = {styles.container}>
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
                    onValueChange={(value) => setChecked(value)}
                />
                <View style = {styles.autoView}>
                    <Text style = {{color: '#9A9B9E'}}>Auto</Text>
                </View>
            </View>

        </View>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        borderRadius: 30,
        elevation: 7,
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