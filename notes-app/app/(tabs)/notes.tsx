import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {STYLES} from "@/styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {useNotes} from "@/context/noteProvider";

export default function Notes() {
    const router = useRouter();
    const { notes } = useNotes();

    return (
        <SafeAreaView style={STYLES.page}>
            <Text style={STYLES.title}>My Notes</Text>
            <TouchableOpacity activeOpacity={0.6} style={STYLES.button} onPress={()=>router.navigate("/createNewNoteModal")}>
                <Text style={STYLES.buttonText}>Add Note</Text>
            </TouchableOpacity>
            <FlatList style={{width: "95%"}} contentContainerStyle={styles.notesList}
                      data={notes}
                      keyExtractor={(item) => item.id.toString()}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item}) =>
                          <TouchableOpacity activeOpacity={0.8} key={item.id} style={styles.note}>
                              <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                              <Text>{item.content}</Text>
                              <Text style={{fontSize:12, opacity:0.5}}>{item.createdAt}</Text>
                          </TouchableOpacity>
                      }
                      ListEmptyComponent={<Text style={{fontWeight:"bold", color:"#EEF8FF", textAlign:"center"}}>You have 0 notes</Text>}
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
        gap: 4,
        borderRadius: 20,
        padding: 16,
        backgroundColor: "#EEF8FF"
    }
});
