



export default function MusicBox() {


    return (
        <div className="border-2 p-10 rounded-xl">
            <div className="flex gap-10 h-fit">
                <div className="bg-gray-300 h-[10rem] w-[12rem]"></div>
                <div className="w-full flex flex-col mt-4">
                    <div>Alone</div>
                    <div className="flex items-center gap-10 w-full ">
                        <div>1:29</div>
                        <div className="h-[2.5rem] w-full flex items-center cursor-pointer">
                            <div className="relative bg-gray-300 w-full h-[4px] rounded-xl ">
                                <div className="absolute bg-black h-[8px] top-0 left-0 -translate-y-[25%] rounded-xl" style={{ width: "60%" }}></div>
                                <div
                                    className="absolute w-5 h-5 bg-black rounded-full "
                                    style={{ left: "60%", top: "50%", transform: "translate(-50%, -50%)" }}
                                ></div>
                            </div>
                        </div>
                        <div>2:00</div>
                    </div>
                    <div className="flex justify-center gap-10 items-center mt-4">
                        <div className="w-[2.5rem] h-[2.5rem] bg-gray-300"></div>
                        <div className="w-[2.5rem] h-[2.5rem] bg-gray-300"></div>
                        <div className="w-[4rem] h-[4rem] bg-gray-300"></div>
                        <div className="w-[2.5rem] h-[2.5rem] bg-gray-300"></div>
                        <div className="w-[2.5rem] h-[2.5rem] bg-gray-300"></div>
                    </div>
                </div>
            </div>

        </div>
    )
}