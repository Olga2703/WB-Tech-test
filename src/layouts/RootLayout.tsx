import {Link, Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <div className="app-layout">
            <header>
                <nav>
                    <Link to="/users">Пользователи</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}