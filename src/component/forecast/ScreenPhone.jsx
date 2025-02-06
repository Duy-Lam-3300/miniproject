import { fa1, faBars, faDroplet, faHeartCircleCheck, faHeartCircleExclamation, faHeartCircleMinus, faHeartCircleXmark, faHouse, faList, faLocationDot, faMagnifyingGlass, faSliders, faWind, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";




export default function ScreenPhone({ weatherData = {}, location, setLocation, handleSearching, locations = [], setLocations }) {
    const [showPopup, setShowPopup] = useState(false);
    const [inputLocation, setInputLocation] = useState(location);
    const current = weatherData?.current || {};
    const forecast = weatherData?.forecast?.forecastday || [];
    const places = weatherData?.location || {};
    const nav = useNavigate();
    const popupBox = useRef();
    const iconForPopup = useRef();

    const replaceIconFromAPI = [{
        description: "Clear night moon",
        tartget: "//cdn.weatherapi.com/weather/64x64/night/113.png",
        replace: "https://cdn-icons-png.flaticon.com/512/4584/4584492.png"
    }, {
        description: "Verry Clouded",
        tartget: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        replace: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"
    }, {
        description: "Nhiều nắng",
        tartget: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        replace: "https://cdn-icons-png.flaticon.com/512/2698/2698194.png"
    }]

    const windDangerColor = (speed) => {
        if (speed <= 10) return "text-green-500";
        if (speed <= 30) return "text-yellow-500";
        if (speed <= 50) return "text-orange-500";
        if (speed <= 70) return "text-red-500";
        return "text-purple-500";
    }
    const humidityDangerColor = (percent) => {
        if (percent <= 30) return "text-blue-500";
        if (percent <= 60) return "text-green-500";
        if (percent <= 80) return "text-yellow-500";
        return "text-red-500";
    }

    const airQualityDangerColor = (aqi) => {
        if (aqi <= 50) return "text-green-500";
        if (aqi <= 100) return "text-yellow-500";
        if (aqi <= 150) return "text-orange-500";
        if (aqi <= 200) return "text-red-500";
        if (aqi <= 300) return "text-purple-500";
        return "text-brown-500";
    };

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (popupBox.current && !popupBox.current.contains(event.target) && !iconForPopup.current.contains(event.target) && iconForPopup.current) {
                setInputLocation("");
                setShowPopup((prev) => !prev);
                setLocations();
            }
        }
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, [])



    return (<div className="bgcomponent w-[550px] h-full rounded-3xl text-black  p-10 relative overflow-y-scroll select-none " style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex justify-between items-center relative w-full">
            <div className={`  rounded-full bg-[rgb(0,0,0,0.1)] hover:text-white ${showPopup ? (" text-white") : (" text-gray-200")}  p-[0.69rem] shadow-xl w-[3rem] h-[3rem] flex items-center   cursor-pointer hover:scale-105`}
                onClick={(e) => setShowPopup((prev) => !prev)}
                ref={iconForPopup}
            >
                <FontAwesomeIcon icon={faBars} className="w-fit h-fit " />
            </div>
            <div className="flex flex-col items-center">

                <p className="text-2xl font-semibold select-none">{format(new Date((places?.localtime_epoch || 1738233532) * 1000), "eeee, MMMM dd, yyyy")}</p>
                <p className="text-lg font-semibold mt-4 select-none">{places?.name + " ," + places?.country}</p>
            </div>
            <div className={`  rounded-full bg-[rgb(0,0,0,0.1)] hover:text-white ${showPopup ? (" text-white") : (" text-gray-200")}  p-[0.69rem] shadow-xl w-[3rem] h-[3rem] flex items-center   cursor-pointer hover:scale-105`}

            >                <FontAwesomeIcon icon={faSliders} className="w-fit h-fit " />
            </div>
            {showPopup && (
                <div className="border-2 rounded-xl bg-white absolute w-full h-[30rem] top-[5rem] z-50 p-8 shadow-lg flex flex-col justify-between" ref={popupBox}>
                    <div className="relative w-full focus-within:text-black text-gray-300">
                        <input className="border-2 pl-8 pr-20  w-full py-2 rounded-3xl" value={inputLocation} placeholder={location} onChange={(e) => setInputLocation(e.target.value)} />
                        <FontAwesomeIcon icon={faLocationDot} className="absolute left-[0.5rem] w-[1.5rem] h-[1.5rem] top-[50%]  translate-y-[-50%] pointer-events-none" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-[0.8rem] w-[1.5rem] h-[1.5rem] top-[50%]  translate-y-[-50%] cursor-pointer text-gray-400 hover:text-black" onClick={() => handleSearching(inputLocation)} />
                        <FontAwesomeIcon icon={faXmark} className="absolute right-[3rem] w-[1rem] h-[1rem] top-[50%]  translate-y-[-50%] cursor-pointer text-gray-400 hover:text-black" onClick={(e) => setInputLocation("")} />
                    </div>
                    <div className="h-full p-4">
                        {locations.map(item => (
                            <div className="flex font-semibold text-gray-400 hover:text-black cursor-pointer my-2 text-lg" onClick={() => { setLocation(item?.name); setLocations([]) }}>
                                <p>{item?.name + ", " + item?.country}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full text-center bg-red-500 text-white p-2 text-xl font-semibold rounded-full hover:bg-red-400 hover:scale-105" onClick={() => nav("/")}>Exit
                    </button>
                </div>
            )}
        </div>
        <div className="w-full flex justify-center">
            <div className="text-[6rem] w-fit flex flex-col items-center relative bg-[rgb(225,225,225,0.1)] rounded-xl py-4 px-[4.5rem] pb-[5rem] mb-[6.5rem]  shadow-xl mt-8">
                <div className="font-semibold text-[2rem] select-none">{current?.condition?.text}</div>
                <div className="relative w-fit h-[8rem] select-none">
                    <p>{current?.temp_c}</p>
                    <p className="text-[2.3rem] font-semibold absolute top-0 -right-[1.3rem]">o</p>
                </div>
                <div className="flex text-sm gap-1 mb-[1rem] select-none">
                    <p>Cảm thấy như: </p>
                    <div className="relative w-fit ">
                        <p>{current?.feelslike_c}</p>
                        <p className="text-[0.5rem] font-semibold absolute -top-2 -right-[.3rem]">o</p>
                    </div>
                </div>
                <img className="w-[10rem] h-[10rem] absolute bottom-0 translate-y-[50%] drop-shadow-2xl select-none"
                    src={replaceIconFromAPI?.find(item => item.tartget === current?.condition?.icon)?.replace || current?.condition?.icon} alt="" title="" />
            </div>
        </div>
        <div className="w-full justify-between flex items-center select-none">
            <div className={`flex flex-col items-center gap-2 ${windDangerColor(current?.wind_kph)}`}>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faWind} className={`text-xl`} />
                    <p className="text-xl font-semibold">Gió</p>
                </div>
                <div className="flex items-end gap-1  ">
                    <p className="text-2xl font-semibold">
                        {current?.wind_kph}
                    </p>
                    <p className="font-semibold">km/h</p>
                </div>
            </div>
            <div className={`flex flex-col items-center gap-2  ${airQualityDangerColor(current?.air_quality?.pm10)}`}>
                <div className="flex items-center gap-2">
                    {current?.air_quality?.pm10 <= 50 ? (
                        <FontAwesomeIcon icon={faHeartCircleCheck} className="text-xl" />
                    ) : current?.air_quality?.pm10 <= 150 ? (
                        <FontAwesomeIcon icon={faHeartCircleMinus} className="text-xl " />
                    ) : current?.air_quality?.pm10 <= 300 ? (
                        <FontAwesomeIcon icon={faHeartCircleExclamation} className="text-xl" />
                    ) : (
                        <FontAwesomeIcon icon={faHeartCircleXmark} className="text-xl" />
                    )}
                    <p className="text-xl font-semibold">Chất lượng không khí</p>
                </div>
                <div className="flex items-end gap-1  translate-x-[1rem]">
                    <p className="text-2xl font-semibold">
                        {current?.air_quality?.pm10}
                    </p>

                </div>
            </div>
            <div className={`flex flex-col items-center gap-2 select-none ${humidityDangerColor(current?.humidity)}`}>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faDroplet} className={`text-xl`} />
                    <p className="text-xl font-semibold">Độ ẩm</p>
                </div>
                <div className="flex items-end gap-1  translate-x-[1rem]">
                    <p className="text-2xl font-semibold">
                        {current?.humidity}
                    </p>
                    <p className="font-semibold">%</p>
                </div>
            </div>
        </div>

        <div className="mt-8 select-none">
            <p className="font-semibold text-xl">Today</p>
            <div className="flex gap-4 overflow-x-scroll pt-4 pb-10 scrollBehaviour">
                {forecast[0]?.hour?.map(item => {
                    if (item?.time_epoch < current?.last_updated_epoch) return;
                    return (
                        <div className="relative bg-[rgb(225,225,225,0.1)] shadow-lg rounded-xl px-10 py-4 flex flex-col items-center text-[1.2rem]  font-medium gap-2">
                            <p className=" font-medium">{format(item?.time, "HH:mm")}</p>
                            <img className="w-[3rem] h-[2.5rem] drop-shadow-lg"
                                src={replaceIconFromAPI?.find(target => target.tartget === item?.condition?.icon)?.replace || item?.condition?.icon} alt="" title=""
                            />
                            <div className="relative w-fit text-[1.5rem]">
                                <p>{item?.temp_c}</p>
                                <p className="text-[1rem]  font-semibold absolute -top-[0.5rem] -right-[0.5rem]">o</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    </div>)
}