import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from '@rneui/themed';
import axios from 'axios';
import AuthContext from '../AuthContext';


const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const Hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
const Minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",]

function Schedule({data, navigation, setSchedules}) {
    const time = new Date(data.timeSchedule)
    // data.timeSchedule = new Date(data.timeSchedule) //convert to date object
    const [checked, setChecked] = useState(false)
    const {userData} = useContext(AuthContext)
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    const handleToggle = (value) => {
        axios.patch(`http://10.0.2.2:3000/api/schedules/${data.deviceId}/${data._id}/toggle`,{
            status: value
        }, config)
            .then((response) => {
                setChecked(value)
            })
            .catch(err=>{
                alert(err.response.data.message)
            })
    }

    useEffect(()=>{
        setChecked(data.status)
    }, [])

    return ( 
        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('ScheduleScreen', { deviceId: data.deviceId, data: data, setSchedules: setSchedules })}
        >
            <View style={styles.leftContainer}>
                <View style={styles.date}>
                    <Text style={styles.time}>
                        {`${Hours[time.getHours()]}:${Minutes[time.getMinutes()]}`}
                    </Text>
                    <Text style={styles.day}>
                        {weekday[time.getUTCDay()]}
                    </Text>
                </View>
                <Text style={styles.status}>
                    {data.action ? 'TURN ON' : 'TURN OFF'}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Switch
                    value={checked}
                    onValueChange={(value) => handleToggle(value)}
                />
            </View>
        </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 100,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        shadowColor: "#00B5D8",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

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