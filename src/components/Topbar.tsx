import { NavLink } from "react-router-dom"

const Topbar = () => {
    return (
        <header className="relative flex flex-0 h-16">
            <nav className="flex w-full justify-around items-center">
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
                <NavLink to="report">
                    Отчет
                </NavLink>
            </nav>
        </header>
    )
}

export default Topbar