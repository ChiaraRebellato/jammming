import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

function Layout({currentUser}) {

    return (
        <>

            <header id="header">
                <Nav currentUser={currentUser} />
            </header>

            <main>

                <Outlet />

            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )

}

export default Layout