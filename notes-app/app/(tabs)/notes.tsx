import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {STYLES} from "@/styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {useNotes} from "@/context/noteProvider";
import * as Haptics from "expo-haptics";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Notes() {
    const router = useRouter();
    const {deleteNote, notes} = useNotes();

    const openEditNote = (noteId: string) => {
        Haptics.selectionAsync()
        router.push({
            pathname: '/editNoteModal',
            params: {id: noteId}
        })
    }

    const removeSelectedNote = (selectedId : string) => {
        Haptics.selectionAsync()
        deleteNote(selectedId)
    }

    return (
        <SafeAreaView style={STYLES.page}>
            <Text style={STYLES.title}>My Notes</Text>
            <TouchableOpacity activeOpacity={0.6} style={STYLES.button}
                              onPress={() => router.navigate("/createNewNoteModal")}>
                <Text style={STYLES.buttonText}>Add Note</Text>
            </TouchableOpacity>
            <FlatList style={{width: "95%"}} contentContainerStyle={styles.notesList}
                      data={notes}
                      keyExtractor={(item) => item.id.toString()}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item}) =>
                          <TouchableOpacity onPress={() => openEditNote(item.id.toString())} activeOpacity={0.8}
                                            key={item.id} style={styles.note}>
                              <View style={{flex: 1, gap: 4}}>
                                  <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                                  <Text>{item.content}</Text>
                                  <Text style={{fontSize: 12, opacity: 0.5}}>{item.createdAt}</Text>
                              </View>
                              <TouchableOpacity onPress={() => removeSelectedNote(item.id)} style={{height:64, width: 64, alignItems: "center", justifyContent:"center"}}>
                                  <Ionicons name="trash-bin" size={32} color="red"/>
                              </TouchableOpacity>
                          </TouchableOpacity>
                      }
                      ListEmptyComponent={<Text style={{fontWeight: "bold", color: "#EEF8FF", textAlign: "center"}}>You
                          have 0 notes</Text>}
                      scrollEnabled={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    notesList: {
        alignItems: "stretch",
        justifyContent: "center",
        gap: 4,
    },
    note: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#EEF8FF"
    }
});
