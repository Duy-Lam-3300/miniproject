import { useEffect, useState } from "react";
import weatherApi from "../../services/weatherapi";
import Select from "react-select/base";

import "../../style/weather.css";
import { addDays, format } from "date-fns";
import ScreenPhone from "../../component/forecast/ScreenPhone";
import FutureForecastBox from "../../component/forecast/FutureForecastBox";
import CityBox from "../../component/forecast/CityBox";


export default function Weather() {
    const [weatherData, setWeatherData] = useState();
    const [weatherData2, setWeatherData2] = useState();
    const [weatherData3, setWeatherData3] = useState();

    const [tomorowData, setTomorowData] = useState();
    const [location, setLocation] = useState("Ho Chi Minh");
    const [location2, setLocation2] = useState("Vung Tau");
    const [location3, setLocation3] = useState("Ha Noi");
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState();
    const { getForecast, getForecastFuture, searchingAndAutoComplete } = weatherApi();

    useEffect(() => {
        const fetchBeginData = async () => {
            try {
                setLoading(true);
                const resultData = await getForecast(location, 5, "yes", null, "vi");
                setWeatherData(resultData);
                const resultData2 = await getForecast(location2, 1, "yes", null, "vi");
                setWeatherData2(resultData2);
                const resultData3 = await getForecast(location3, 1, "yes", null, "vi");
                setWeatherData3(resultData3);

                console.log("resultData", resultData);
                console.log("resultData2", resultData2);
                console.log("resultData3", resultData3);

            } catch (e) {
                console.log(e);

            } finally {
                setLoading(false);
            }
        }
        fetchBeginData();
    }, [location, location2, location3])
    const handleSearching = async (dataQ) => {

        try {
            setLoading(true)
            const result = await searchingAndAutoComplete(dataQ);
            if (result?.status === 200) {
                setLocations(result?.data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-[100vw] h-[100vh] flex justify-between p-10">
            <div className="h-full w-fit">
                <ScreenPhone weatherData={weatherData?.data} location={location} setLocation={setLocation} handleSearching={handleSearching} locations={locations} setLocations={setLocations} />
            </div>
            <div className="flex flex-col w-full gap-10 px-10">
                <div className="flex w-full gap-10 ">
                    <div className="min-w-[26rem]">
                        <FutureForecastBox data={weatherData?.data?.forecast?.forecastday[1]} />
                    </div>
                    <div className="min-w-[26rem]">
                        <FutureForecastBox data={weatherData?.data?.forecast?.forecastday[2]} />
                    </div>

                </div>
                <div className="flex w-fit gap-10">
                    <div className="min-w-[26rem]">
                        <CityBox weatherData={weatherData2?.data} location={location2} setLocation={setLocation2} handleSearching={handleSearching} locations={locations} setLocations={setLocations} />
                    </div>
                    <div className="min-w-[26rem]">
                        <CityBox weatherData={weatherData3?.data} location={location3} setLocation={setLocation3} handleSearching={handleSearching} locations={locations} setLocations={setLocations} />
                    </div>
                </div>
            </div>

        </div>
    )
}