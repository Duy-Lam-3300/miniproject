import { faDroplet, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";



export default function FutureForecastBox({ data }) {
    const dateDate = data?.date ? new Date(data?.date) : new Date();
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
        if (percent <= 80) return "text-yello-500";
        return "text-red-500";
    }
    return (
        <div className="flex flex-col items-center border-2 border-black pt-6 pb-8 px-7 rounded-2xl w-full ">
            <p className="text-[2.5rem] font-semibold">{format(dateDate, "eeee")}</p>
            <p className="text-lg font-medium">{format(dateDate, "MMMM dd, yyyy")}</p>
            <div className="w-full flex justify-center">
                <div className="text-[3.5rem] w-fit flex flex-col items-center relative border-2 rounded-xl py-4 px-[2rem] pb-[5rem] mb-[6.5rem]  shadow-xl mt-8">
                    <div className="font-semibold text-[2rem] select-none">{data?.day?.condition?.text}</div>
                    <div className="flex gap-4  mt-2 mb-4">
                        <div className="relative w-fit  select-none">
                            <p className="">{data?.day?.mintemp_c}</p>
                            <p className="text-[1.5rem] font-semibold absolute top-0 -right-[0.8rem]">o</p>
                        </div>
                        <p>-</p>
                        <div className="relative w-fit  select-none">
                            <p className="">{data?.day?.maxtemp_c}</p>
                            <p className="text-[1.5rem] font-semibold absolute top-0 -right-[0.8rem]">o</p>
                        </div>
                    </div>
                    <img className="w-[10rem] h-[10rem] absolute bottom-0 translate-y-[50%] drop-shadow-2xl select-none"
                        src={replaceIconFromAPI?.find(item => item.tartget === data?.day?.condition?.icon)?.replace || data?.day?.condition?.icon} alt="" title="" />
                </div>
            </div>
            <div className="w-full justify-between flex items-center select-none mt-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faWind} className={`text-xl`} />
                        <p className="text-xl font-semibold">Gió cao nhất</p>
                    </div>
                    <div className={`flex items-end gap-1  ${windDangerColor(data?.day?.maxwind_kph)}`}>
                        <p className="text-2xl font-semibold">
                            {data?.day?.maxwind_kph}
                        </p>
                        <p className="font-semibold">km/h</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 select-none">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faDroplet} className={`text-xl`} />
                        <p className="text-xl font-semibold">Độ ẩm</p>
                    </div>
                    <div className={`flex items-end gap-1 translate-x-[1rem]  ${humidityDangerColor(data?.day?.humidity)}`}>
                        <p className="text-2xl font-semibold">
                            {data?.day?.avghumidity}
                        </p>
                        <p className="font-semibold">%</p>
                    </div>
                </div>
            </div>


        </div>
    )
}