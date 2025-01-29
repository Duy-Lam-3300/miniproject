import { useEffect, useState } from "react";
import weatherApi from "../../services/weatherapi";
import Select from "react-select/base";

import "../../style/weather.css";
import { format } from "date-fns";
import ScreenPhone from "../../component/forecast/ScreenPhone";


export default function Weather() {
    const [weatherData, setWeatherData] = useState();
    const [location, setLocation] = useState("VietNam");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState();
    const { getForecast } = weatherApi();
    const dateTimeNow = new Date();

    useEffect(() => {
        const fetchBeginData = setTimeout(async () => {
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
        }, 1000);
        return () => clearTimeout(fetchBeginData);
    }, [location])

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

    console.log("here", weatherData?.data);
    return (
        <div className="w-[100vw] h-[100vh]">
            {/* <div className="w-full h-full">
                <div className="dateTime">{format(dateTimeNow, "cccc, dd MMMM")}</div>
                <div className="grid grid-cols-4 grid-rows-2">
                    <div className="col-span-2 row-span-2  h-fit">
                        <img className="w-full h-full" src={weatherData?.data?.forecast?.forecastday[0]?.day?.condition?.icon} />
                    </div>
                    <div className="col-span-2 h-full flex justify-center items-center">
                        <div className="text-8xl relative w-fit font-semibold">
                            <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.avgtemp_c}</p>
                            <p className="absolute -top-2 -right-10 text-4xl">oC</p>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 h-full ">
                        <div className="w-[100%] flex flex-col justify-center items-center font-semibold">
                            <img className="w-[30%] h-fit" src="https://cdn-icons-png.flaticon.com/512/2011/2011448.png" />
                            <div className="flex gap-2">
                                <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.avgvis_km}</p>
                                <p>KMPH</p>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">Wind</p>

                        </div>
                        <div className="w-[100%] flex flex-col justify-center items-center font-semibold">
                            <img className="w-[30%] h-fit" src="https://cdn-icons-png.flaticon.com/512/2930/2930014.png" />
                            <div className="flex">
                                <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.avghumidity}</p>
                                <p>%</p>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">Humidity</p>

                        </div>
                    </div>

                </div>
                <img className="w-[35px] h-[35px]" src="https://cdn-icons-png.flaticon.com/512/3179/3179068.png " alt="" title="" />
                <input name="location" onChange={handleChange} value={location} />
                <button onClick={handleGetForecast} ><img className="w-[35px] h-[35px]" src="https://cdn-icons-png.flaticon.com/512/3031/3031293.png" /></button>

                <p>{weatherData?.data?.forecast?.forecastday[0]?.day?.condition?.text}</p>



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
            </div> */}
            <div className="h-full w-fit p-10">
                <ScreenPhone current={weatherData?.data?.current} forecast={weatherData?.data?.forecast?.forecastday} />
            </div>
        </div>
    )
}