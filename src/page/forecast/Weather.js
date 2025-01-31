import { useEffect, useState } from "react";
import weatherApi from "../../services/weatherapi";
import Select from "react-select/base";

import "../../style/weather.css";
import { addDays, format } from "date-fns";
import ScreenPhone from "../../component/forecast/ScreenPhone";
import FutureForecastBox from "../../component/forecast/FutureForecastBox";


export default function Weather() {
    const [weatherData, setWeatherData] = useState();
    const [tomorowData, setTomorowData] = useState();
    const [location, setLocation] = useState("Ho Chi Minh");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState();
    const { getForecast, getForecastFuture } = weatherApi();
    const dateTimeNow = new Date();

    useEffect(() => {
        const fetchBeginData = async () => {
            try {
                setLoading(true);
                const resultData = await getForecast(location, 4, "yes", null, "vi");
                console.log(resultData);
                setWeatherData(resultData);


            } catch (e) {
                console.log(e);

            } finally {
                setLoading(false);
            }
        }
        fetchBeginData();
    }, [location])
    console.log("here", weatherData?.data);
    return (
        <div className="w-[100vw] h-[100vh] flex justify-between p-10">
            <div className="h-full w-fit">
                <ScreenPhone weatherData={weatherData?.data} location={location} setLocation={setLocation} />
            </div>
            <div className="">
                <FutureForecastBox data={weatherData?.data?.forecast?.forecastday[1]} />
            </div>
            <div className="">
                <FutureForecastBox data={weatherData?.data?.forecast?.forecastday[2]} />
            </div>
            <div className="">
                <FutureForecastBox data={weatherData?.data?.forecast?.forecastday[3]} />
            </div>
        </div>
    )
}