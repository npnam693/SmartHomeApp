import { Modal, View, Text, Pressable, StyleSheet } from "react-native"


export default function ModalOption({visible, data, actionPressOutside}) {
    return (
    <Modal animationType="slide" transparent={true} visible={visible}>
        <Pressable onPress={actionPressOutside}>
            <View style = {{height:'100%', backgroundColor: 'rgba(0,0,0,0.3)', width:'100%'}}>
            </View>
        </Pressable>
        <View style={styles.modalContent}>
            <View style={styles.modalOption}>
                {
                    data.map((item, index) => (
                        <Pressable key={index} onPress={item.action}>
                            <View style={styles.actionSelect}>
                                    {item.icon}
                                    <Text style={styles.optionText}>{item.title}</Text>
                            </View>
                        </Pressable>
                    ))       
                }
            </View>
        </View>
    </Modal>  
    )
}

const styles = StyleSheet.create({
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
      },
    modalOption: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    optionText: {
        fontSize: 16,
        lineHeight: 20,
        color: '#333',
        padding: 10,
        fontWeight: '500'
    },
    actionSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 8,
    }
})