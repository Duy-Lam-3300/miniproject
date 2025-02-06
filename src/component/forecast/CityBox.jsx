
import { faDroplet, faGear, faHeartCircleCheck, faHeartCircleExclamation, faHeartCircleMinus, faHeartCircleXmark, faLocationDot, faMagnifyingGlass, faWind, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";




export default function CityBox({ weatherData = {}, location, setLocation, handleSearching, locations = [], setLocations }) {
    const [showPopup, setShowPopup] = useState(false);
    const [inputLocation, setInputLocation] = useState(location);
    const current = weatherData?.current || {};
    const places = weatherData?.location || {};
    const popupBox = useRef();
    const iconForPopup = useRef();
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
            if (popupBox.current && !popupBox.current.contains(event.target)) {
                setInputLocation("");
                setLocations();
                if (iconForPopup.current.contains(event.target) && iconForPopup.current) {
                    return;
                } else {
                    setShowPopup((prev) => !prev);
                }

            }
        }
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
    }, [])

    return (<div className=" w-full h-full rounded-3xl bgcomponent text-white p-7 pb-0 relative select-none" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className={`absolute top-0 right-1 rounded-full ${showPopup ? (" text-black") : (" text-gray-400")}  p-[0.69rem] w-[3rem] h-[3rem] flex items-center  hover:border-gray-500 hover:text-black cursor-pointer hover:scale-105`}
            onClick={(e) => setShowPopup((prev) => !prev)}
            ref={iconForPopup}
        >
            <FontAwesomeIcon icon={faGear} className="w-fit h-fit " />
        </div>
        <div className="flex justify-start items-center relative w-full">
            <div className="flex flex-col items-start">
                <p className="text-2xl font-semibold select-none">{format(new Date((places?.localtime_epoch || 1738233532) * 1000), "eeee, MMMM dd, yyyy")}</p>
                <p className="text-lg font-semibold mt-4 select-none">{places?.name + " ," + places?.country}</p>
            </div>
            {showPopup && (
                <div className="border-2 overflow-y-scroll rounded-xl bg-white absolute w-full h-[10rem] top-[5rem] z-50 p-8 shadow-lg flex flex-col justify-between" ref={popupBox}>
                    <div className="relative w-full focus-within:text-black text-gray-300">
                        <input className="border-2 pl-8 pr-20  w-full py-2 rounded-3xl" value={inputLocation} placeholder={location} onChange={(e) => setInputLocation(e.target.value)} />
                        <FontAwesomeIcon icon={faLocationDot} className="absolute left-[0.5rem] w-[1.5rem] h-[1.5rem] top-[50%]  translate-y-[-50%] pointer-events-none" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-[0.8rem] w-[1.5rem] h-[1.5rem] top-[50%]  translate-y-[-50%] cursor-pointer text-gray-400 hover:text-black" onClick={() => handleSearching(inputLocation)} />
                        <FontAwesomeIcon icon={faXmark} className="absolute right-[3rem] w-[1rem] h-[1rem] top-[50%]  translate-y-[-50%] cursor-pointer text-gray-400 hover:text-black" onClick={(e) => setInputLocation("")} />
                    </div>
                    <div className="h-full p-4 ">
                        {locations.map(item => (
                            <div className="flex font-semibold cursor-pointer text-gray-400 hover:text-black my-2 text-lg" onClick={() => { setLocation(item?.name); setLocations([]) }}>
                                <p>{item?.name + ", " + item?.country}</p>
                            </div>
                        ))}
                    </div>
                    {/* <button className="w-full text-center bg-red-500 text-white p-2 text-xl font-semibold rounded-full hover:bg-red-400 hover:scale-105" onClick={() => nav("/")}>Exit
                </button> */}
                </div>
            )}
        </div>
        <div className="w-full flex justify-start gap-20 items-center">
            <div className=" w-fit flex flex-col items-start relative my-4">
                <div className="font-semibold text-[2rem] select-none">{current?.condition?.text}</div>
                <div className="relative w-fit h-fit select-none">
                    <p className="text-[3rem]">{current?.temp_c}</p>
                    <p className="text-[1.3rem] font-semibold absolute top-0 -right-[0.6rem]">o</p>
                </div>
                <div className="flex text-sm gap-1 mb-[1rem] select-none">
                    <p>Cảm thấy như: </p>
                    <div className="relative w-fit ">
                        <p>{current?.feelslike_c}</p>
                        <p className="text-[0.5rem] font-semibold absolute -top-2 -right-[.3rem]">o</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start gap-2">
                <div className={`flex flex-col items-center gap-2 select-none  ${windDangerColor(current?.wind_kph)}`}>
                    <div className="flex items-center gap-2 justify-between">
                        <FontAwesomeIcon icon={faWind} className={`text-xl w-[1.5rem] h-[1.5rem]`} />

                        <div className={`flex items-end gap-1  `}>
                            <p className="text-2xl font-semibold">
                                {current?.wind_kph}
                            </p>
                            <p className="font-semibold">km/h</p>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col items-center gap-2 select-none  ${airQualityDangerColor(current?.air_quality?.pm10)}`}>
                    <div className="flex items-center gap-2 justify-between">
                        {current?.air_quality?.pm10 <= 50 ? (
                            <FontAwesomeIcon icon={faHeartCircleCheck} className="text-xl w-[1.5rem] h-[1.5rem]" />
                        ) : current?.air_quality?.pm10 <= 150 ? (
                            <FontAwesomeIcon icon={faHeartCircleMinus} className="text-xl w-[1.5rem] h-[1.5rem] " />
                        ) : current?.air_quality?.pm10 <= 300 ? (
                            <FontAwesomeIcon icon={faHeartCircleExclamation} className="text-xl w-[1.5rem] h-[1.5rem]" />
                        ) : (
                            <FontAwesomeIcon icon={faHeartCircleXmark} className="text-xl w-[1.5rem] h-[1.5rem]" />
                        )}

                        <div className={`flex items-end gap-1`}>
                            <p className="text-2xl font-semibold">
                                {current?.air_quality?.pm10}
                            </p>

                        </div>
                    </div>

                </div>
                <div className={`flex flex-col items-center gap-2 select-none ${humidityDangerColor(current?.humidity)}`}>
                    <div className="flex items-center gap-2 justify-between">
                        <FontAwesomeIcon icon={faDroplet} className={`text-xl w-[1.5rem] h-[1.5rem]`} />
                        <div className={`flex items-end gap-1  `}>
                            <p className="text-2xl font-semibold">
                                {current?.humidity}
                            </p>
                            <p className="font-semibold">%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}