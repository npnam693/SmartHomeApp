import { Text, View, StyleSheet, Dimensions, ScrollView,Image } from "react-native";
import { Button } from '@rneui/themed';
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit"
import TableData from "../../components/TableData";
import { axiosAdafruit } from "../../api/axiosSetup";

import ModalOption from "../../components/ModalOption";
const mode = ["MONTH", 'WEEK', 'YEAR']


export default function DetailVisualization({ navigation, route }) {
    const typeSensor = route.params.sensorType
    const [modeSelected, setModeSelected] = useState(mode[0])
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([])
    const [dataTemp, setDataTemp] = useState()
    let colorchart
    let styledata
    let pic
    if (typeSensor=='bbc-temp')
    {
        colorchart='#C4F1F9'
        styledata=styles.infoValue
        pic=require('../../assets/images/Sunny.png')
        
    }
    else
    {
        colorchart='#ccfccd'
        styledata=styles.infoValuehumi
        pic=require('../../assets/images/weak.png')
       
    }
    useEffect(() => {
        if (modeSelected === 'MONTH') { 
            axiosAdafruit.get(`${typeSensor}/data/chart?hours=720&resolution=30`)
                .then((res) => {
                    setData(res.data.data)
                    const resValue = res.data.data.map(item => Number(item[1]))
                    setDataTemp(resValue)
                })
                .catch((err) => console.log(err))

        }
         else if (modeSelected === 'WEEK') {
            axiosAdafruit.get(`${typeSensor}/data/chart?hours=168&resolution=30`)
                .then((res) => {
                    setData(res.data.data)
                    const resValue = res.data.data.map(item => Number(item[1]))
                    setDataTemp(resValue)
                })
                .catch((err) => console.log(err))
                
        }
        else
        {
            axiosAdafruit.get(`${typeSensor}/data/chart?hours=720&resolution=60`)
            .then((res) => {
                setData(res.data.data)
                const resValue = res.data.data.map(item => Number(item[1]))
                setDataTemp(resValue)
            })
            .catch((err) => console.log(err))
        }
        
    }, [modeSelected])

    if (dataTemp) {
        console.log(dataTemp, modeSelected)
    }

    const getModeTitle = (mode) => {
        if (mode === 'MONTH') return 'Last 30 days'
        else if (mode === 'YEAR') return 'Last 4 months'
        else if (mode === 'WEEK') return 'Last 7 days'
    }
    const dataModal = [
        {
            title: 'Last 30 days',
            action: () => { 
                setModeSelected(mode[0])
                setShowModal(false)
            }
        },
        {
            title: 'Last 7 days',  
            action: () => { 
                setModeSelected(mode[1])
                setShowModal(false)
            }
        },
        {
            title: 'Last 4 months',  
            action: () => { 
                setModeSelected(mode[2])
                setShowModal(false)
            }
        },
        {
            title: 'Close',
            action: () => setShowModal(false)
        }
    ]

    return (
        <View style = {styles.container}>
            <View style={{
                backgroundColor:"#e6fffa",
                
            }}>
           
            <View style={styles.quickInfo}>
                <View style = {styles.quickInfoItem}>
                    <Text style={styledata}>{dataTemp && Math.min(...dataTemp).toFixed(1)}</Text>
                    <Text style = {styles.infoTitle} >Lowest</Text>
                </View>
                <View style = {styles.quickInfoItem}>
                    <Text style={styledata}>{dataTemp && Math.max(...dataTemp).toFixed(1)}</Text>
                    <Text style = {styles.infoTitle}>Highest</Text>
                </View>
                <View>
                <View style = {styles.selected}>
                <Button radius={6} size="md" containerStyle={{ width: 130}}
                    titleStyle = {{fontSize: 14}}
                    onPress={() => setShowModal(true)}
                >
                    {getModeTitle(modeSelected)}
                </Button>
                </View>
                <ModalOption visible={showModal} data={dataModal} actionPressOutside={() => setShowModal(false)} />
            </View>
               
            </View>
            <View style={{
                flexDirection:'row',
            }}>
            <View style={styles.infoAvg} >
                    <Text style={styledata} >{dataTemp && Number(dataTemp.reduce((a,b) => a + b, 0) / dataTemp.length).toFixed(1)}</Text>
                    <Text style = {styles.infoTitle} >Average</Text>
                </View>
            <Image style={{
                width: "20%",
                height: 80,
                marginLeft:'20%',
                marginBottom:10,
            }}
             source={pic}/>
            </View>
           
            </View>

            
            <LineChart
                     data={{
                        // labels: ["1h", "2h", "3h", "4h", "5h", "6h"],
                        datasets: [
                            {
                                data: dataTemp ? dataTemp
                                :
                                    [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]   
                            }
                    ]
                    }}
                    width={Dimensions.get("window").width - 50} // from react-native
                    height={180}
                    // yAxisLabel="$"
                    yAxisSuffix =" C"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "black",
                    backgroundGradientFrom: colorchart,
                    backgroundGradientTo: colorchart,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "#4299E1"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 4,
                    borderRadius: 16,
                    alignItems:'center',
                    }}
                />
            {
            
            dataTemp && 
            <ScrollView style={{ width: '100%', paddingHorizontal: 27, marginTop: 16 }}>
                <TableData data = {data} />
            </ScrollView>
            }

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    selected: {
        padding: 16,
        marginLeft: 'auto',
        paddingHorizontal: 30, 
        
    },
    quickInfo: {
        // height: '20%'    ,
        // backgroundColor: '#EBF8FF',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        
        paddingHorizontal: 30,
        marginBottom: 10
    },
    quickInfoItem: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        padding: 20,
        paddingVertical: 12,
        
        borderRadius: 10,
        borderColor: '#ccc'


        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 1.41,
        
        // elevation: 1,
    },
    infoAvg:{
        borderWidth: 1,
        borderColor: '#ccc',
        width:100,
        height:70,
        marginLeft:'18%',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    infoValue: {
        fontSize: 24,
        fontWeight: '700',
        color:'#C43D3D'
        
    },
    infoValuehumi:
    {
        fontSize: 24,
        fontWeight: '700',
        color:'#1EA0E9'
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '500',
        color:'#333'
    },
    containerTable: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})