import { Outlet } from "react-router-dom";

import { Header } from "./partials/Header";
import { Footer } from "./partials/Footer"

;

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="w-auto h-auto mt-15">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default MainLayout;