import {KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNotes} from "@/context/noteProvider";
import {useLocalSearchParams, useRouter} from "expo-router";
import * as Haptics from "expo-haptics";
import {STYLES} from "@/styles/styles";

export default function EditNote() {
    const {deleteNote, updateNote, notes} = useNotes()
    const router = useRouter()
    const params = useLocalSearchParams()
    const noteId = params.id as string
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (noteId && notes.length > 0) {
            const existingNote = notes.find(note => note.id === noteId);
            if (existingNote) {
                setTitle(existingNote.title);
                setDescription(existingNote.content);
            }
        }
    }, [noteId, notes]);


    const handleSaveNote = () => {
        Haptics.selectionAsync()
        updateNote(noteId, {
            title: title.trim(),
            content: description.trim(),
        })
        router.back();
    }

    return (
        <KeyboardAvoidingView behavior={"padding"} style={{flex: 1}}>
            <ScrollView style={{flex: 1}} contentContainerStyle={STYLES.page}>
                <TextInput value={title} onChangeText={setTitle} style={STYLES.textInput} placeholder={"Note title"}/>
                <TextInput value={description} onChangeText={setDescription} multiline={true}
                           style={[STYLES.textInput, {minHeight: 92, textAlignVertical: 'top',}]}
                           placeholder={"Note description"}/>
                <TouchableOpacity onPress={handleSaveNote} activeOpacity={0.6} style={STYLES.button}>
                    <Text style={STYLES.buttonText}>Save changes</Text>
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
