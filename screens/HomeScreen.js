

import { View } from 'react-native';
import { ScreenHeight } from '@rneui/base';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ControlDevice from '../components/ControlDevice';
import GeneralInfo from '../components/GeneralInfo';
export default function HomeScreen({navigation}){
    const [deviceData, setDeviceData] = useState([])

    useEffect(() => {
        axios.get("http://10.0.2.2:3000/api/device/")
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