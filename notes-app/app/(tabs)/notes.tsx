import {useState} from 'react';
import {StyleSheet, Text, ScrollView, View, TouchableOpacity} from 'react-native';

interface Note {
  id: number,
  title: string,
  content: string,
  createdAt: string,
}

export default function Notes() {
  const [id, setId] = useState<number>(1)
  const [notes, setNotes]=useState<Note[]>([])
  const addNote = () =>{
    let curDate = new Date
    setId(id+1)
    setNotes([...notes, {
      id: id,
      title:"New note",
      content: "Note content",
      createdAt: curDate.toDateString(),
    }])
  }

  return (
      <View style={styles.page}>
        <Text style={styles.title}>My Notes</Text>
        <TouchableOpacity style={styles.button} onPress={addNote}>
            <Text style={{fontWeight:"bold"}}>Add Note</Text>
        </TouchableOpacity>
        {notes ? 
        <ScrollView contentContainerStyle={styles.notesList}>
          {notes.map((note)=>(
            <View style={styles.note}>
              <Text>{note.id}</Text>
              <Text>{note.title}</Text>
              <Text>{note.content}</Text>
              <Text>{note.createdAt}</Text>
            </View>
          ))} 
        </ScrollView> : <Text>You have 0 notes</Text> }
      </View>
  );
}

const styles = StyleSheet.create({
    page : {
    flex:1,  
    alignItems: "center",
    gap: 16,
    backgroundColor:"#70BFFF",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title:{
    fontSize:32,
    color:"white",
    textAlign:"center",
    fontWeight:"bold",
  },
   button: {
    backgroundColor:"orange",
    flexDirection: 'row',
    padding:16,
    borderRadius: 50,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  notesList : {
    justifyContent:"center",
    flexDirection:"row",
    flexWrap:"wrap",
    gap: 4,
  },
  note :{
    gap:4,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "white"
  }
});
