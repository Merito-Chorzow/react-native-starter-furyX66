import {useState} from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import { STYLES } from "@/styles/styles";
import * as Haptics from "expo-haptics";
import {SafeAreaView} from "react-native-safe-area-context";

interface Note {
    id: number,
    title: string,
    content: string,
    createdAt: string,
}

export default function Notes() {
    const [id, setId] = useState<number>(1)
    const [notes, setNotes] = useState<Note[]>([])
    const addNote = () => {
        Haptics.selectionAsync()
        let curDate = new Date
        setId(id + 1)
        setNotes([...notes, {
            id: id,
            title: "New note",
            content: "Note content",
            createdAt: curDate.toDateString(),
        }])
    }

    return (
        <SafeAreaView style={STYLES.page}>
            <Text style={STYLES.title}>My Notes</Text>
            <TouchableOpacity activeOpacity={0.6} style={STYLES.button} onPress={addNote}>
                <Text style={STYLES.buttonText}>Add Note</Text>
            </TouchableOpacity>
            {notes ?
                <ScrollView contentContainerStyle={styles.notesList}>
                    {notes.map((note) => (
                        <TouchableOpacity activeOpacity={0.8} key={note.id} style={styles.note}>
                            <Text>{note.id}</Text>
                            <Text>{note.title}</Text>
                            <Text>{note.content}</Text>
                            <Text>{note.createdAt}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView> : <Text>You have 0 notes</Text>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    notesList: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
    },
    note: {
        gap: 4,
        borderRadius: 20,
        padding: 16,
        backgroundColor: "white"
    }
});
