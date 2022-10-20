import { NavLink } from "react-router-dom"

const Topbar = () => {
    return (
        <nav>
            <NavLink to="departments">
                Отделы
            </NavLink>
            <NavLink to="positions">
                Позиции
            </NavLink>
            <NavLink to="rates">
                Ставки
            </NavLink>
            <NavLink to="schedules">
                Расписания
            </NavLink>
        </nav>
    )
}

export default Topbar