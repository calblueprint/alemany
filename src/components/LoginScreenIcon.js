import { View, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default LoginScreenIcon = ({ login }) => {

    const styles = StyleSheet.create({
        justifyCenter: {
            justifyContent: 'center',
        },
        greenBox: {
            width: 101,
            height: 95,
            backgroundColor: 'rgba(145, 226, 64, 0.2)',
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            opacity: 1,
        }
    })
    return (
        <View style={styles.greenBox}>
            {login && <Ionicons name="log-in-outline" size={40} color="#52BD41" />}
            {!login && <MaterialCommunityIcons name="inbox-arrow-down" size={40} color="#52BD41" opacity={1} />}
        </View>
    );
}