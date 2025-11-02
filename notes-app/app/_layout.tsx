import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/use-color-scheme';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NoteProvider} from "@/context/noteProvider";

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            <NoteProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        <Stack.Screen name="createNewNoteModal" options={{presentation: 'modal', title: 'Create new note'}}/>
                        <Stack.Screen name="editNoteModal" options={{presentation: 'modal', title: 'Edit note'}}/>
                    </Stack>
                    <StatusBar style="auto"/>
                </ThemeProvider>
            </NoteProvider>
        </SafeAreaProvider>
    );
}
