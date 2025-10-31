import {StyleSheet} from "react-native";

export const STYLES = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center",
        gap: 16,
        backgroundColor: "#071013",
    },
    title: {
        fontSize: 32,
        color: "#EEF8FF",
        textAlign: "center",
        fontWeight: "bold",
    },
    button: {
        width: "95%",
        backgroundColor: "#7D53DE",
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: "#EEF8FF",
        textAlign: "center",
        fontWeight: "bold",
    }
})