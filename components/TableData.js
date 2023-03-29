
import { Text, View, StyleSheet} from "react-native";


const withComponents = [20,30,50]
const dataTest = [[1,2,3], [4,5,6], [7,8,9], [10,11,12]] 

const getDate = (str) => {
    const date = new Date(str)
    return date.toLocaleString()
}

export default function TableData({data}) {
    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <View style = {[styles.itemCell, {flex: 0.15}]}>
                    <Text style = {styles.textHeader}>STT</Text>   
                </View>
                <View style = {[styles.itemCell, {flex: 0.2}]}>
                    <Text style = {styles.textHeader}>Value</Text>   
                </View>
                <View style = {[styles.itemCell, {flex: 0.65}]}>
                    <Text style = {styles.textHeader}>Created At</Text>   
                </View>
            </View>
            {
                data.map((item, index) => (
                    <View style = {styles.itemRow} key ={index}>
                        <View style = {[styles.itemCell, {flex: 0.15}]}>
                            <Text>{index+1}</Text>   
                        </View>
                        <View style = {[styles.itemCell, {flex: 0.2}]}>
                            <Text>{Number(item[1]).toFixed(1)}</Text>   
                        </View>
                        <View style = {[styles.itemCell, {flex: 0.65}]}>
                            <Text>{getDate(item[0])}</Text>   
                        </View>  
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',   
        justifyContent: 'space-between',
        borderRadius: 30
    },
    itemCell: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        padding: 6,
        paddingHorizontal: 8
    },
    itemRow: {
        borderTopWidth: 0,
        flexDirection: 'row',   
        justifyContent: 'space-between',
    },
    textHeader: {
        fontWeight: '500',
        color: '#333'
    }
})

