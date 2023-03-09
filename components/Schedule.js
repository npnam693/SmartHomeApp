import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from '@rneui/themed';

function Schedule() {
    const [checked, setChecked] = useState(false)
    return ( 
        <TouchableOpacity style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.date}>
                    <Text style={styles.time}>
                        12:00
                    </Text>
                    <Text style={styles.day}>
                        Thứ hai
                    </Text>
                </View>
                <Text style={styles.status}>
                    Bật
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Switch
                    value={checked}
                    onValueChange={(value) => {
                        // socket.emit('toggleswitch', value ? '1' : '0', typeDevice[type].feedId)
                        // console.log('alo')
                        setChecked(value)
                    }}
                />
            </View>
        </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 80,
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

    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    date: {
        display: 'flex',
        flexDirection: 'row'
    }
    ,
    time: {
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 22,
        color: '#4D4343'
    },
    day: {
        marginLeft: 10,
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
        color: '#534A4A'
    },
    status: {
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 22,
        color: '#4D4343'
    }
    ,
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

})

export default Schedule;