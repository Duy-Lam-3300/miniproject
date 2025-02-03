import { NavLink, Outlet, useNavigate } from "react-router-dom"





export default function HomePage() {

    return (
        <div>
            <div className="absolute">
                <NavLink to="../">Home</NavLink>
                <NavLink to="/weather">Weather Forecast</NavLink>
            </div>
        </div>
    )
}