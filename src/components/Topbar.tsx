import { NavLink } from "react-router-dom"

const Topbar = () => {
    return (
        <header className="relative flex flex-none h-16">
            <nav className="flex w-full justify-around items-center">
                <TopbarLink href="departments" text="Отделы" />
                <TopbarLink href="positions" text="Должности" />
                <TopbarLink href="rates" text="Ставки" />
                <TopbarLink href="schedules" text="Расписания" />
                <TopbarLink href="report" text="Очет" />
            </nav>
        </header>
    )
}

type TopbarLinkProps = {
    href: string,
    text: string
}

const TopbarLink = ({ href, text }: TopbarLinkProps) => {
    return (
        <NavLink to={href} className={({ isActive }) => isActive ? "font-bold" : ""}>
            {text}
        </NavLink>
    )
}

export default Topbar