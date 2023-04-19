import { Text, View, Dimensions, StyleSheet, TouchableOpacity} from "react-native"
import { useState, useEffect } from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

import { axiosAdafruit } from "../api/axiosSetup";

export default function Visualiaztion({navigation}) {
    const [temp, setTemp] = useState([
    ])
    const [humi, setHumi] = useState([
        ])
    const [tempSingle,setTempSingle]= useState(30)
    const [humiSingle,sethumiSingle]= useState(30)
    
    useEffect(() => {
        
            axiosAdafruit.get('bbc-temp/data/chart?hours=2000&resolution=60')
            .then((temp) => setTemp(temp.data.data.slice(0,6)))
            .catch((err) => console.log(err))
            axiosAdafruit.get(`bbc-temp/data?limit=1`)
                .then(res => {
                    setTempSingle(res.data[0].value)
                })
                .catch(err => console.log(err.response))

                axiosAdafruit.get('bbc-humi/data/chart?hours=2000&resolution=60')
                .then((humi) => setHumi(humi.data.data.slice(0,6)))
                .catch((err) => console.log(err))
                axiosAdafruit.get(`bbc-humi/data?limit=1`)
                .then(res => {
                    sethumiSingle(res.data[0].value)
                    
                   
                })
                .catch(err => console.log(err.response))
        
    }, [])
  

    return (
        <View style = {styles.container}>
            <View style ={{
                width: '100%',
                height:40,
                marginTop:40,
                backgroundColor:'#E6FFFA',
                alignItems:'center',
                justifyContent: 'center',

            }
            }>
                <Text style={styles.text}>
                    Visualiaztion
                </Text>
            </View>
            <View style = {{flexDirection: 'row', 
            width:'100%', 
            justifyContent:'space-between', 
            alignItems:'flex-end',
            backgroundColor:"#e3faff"
            }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <View style={{position:'relative'}}>
                            <Text style ={styles.temparatureText}>{tempSingle}</Text>
                            <View style={{position: 'absolute', right: -8}}>
                                <View style = {styles.tempO}></View>
                            </View>
                        </View>
                        <Text style={styles.textline2}>Temperature</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.humidityText}>{humiSingle}%</Text>
                        <Text style={styles.textline2} >Humidity</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.lightText}>{humiSingle} lux</Text>
                        <Text style={styles.textline2}>Light Intensity</Text>
                    </View>
                </View>
            <TouchableOpacity style={{
                backgroundColor:'#C4F1F9', 
                borderRadius:10,
                marginVertical:10,
                alignItems:'center',
                justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('DetailVisualization', {sensorType: 'bbc-temp'})} >
                <Text style={styles.textline3}>Temperature</Text>
               <LineChart
                    data={{
                    labels: temp? temp.map((item,index)=>
                    { 
                        let date = new Date(item[0])
                        return date.getHours() +'h'
                    }
                    ):
                     ["1h", "2h", "3h", "4h", "5h", "6h"],
                    datasets: [
                        {
                            data: temp ? temp.map((item,index)=>{
                                return Number(item[1]).toFixed(1)
                            }) :
                             [30,60,40,50,25,37]
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
                    backgroundGradientFrom: "#C4F1F9",
                    backgroundGradientTo: "#C4F1F9",
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
            </TouchableOpacity>
            <TouchableOpacity 
            style={{
                backgroundColor:'#ccfccd', 
                borderRadius:10,
                marginVertical:10,
                alignItems:'center',
                justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('DetailVisualization', {sensorType: 'bbc-humi'})}
            >
                <Text style={styles.textline3}>Humidity</Text>
               <LineChart
                   data={{
                    labels: humi? humi.map((item,index)=>
                    { 
                        let date = new Date(item[0])
                        return date.getHours() +'h'
                    }
                    ):
                     ["1h", "2h", "3h", "4h", "5h", "6h"],
                    datasets: [
                        {
                            data: humi ? humi.map((item,index)=>{
                                return Number(item[1]).toFixed(1)
                            }) :
                             [30,60,40,50,25,37]
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width - 50} // from react-native
                    height={180}
                    // yAxisLabel="$"
                    yAxisSuffix =" %"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "black",
                    backgroundGradientFrom: "#ccfccd",
                    backgroundGradientTo: "#ccfccd",
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
            </TouchableOpacity>
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize:27,
        fontWeight:'medium',
    },
    temparatureText: {
        fontSize: 26,
        color: '#C43D3D',
        fontWeight: '700',
        position: 'relative'
    },
    humidityText: {
        color : '#1EA0E9',  
        fontSize: 26,
        fontWeight: '700',
        bottom: 2,
    },
    lightText: {
        color: '#ECC94B',
        fontSize: 26,
        fontWeight: '700',
        bottom: 6,
    },
    tempO: {
        
        width: 12,
        height: 12,
        borderWidth: 4,
        borderRadius: 100,
        borderColor: '#C43D3D',
    },
    textline2:{fontWeight: '600',fontSize:17},
    textline3:{fontWeight: '600',fontSize:20},
    
  });