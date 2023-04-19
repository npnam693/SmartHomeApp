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
export const typeSensor = {
    temp: {
        name: "Temperature",
        feedId: "bbc-temp",
    },
    humidity: {
        name: "Humidity",
        feedId: "bbc-humi",
    },
    lightIntensity: {
        name: "Light Intensity",
        feedId: "bbc-humi"
    },
}
export default function Visualiaztion({navigation}) {
    const [temp, setTemp] = useState([
        {"created_at": "",
         "created_epoch": 0,
          "expiration": "0",
           "feed_id": 0,
            "feed_key": "bbc-temp",
             "id": "0F8YXZMQPGP5RAC3BFSE8QZQN5",
              "value": ""}
    ])
    const [humi, setHumi] = useState([{
        "created_at": "",
         "created_epoch": 0,
          "expiration": "",
           "feed_id": 0,
            "feed_key": "bbc-temp",
             "id": "0F8YY0H4VX1G1465BAFVZP7ZNY",
              "value": ""}])
    const [tempSingle,setTempSingle]= useState(30)
    const [humiSingle,sethumiSingle]= useState(30)
    
    useEffect(() => {
        Object.entries(typeSensor).map(([key, value]) => {
            axiosAdafruit.get(`bbc-temp/data?limit=1000`)
                .then(res => {
                    setTemp(res.data)
                })
                .catch(err => console.log(err.response))
                axiosAdafruit.get(`bbc-temp/data?limit=1`)
                .then(res => {
                    setTempSingle(res.data[0].value)
                })
                .catch(err => console.log(err.response))

                axiosAdafruit.get(`bbc-humi/data?limit=100`)
                .then(res => {
                    setHumi(res.data)
                    
                   
                })
                .catch(err => console.log(err.response))
                axiosAdafruit.get(`bbc-humi/data?limit=1`)
                .then(res => {
                    sethumiSingle(res.data[0].value)
                    
                   
                })
                .catch(err => console.log(err.response))
        })
    }, [])
    let tempList=[
        {
            date: new Date('2023-03-29T08:04:44Z'),
            data: 0
        }
    ]
    let chartdata=[]
    
    if(temp.length>1) {
   
    for(let x in temp)
    {
        let temp1={
            date:  new Date(temp[x].created_at),
            data: Number(temp[x].value)
        }
        tempList.push(temp1);
    }
    let num=(tempList.length/6).toFixed();
    let sum=0;
    for(let x in tempList) {
       if(x>=1)
       { sum=sum+tempList[x].data 
        if( x %num==0)
        {   
            tempList[x].data=(sum/num).toFixed(1)
            chartdata.push(tempList[x])
            sum=0;
        }
       
       }
    }
    
}

let humiList=[
    {
        date: new Date('2023-03-29T08:04:44Z'),
        data: 0
    }
]
let chartHumiData=[]
if(humi.length>1) {
   
    for(let x in humi)
    {
        let humi1={
            date:  new Date(humi[x].created_at),
            data: Number(humi[x].value)
        }
        humiList.push(humi1);
    }
    let num=(humiList.length/6).toFixed();
    for(let x in humiList) {
       if(x>=1)
       { if(x==1 || x %num==0)
        chartHumiData.push(humiList[x])
       }
    }
    
}
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
                onPress={()=>{navigation.navigate("VisualiaztionScreenDetail",{type:'bbc-temp'})}} >
                <Text style={styles.textline3}>Temperature</Text>
               <LineChart
                    data={{
                    labels: chartdata.length>=1 ? chartdata.map((item,index)=>
                    {    let hours=1 + index
                            
                        return hours +'h'
                    }) :["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: chartdata.length>=1 ? chartdata.map((item,index)=>
                            {  
                                return item.data
                            }) :[30,60,40,50,25,37]
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
                onPress={()=>{navigation.navigate("VisualiaztionScreenDetail",{type:'bbc-humi'})}}
            >
                <Text style={styles.textline3}>Humidity</Text>
               <LineChart
                    data={{
                    labels: chartHumiData.length>=1 ? chartHumiData.map((item,index)=>
                    {
                        return index.toString() +'h'
                    }) :["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: chartHumiData.length>=1 ? chartHumiData.map((item,index)=>
                            {
                                return item.data
                            }) :[30,60,40,50,25,37]
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