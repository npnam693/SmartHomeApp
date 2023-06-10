//Cai nay Truong lam nha

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect, useContext,  } from "react";
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import { Button } from "@rneui/base";
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthContext from "../AuthContext";
import { axiosClient } from "../api/axiosSetup";
// const Days = [
//     { key: '2', value: 'Monday' },
//     { key: '3', value: 'Tuesday' },
//     { key: '4', value: 'Wednesday' },
//     { key: '5', value: 'Thursday' },
//     { key: '6', value: 'Friday' },
//     { key: '7', value: 'Saturday' },
//     { key: '8', value: 'Sunday' },
// ]

const Hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
const Minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",]

function ScheduleScreen({navigation, route}) {
    const { userData } = useContext(AuthContext) //get current user
    const { data } = route.params
    const time = data ? new Date(data.timeSchedule) : null
    const [action, setAction] = useState(data ? data.action : true) //true for active
    const [date, setDate] = useState(time)
    const [show, setShow] = useState(false)
    const [hour, setHour] = useState(time ? time.getHours() : 0)
    const [minute, setMinute] = useState(time ? time.getMinutes() : 0)
    const [selectedHourIndex, setSelectedHourIndex] = useState(time ? time.getHours() : 0)
    const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(time ? time.getMinutes() : 0)


    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    const handleSave = () =>{
        if (!date) {
            alert('You must select a date')
            return
        }

        const today = new Date()
        date.setHours(hour, minute)
        if (date < today) {
            alert('Invalid date')
            return
        }

        //call api
        axiosClient.patch(`/api/schedules/${route.params.deviceId}/${data._id}`, {
            action,
            timeSchedule: date
        }, config)
            .then(res => {
                console.log(res.data)
                navigation.goBack()
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.message)
            })
    }

    const handleCreate = () => {
        if (!date) {
            alert('You must select a date')
            return
        }

        const today = new Date()
        date.setHours(hour, minute)
        if (date < today) {
            alert('Invalid date')
            return
        }

        axiosClient.post(`/api/schedules/${route.params.deviceId}`,{
            action, 
            timeSchedule: date
        }, config)
            .then(res => {
                console.log(res.data)
                navigation.goBack()
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.message)
            })
    }

    const handleDelete = ()=>{
        axiosClient.delete(`/api/schedules/${route.params.deviceId}/${data._id}`, config)
            .then(res => {
                console.log(res.data)
                navigation.goBack()
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.message)
            })
    }


    return (
        <View style={styles.container}>
            <View style ={styles.timeWidget}>
                <ScrollPicker
                    dataSource={Hours}
                    selectedIndex={selectedHourIndex}
                    renderItem={(data, index) =>{
                        return <>
                            {index === selectedHourIndex ? (
                                <Text style={styles.selectedText}>{data}</Text>
                            ) : (
                                <Text style={styles.unselectedText}>{data}</Text>
                            )}
                        </>
                    }}
                    onValueChange={(data, selectedIndex) => {
                        setHour(data),
                        setSelectedHourIndex(selectedIndex)
                    }}
                    wrapperHeight={250}
                    wrapperWidth={150}
                    wrapperColor='#FFFFFF'
                    itemHeight={50}
                    highlightColor='#d8d8d8'
                    highlightBorderWidth={2}
                />
                <ScrollPicker
                    dataSource={Minutes}
                    selectedIndex={selectedMinuteIndex}
                    renderItem={(data, index) => {
                        return <>
                            {index === selectedMinuteIndex ? (
                                <Text style={styles.selectedText}>{data}</Text>
                            ) : (
                                <Text style={styles.unselectedText}>{data}</Text>
                            )}
                        </>
                    }}
                    onValueChange={(data, selectedIndex) => {
                        setMinute(data)
                        setSelectedMinuteIndex(selectedIndex)
                    }}
                    wrapperHeight={250}
                    wrapperWidth={150}
                    wrapperColor='#FFFFFF'
                    itemHeight={50}
                    highlightColor='#d8d8d8'
                    highlightBorderWidth={2}
                />
            </View>
            <View style={styles.options}>
                <View>
                    {/* <SelectList
                        placeholder='Choose a day'
                        setSelected={(val) => setDay(val)}
                        data={Days}
                        save="key"
                    /> */}
                    
                    {show ? (
                        <DateTimePicker value={date ? date : new Date()} mode='date' display="default"
                            onChange={(event, val) => {
                                if (event.type == 'dismissed') {
                                    setShow(!show)
                                    return;
                                }
                                setShow(!show)
                                setDate(val)
                            }}
                            
                        />
                    ) : (
                    <Button
                        onPress = {()=>{
                            setShow(!show)
                        }}
                    >
                            {date ?  date.toLocaleDateString()  : 'Choose a day'}
                    </Button>)}
                </View>
                <View style={{marginTop: 10, marginBottom: 10}}>
                    <SelectList
                        placeholder='Choose action'
                        setSelected={(val) => setAction(val)}
                        data={[
                            {key: true, value: 'Turn on'},
                            {key: false, value: 'Turn off'}
                        ]}
                        save="key"
                        defaultOption={{key: true, value: 'Turn on'}}
                    />
                </View>
                <Button radius={10}
                    onPress={route.params?.data ? handleSave : handleCreate}
                >
                    {route.params?.data ? 'SAVE' : 'CREATE'}
                </Button>
                {route.params?.data &&  (
                    <View style={{marginTop: 10}}>
                        <Button radius={10}
                            color="error"
                            onPress={handleDelete}
                            
                        >
                            DELETE
                        </Button>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
    },
    timeWidget: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%'
    },
    selectedText:{
        color: '#534A4A',
        fontSize: 20,
        lineHeight: 22
    },
    unselectedText: {
        color: '#C7B9B9',
        fontSize: 18,
        lineHeight: 20
    }
    ,
    options: {
        display: 'flex',
        height: 300,
        marginTop: 20,
        width: 300,
        justifyContent: 'center'
    }
})

export default ScheduleScreen;