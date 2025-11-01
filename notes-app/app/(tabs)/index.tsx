import {Text, TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics';
import {useRouter} from 'expo-router';
import {STYLES} from "@/styles/styles";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNotes} from "@/context/noteProvider";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {getWeatherByCoordinates} from "@/uitls/getWeatherByCoordinates";

interface LocationData {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
}

export default function HomeScreen() {
    const [locationData, setLocationData] = useState<LocationData  | null>(null)
    const [temperature, setTemperature] = useState<number | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const router = useRouter();
    const {notes} = useNotes()

    const handlePress = () => {
        Haptics.selectionAsync()
        router.navigate("/notes")
    }

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return;
            }
            let location = await Location.getCurrentPositionAsync({})
            const { latitude, longitude } = location.coords
            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            if (reverseGeocode.length > 0) {
                const address = reverseGeocode[0];
                setLocationData({
                    city: address.city || address.name || 'Unknown',
                    country: address.country || 'Unknown',
                    latitude,
                    longitude,
                });
                const temperature = await getWeatherByCoordinates(latitude, longitude)
                setTemperature(temperature)
            } else {
                setErrorMsg('Could not determine your location');
            }
        }

        getCurrentLocation()
    }, []);

    let locationText = 'Getting your location....';
    if (errorMsg) {
        locationText = errorMsg;
    } else if (locationData) {
        locationText = `Temperature in ${locationData.city}, ${locationData.country} : ${temperature}°C`;
    }

    return (
        <SafeAreaView style={STYLES.page}>
            <Text style={STYLES.title}>Welcome to notes app</Text>
            <Text style={STYLES.text}>You have {notes.length} {notes.length === 1 ? "note" : "notes"}</Text>
            <Text style={STYLES.text}>{locationText}</Text>
            <TouchableOpacity activeOpacity={0.6} style={STYLES.button} onPress={handlePress}>
                <Text style={STYLES.buttonText}>Go to notes</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}