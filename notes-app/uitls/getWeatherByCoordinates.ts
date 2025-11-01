export const getWeatherByCoordinates = async (latitude : number, longitude : number) : Promise<number | null>  => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    try {
        const response = await fetch(url)
        const jsonData = await response.json()
        return Math.round(jsonData.current.temperature_2m)
    } catch (error) {
        console.error('Error fetching weather:', error)
        return null
    }
}