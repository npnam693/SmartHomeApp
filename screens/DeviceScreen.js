import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { typeDevice } from "../components/ControlDevice"
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign'
import Schedule from "../components/Schedule";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";

export default function DeviceScreen({ navigation, route }){

    const [schedules, setSchedules] = useState([])
    const {userData} = useContext(AuthContext)
    // console.log(userData)
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    useEffect(() => {
        axios.get(`http://10.0.2.2:3000/api/schedules/${route.params.deviceId}`, config)
            .then((res) => {
                console.log(res.data)
                setSchedules(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <View style = {styles.container}>
            <View style={styles.header}>
                <Text style={styles.unitTitle}>{typeDevice[route.params.type].unitTitle}</Text>
                <Text style={styles.value}>value</Text>
            </View>
            <View style ={styles.adjust}>
                <Button
                    radius={50}
                    style={styles.adjustButton}
                    icon={<Icon name="plus" size={20} color='#EBF8FF' />}
                />
                <Button
                    radius={50}
                    style={styles.adjustButton}
                    icon={<Icon name="minus" size={20} color='#EBF8FF' />}
                />
            </View>
            <ScrollView style={styles.devices} showsVerticalScrollIndicator={false}>
                {schedules.map(schedule => (
                    <Schedule key={schedule._id} data={schedule} navigation={navigation}/>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 20
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems:'center'
    },
    adjust: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
        padding: 30
    }
    ,
    adjustButton:{
        width: 40,
        height: 40,
        backgroundColor: '#75A7F7'
    }
    ,
    devices: {
        display: 'flex',
    }
    ,
    unitTitle: {
        color: '#4299E1',
        fontSize: 24,
        fontWeight: '600',

        lineHeight: 36,
    },
    value: {
        color: '#999090',
        fontSize: 48,
        fontWeight: '600',

        lineHeight: 72,
    }
})

