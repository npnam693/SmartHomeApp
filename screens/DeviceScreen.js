import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native"
import { typeDevice } from "../components/ControlDevice"
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign'
import Schedule from "../components/Schedule";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { axiosClient, axiosAdafruit } from '../api/axiosSetup';
import { useIsFocused } from "@react-navigation/native";

export default function DeviceScreen({ navigation, route }){

    const [schedules, setSchedules] = useState([])
    const {userData, socket} = useContext(AuthContext)
    const [value, setValue] = useState()
    const isFocused = useIsFocused()

    const handleChangeValue = (data) => {
        socket.emit('adjust value', data, typeDevice[route.params.type].feedAdjustId)
        setValue(data)
    }
    // console.log(userData)
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    socket.on(`toggle ${typeDevice[route.params.type].feedAdjustId}`, (msg) => {
        console.log('thay doi value cua thiet bi tu ada ok')
        setValue(parseInt(msg))
    });


    useEffect(() => {
        axiosClient.get(`api/schedules/${route.params.deviceId}`, config)
            .then((res) => {
                console.log(res.data)
                setSchedules(res.data)
            })
            .catch((err) => console.log(err))

        if (typeDevice[route.params.type].feedAdjustId) {
            axiosAdafruit.get(`${typeDevice[route.params.type].feedAdjustId}/data?limit=1`)
                .then(res => setValue(parseInt(res.data[0].value)))
                .catch(err => console.log(err))
        }
        // route.params['setSchedules'] = setSchedules
    }, [])

    useEffect(() => {
        if(isFocused){
            axiosClient.get(`api/schedules/${route.params.deviceId}`, config)
                .then((res) => {
                    console.log(res.data)
                    setSchedules(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [isFocused])

    return (
        <View style = {styles.container}>
            <View style={styles.header}>
                <Text style={styles.unitTitle}>{typeDevice[route.params.type].unitTitle}</Text>
                {value && (
                    <Text style={styles.value}>{value}</Text>
                )}
            </View>
            {value && (
                <View style={styles.adjust}>
                    <Button
                        radius={50}
                        style={styles.adjustButton}
                        icon={<Icon name="plus" size={20} color='#EBF8FF' />}
                        onPress = {()=> handleChangeValue(value + 10)}
                    />
                    <Button
                        radius={50}
                        style={styles.adjustButton}
                        icon={<Icon name="minus" size={20} color='#EBF8FF' />}
                        onPress={() => handleChangeValue(value - 10)}
                    />
                </View>
            )}
            <ScrollView contentContainerStyle={styles.devices} showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    {schedules.map(schedule => (
                        <Schedule key={schedule._id} data={schedule} navigation={navigation} setSchedules={setSchedules}/>
                    ))}
                </View>
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
        height: '100%',
        width: '100%',
        marginTop: 20,
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
        alignItems:'center',
        width: Dimensions.get('window').width,
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

