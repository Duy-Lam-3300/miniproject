import axios from "axios";

export default function weatherApi() {
    const keyData = process.env.REACT_APP_WEATHER_KEY;
    const getForecast = async (location, days = 1, aqi = "no", alerts = "no", lang = "vi") => {
        try {
            const queryData =new URLSearchParams();
            queryData.append("key", keyData);
            queryData.append("q", location);
            queryData.append("days", days);
            queryData.append("aqi", aqi);
            queryData.append("alerts", alerts);
            queryData.append("lang", lang = "vi");
            const result = await axios.get("http://api.weatherapi.com/v1/forecast.json?" + queryData.toString());
            return result
        } catch (e) {
            console.log(e);

        }
        return null
    }
    const getTimeZone = async (location, days = 1, aqi = "no", alerts = "no") => {
        try {
            const result = await axios.get("http://api.weatherapi.com/v1/forecast.json?key=" + keyData + "&q=" + location + "&days=" + days + "&aqi=" + aqi + "&alerts=" + alerts + "&");
            return result
        } catch (e) {
            console.log(e);

        }
        return null
    }





    return { getForecast };
}