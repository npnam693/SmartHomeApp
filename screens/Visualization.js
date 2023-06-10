import { Text, View, Dimensions, StyleSheet, TouchableOpacity} from "react-native"
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import { axiosAdafruit } from "../api/axiosSetup";


const typeSensor = ["bbc-temp, bbc-humi"]

export default function Visualiaztion({ navigation }) {
    const [temp, setTemp] = useState()
    const [humi, setHumi] = useState()

    useEffect(() => {
        axiosAdafruit.get('bbc-temp/data/chart?hours=2000&resolution=60')
            .then((temp) => setTemp(temp.data.data.slice(0,6)))
            .catch((err) => console.log(err))
        
        axiosAdafruit.get('bbc-humi/data/chart?hours=2000&resolution=60')
            .then((humi) => setHumi(humi.data.data.slice(0,6)))
            .catch((err) => console.log(err))
    
    }, [])
    
    return (
        <View style={styles.container}>
            {/* <View style = {{paddingTop: 50, flexDirection: 'row', width:'100%', justifyContent:'space-between', alignItems:'flex-end', backgroundColor:'#EBF8FF', paddingHorizontal: 30, paddingVertical: 12, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <View style={{position:'relative'}}>
                            <Text style ={styles.temparatureText}>10</Text>
                            <View style={{position: 'absolute', right: -8}}>
                                <View style = {styles.tempO}></View>
                            </View>
                        </View>
                        <Text>Temperature</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.humidityText}>20</Text>
                        <Text>Humidity</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        <Text style = {styles.lightText}> lux</Text>
                        <Text>Light Intensity</Text>
                    </View>
            </View> */}


            <TouchableOpacity onPress={() => navigation.navigate('DetailVisualization', {sensorType: 'bbc-temp'})}>
            <Text style = {styles.titleChart}>Temperature</Text>
            <LineChart
                data={{
                labels: temp ? temp.map((item, index) => {
                            const date = new Date(item[0])
                            return date.getHours().toString() + 'h'
                        })
                        :["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        data: temp ? temp.map(item => Number(item[1]).toFixed(1)) : [1,3,4,5,6,6]
                    }
                ]
                }}
                width={Dimensions.get("window").width - 50} // from react-native
                height={Dimensions.get("window").height * 0.23}
                // yAxisLabel="$"
                yAxisSuffix =" C"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "black",
                backgroundGradientFrom: "#00B5D8",
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
                borderRadius: 16
                }}
            />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('DetailVisualization', {sensorType: 'bbc-humi'})}>
            <Text style = {styles.titleChart}>Humidity</Text>
                <LineChart
                    data={{
                    labels: ["1h", "2h", "3h", "4h", "5h", "6h"],
                    datasets: [
                        {
                        data: [
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
                    height={Dimensions.get("window").height * 0.23}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#C4FCC7",
                    backgroundGradientFrom: "#CCFCCD",
                    backgroundGradientTo: "#92CE95",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(56, 56, 56, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#67B56A"
                    }
                    }}
                    bezier
                    style={{
                        marginVertical: 4,
                        borderRadius: 16
                    }}
                />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('DetailVisualization', {sensorType: 'bbc-humi'})}>
                <Text style = {styles.titleChart}>Light Intensity</Text>

                <LineChart
                    data={{
                    labels: temp ? temp.map((item, index) => {
                        const date = new Date(item[0])
                        // return date.getHours().toString() + 'h ' + date.getDate().toString() + '/' + (date.getMonth() + 1).toString()
                        return date.getHours().toString() + 'h'
                    })
                    :["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: temp ? temp.map(item => Number(item[1]).toFixed(1)) : [1,3,4,5,6,6]
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width - 50} // from react-native
                    height={Dimensions.get("window").height * 0.23}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                    bezier
                    style={{
                        marginVertical: 4,
                        borderRadius: 16
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',    
        alignItems: 'center',
    },
    titleChart: {
        fontSize: 14,
        fontWeight: '500'
    },
    temparatureText: {
        fontSize: 24,
        color: '#C43D3D',
        fontWeight: '700',
        position: 'relative'
    },
    humidityText: {
        color : '#1EA0E9',  
        fontSize: 24,
        fontWeight: '700',
        bottom: 2,
    },
    lightText: {
        color: '#ECC94B',
        fontSize: 20,
        fontWeight: '700',
        bottom: 6,
    },
    tempO: {
        width: 8,
        height: 8,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#C43D3D',
    }
  });