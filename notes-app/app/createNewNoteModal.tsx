import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {STYLES} from "@/styles/styles";
import {useState} from "react";
import {INote} from "@/interfaces/INote";
import {useRouter} from "expo-router";
import * as Haptics from "expo-haptics";
import {useNotes} from "@/context/noteProvider";
import {generateUUID} from "@/uitls/uuid";

export default function CreateNote() {
    const { addNote } = useNotes()
    const router = useRouter();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleCreateNote = () => {
        Haptics.selectionAsync()
        const newNote: INote = {
            id: generateUUID(),
            title: title,
            content: description,
            createdAt: new Date().toDateString(),
        }
        addNote(newNote)
        setTitle('');
        setDescription('');
        router.back();
    }

    return (
        <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>
            <View style={STYLES.page}>
                <TextInput value={title} onChangeText={setTitle} style={styles.textInput} placeholder={"Note title"}/>
                <TextInput value={description} onChangeText={setDescription} multiline={true} style={styles.textInput}
                           placeholder={"Note description"}/>
                <TouchableOpacity onPress={handleCreateNote} activeOpacity={0.6} style={STYLES.button}>
                    <Text style={STYLES.buttonText}>Add Note</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Haptics.selectionAsync()
                    router.back()
                }} activeOpacity={0.6} style={[STYLES.button, styles.buttonBack]}>
                    <Text style={STYLES.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
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
});
