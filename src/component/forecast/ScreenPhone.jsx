import { format } from "date-fns";




export default function ScreenPhone({ current = {}, forecast = [] }) {

    const replaceIconFromAPI = [{
        description: "Clear night moon",
        tartget: "//cdn.weatherapi.com/weather/64x64/night/113.png",
        replace: "https://cdn-icons-png.flaticon.com/512/4584/4584492.png"
    }, {
        description: "Little cloud night moon",
        tartget: "2",
        replace: "https://cdn-icons-png.flaticon.com/512/39/39857.png"
    }, {
        description: "Verry clouded night",
        tartget: "3",
        replace: "https://cdn-icons-png.flaticon.com/512/1826/1826094.png"
    }]

    const dateTimeNow = Math.floor(new Date().getTime() / 1000);
    console.log(dateTimeNow);
    console.log(forecast);



    return (<div className=" w-[550px] h-full rounded-3xl border-2 border-black p-10">
        <div className="flex flex-col items-center">
            {/* <img className="w-[25px] h-[25px]" src="https://cdn-icons-png.flaticon.com/512/3114/3114812.png" alt="" title="" /> */}
            <p className="text-3xl font-semibold">24, July Friday 2024 12:00</p>
            <p className="text-lg font-semibold">Ho Chi Minh, Viet Nam</p>
        </div>
        <div className="flex w-full justify-center mt-10">
            {/* <img className="w-[25px] h-[25px]" src="https://cdn-icons-png.flaticon.com/512/3179/3179068.png " alt="" title="" /> */}

        </div>
        <div className="text-[6rem] w-full flex flex-col items-center relative border-2 rounded-xl p-10 pb-28 mb-32  shadow-xl">
            <div className="font-semibold text-[2rem]">{current?.condition?.text}</div>
            <div className="relative w-fit ">
                <p>{current?.temp_c}</p>
                <p className="text-[2.3rem] font-semibold absolute top-0 -right-[1.3rem]">o</p>
            </div>
            <img className="w-[10rem] h-[10rem] absolute bottom-0 translate-y-[50%]" src={replaceIconFromAPI?.find(item => item.tartget === current?.condition?.icon)?.replace || current?.condition?.icon} alt="" title="" />
        </div>
        <div>
            <p className="font-semibold text-xl">Today</p>
            <div className="flex gap-4 overflow-x-scroll pt-4 pb-10">
                {forecast[0]?.hour?.map(item => {
                    if (item?.time_epoch < dateTimeNow) return;
                    return (
                        <div className="relative border-2 shadow-lg rounded-xl px-10 py-4 flex flex-col items-center text-[1.2rem]  font-medium gap-2">
                            <p className=" font-medium">{format(item?.time, "HH:mm")}</p>
                            <img className="w-[2rem] h-[2rem] " src={replaceIconFromAPI?.find(item => item.tartget === current?.condition?.icon)?.replace || current?.condition?.icon} alt="" title="" />
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