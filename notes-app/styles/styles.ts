import {StyleSheet} from "react-native";

export const STYLES = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    text:{
        fontSize: 16,
        color: "#EEF8FF",
        textAlign: "center",
        fontWeight: "regular",
    },
    buttonText: {
        fontSize: 16,
        color: "#EEF8FF",
        textAlign: "center",
        fontWeight: "bold",
    },
    textInput: {
        width: "95%",
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#EEF8FF',
        minHeight: 48,
    },
    buttonBack: {
        backgroundColor: "transparent",
        outlineColor: "#EEF8FF",
        outlineWidth: 1,
        outlineStyle: "solid"
    }
})