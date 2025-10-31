import {KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity,} from 'react-native';
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
            <ScrollView style={{flex:1}} contentContainerStyle={STYLES.page}>
                <TextInput value={title} onChangeText={setTitle} style={STYLES.textInput} placeholder={"Note title"}/>
                <TextInput value={description} onChangeText={setDescription} multiline={true} style={[STYLES.textInput, {minHeight: 92, textAlignVertical: 'top',}]} placeholder={"Note description"}/>
                <TouchableOpacity onPress={handleCreateNote} activeOpacity={0.6} style={STYLES.button}>
                    <Text style={STYLES.buttonText}>Add Note</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Haptics.selectionAsync()
                    router.back()
                }} activeOpacity={0.6} style={[STYLES.button, STYLES.buttonBack]}>
                    <Text style={STYLES.buttonText}>Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

