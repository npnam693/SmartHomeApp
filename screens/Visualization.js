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
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('DetailVisualization')}>
                <Text>Temperator</Text>
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
                    height={180}
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
            
            <TouchableOpacity>
            <Text>Humidity</Text>
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
                    height={180}
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
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text>Light Intensity</Text>

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
                    height={180}
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
                    marginVertical: 8,
                    borderRadius: 16
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
  });