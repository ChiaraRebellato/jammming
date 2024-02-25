import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.css'
import Layout from "../../Layout/Layout";
import Home from "../Home/Home";
import Help from "../Help/Help";
import { Spotify } from '../../util/Spotify/Spotify';

export default function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setUser] = useState([]);

    useEffect(() => {
        // as soon as the app mounts:

        document.getElementById("header").hidden = true;
        // the header is hidden and later made visible again

        document.getElementById("footer").hidden = true;

        setIsLoading(true);
        // setIsLoading is set to true, this way the loading screen is shown

        const intervalId = setTimeout(() => {
            // simulate a loading intro to the web app

            Spotify.getUser().then((results) => setUser(results));
            // user gets logged into spotify; user can access their profile info throughout the entire app as their personal info is retrieved once the app
            // is loaded and not every time the user change views, e.g from 'help' to 'home'

            document.getElementById("header").hidden = false;
            document.getElementById("footer").hidden = false;
            
            setIsLoading(false);
            // setIsLoading is set to false, this way the loading screen is hidden and replaced by the main content

        }, 5000);

        return () => {
            clearTimeout(intervalId);
        };

    }, []);
    // while testing DO NOT exclude 'useEffect' otherwise the access token won't get updated after its expiration

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Layout currentUser={currentUser} />}>

            <Route index element={<Home Spotify={Spotify} isLoading={isLoading} currentUser={currentUser} />} />
            <Route path="help" element={<Help />} />

        </Route>
    )
    )

    return (
        <RouterProvider router={router} />
    );
}
