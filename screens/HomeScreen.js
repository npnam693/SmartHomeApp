

import { View } from 'react-native';
import { ScreenHeight } from '@rneui/base';
import { useEffect, useState, useContext } from 'react';

import ControlDevice from '../components/ControlDevice';
import GeneralInfo from '../components/GeneralInfo';
import AuthContext from '../AuthContext';
import { axiosClient } from '../api/axiosClient';
export default function HomeScreen({navigation}){
    const [deviceData, setDeviceData] = useState([])
    const { socket, setNotifs } = useContext(AuthContext)
    useEffect(() => {
        axiosClient.get("api/device/")
            .then((device) => setDeviceData(device.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <View style = {{display: 'flex', flexDirection:'column', width: '100%'}} >
            <GeneralInfo navigation = {navigation}/>
            <View style = {{width: '100%', height:ScreenHeight - 190}}>
                <View style={{alignSelf: 'center'}}>
                    {
                        deviceData.map((device, index) => 
                            <ControlDevice key={index} navigation = {navigation} type = {device.type} deviceID={device._id} />
                        )
                    }                
                </View>
            </View>
        </View>
    )
}