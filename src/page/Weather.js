import { useEffect, useState } from "react";
import weatherApi from "../services/weatherapi";
import Select from "react-select/base";

import "../style/weather.css";


export default function Weather() {
    const [weatherData, setWeatherData] = useState();
    const [location, setLocation] = useState("VietNam");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState();
    const { getForecast } = weatherApi();
    // useEffect(() => {
    //     const fetchBeginData = setTimeout(async () => {
    //         try {
    //             setLoading(true);
    //             const resultData = await getForecast(location);
    //             console.log(resultData);
    //             setWeatherData(resultData);
    //         } catch (e) {
    //             console.log(e);

    //         } finally {
    //             setLoading(false);
    //         }
    //     }, 1000);
    //     return () => clearTimeout(fetchBeginData);
    // }, [location])

    const handleGetForecast = async () => {
        try {
            setLoading(true);
            const resultData = await getForecast(location);
            console.log(resultData);
            setWeatherData(resultData);
        } catch (e) {
            console.log(e);

        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "location") {
            setLocation(value);
        }
    }

    console.log(weatherData);
    console.log("here", weatherData?.data);
    return (
        <div>
            <div>
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/3179/3179068.png " width="256" height="256" alt="" title="" class="img-small" />
                    <input name="location" onChange={handleChange} />
                    <button onClick={handleGetForecast} ><img src="   https://cdn-icons-png.flaticon.com/512/3031/3031293.png " width="256" height="256" alt="" title="" class="img-small" /></button>
                </div>
                <div>
                    <img src={weatherData?.data?.forecast?.forecastday[0]?.day?.condition?.icon} />
                    <div className="degree">
                        <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.avgtemp_c}</p>
                        <p className="o">o</p>
                    </div>
                    <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.condition?.text}</p>
                </div>
                <div>
                    <img src="   https://cdn-icons-png.flaticon.com/512/2011/2011448.png " width="256" height="256" alt="" title="" class="img-small"/>
                        <p>Wind</p>
                        <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.avgvis_km
                        }</p>
                        <p>KMPH</p>
                </div>
                <div>
                <img src="   https://cdn-icons-png.flaticon.com/512/2930/2930014.png " width="256" height="256" alt="" title="" class="img-small"/>
                    <p>Humidity</p>
                    <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.avghumidity}</p>
                    <p>%</p>
                </div>
                <div className="hour">
                    {weatherData?.data?.forecast?.forecastday[0]?.hour?.map(item => (<div>
                        <p>
                            {item?.time?.split(" ")[1]}
                        </p>
                        <div className="degree">
                            <p>{item?.temp_c}</p>
                            <p className="o">o</p>
                        </div>
                        <img src={item?.condition?.icon} />
                    </div>))}
                </div>
            </div>
        </div>
    )
}