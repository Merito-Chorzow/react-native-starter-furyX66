import { Text, TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import {STYLES} from "@/styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = () =>{
      Haptics.selectionAsync()
      router.navigate("/notes")
  }

  return (
    <SafeAreaView  style={STYLES.page}>
      <Text style={STYLES.title}>Welcome to notes app</Text>
      <TouchableOpacity activeOpacity={0.6} style={STYLES.button} onPress={handlePress}>
        <Text style={STYLES.buttonText}>Go to notes</Text>
      </TouchableOpacity>
    </SafeAreaView >
  );
}