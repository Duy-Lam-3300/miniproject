import { format } from "date-fns";



export default function FutureForecastBox({ data }) {
    const dateDate = data?.date?new Date( data?.date): new Date();
    console.log("data", data);
    console.log("dateDate", dateDate);

    return (
        <div className="flex flex-col items-center border-2 pt-4 pb-8 px-10 rounded-2xl ">

            <p className="text-[2.5rem] font-semibold">{format(dateDate, "eeee")}</p>
            <p className="text-lg font-medium">{format(dateDate, "MMMM dd, yyyy")}</p>

            <div className="py-4">
                <img className="w-[10rem] h-[10rem]  bottom-0 drop-shadow-2xl" src={data?.day?.condition?.icon} />
            </div>
            <p className=" text-3xl font-semibold">
                {data?.day?.condition?.text}
            </p>
            <div className="flex gap-4 text-2xl mt-3">
                <div className="relative w-fit ">
                    <p>{data?.day?.mintemp_c}</p>
                    <p className="text-[0.5rem] font-semibold absolute -top-1 -right-[.3rem]">o</p>
                </div>
                <p>~</p>
                <div className="relative w-fit ">
                    <p>{data?.day?.maxtemp_c}</p>
                    <p className="text-[0.5rem] font-semibold absolute -top-1 -right-[.3rem]">o</p>
                </div>
            </div>

            <div className="mt-3 flex gap-1 text-xl ">
                <p>Gió:</p>
                <p> {" " + data?.day?.maxwind_kph + "km/h"}</p>
            </div>
            <div className="mt-3 flex gap-1 text-xl ">
                <p>Chất lượng không khí:</p>
                <p> {" " + (data?.day?.air_quality?.pm10)?.toFixed(2)}</p>
            </div>
            <div className="mt-3 flex gap-1 text-xl ">
                <p>Độ ẩm:</p>
                <p>{" " + data?.day?.avghumidity + "%"}</p>
            </div>



        </div>
    )
}