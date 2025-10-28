import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = () =>{
      Haptics.selectionAsync()
      router.navigate("/notes")
  }

  return (
    <View style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to my notes App </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={{fontWeight:"bold"}}>Go to notes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page : {
    flex:1,  
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
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
});
