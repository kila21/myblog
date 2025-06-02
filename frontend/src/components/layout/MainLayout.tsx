import { Outlet } from "react-router-dom";

import { Header } from "./partials/Header";

;

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="w-auto h-auto mt-15">
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout;