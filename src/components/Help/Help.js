import { useEffect } from "react"

function Help() {

    useEffect(() => {
        document.title = "Help | JAMMMING";
        document.getElementById("footer").classList.remove("fixed-bottom");
        document.getElementsByTagName("main")[0].setAttribute('id', 'helpMain')
    }, []);

    return (
        <>

            <section id="helpSection" className="py-3">

                <div className="mx-3">
                    <h2 className="pb-2 text-center">Feelin' confused by
                        JAMMMING?</h2>

                    <p className="pb-4">JAMMMING is a web app which connects you to
                        your Spotify account and lets you create and update new
                        playlists thanks to the Spotify API. </p>

                </div>

                <h3 className="text-center">Here how it works:</h3>

                <ul className="pt-1 me-4">
                    <li className="mb-3">When you use JAMMMING you will be asked to
                        log into your Spotify account. From here you will be
                        able to create playlists, add and/or remove songs from
                        them.</li>
                    <ul className="mb-3">
                        <li className="mb-3">You can create and modify <span
                            className="text-decoration-underline link-offset-2">one</span> playlist at a time</li>
                        <li>Once you modify the playlist title (e.g. from
                            'Happy' to 'Happy ') the app will recognize it as
                            new one, so be careful if you still want to keep
                            working on a specific one. This means that you <span
                                className="text-decoration-underline link-offset-2">cannot</span> update the title of a playlist you've created.</li>
                    </ul>

                    <li>Since JAMMMING doesn't manage its data with a backend system yet, if you would like to log out from your current Spotify account and use the app with a different one simply click on the 'Your account' link in the navigation bar, logout and come back to JAMMMING: you will be able to log in with a difference account.</li>
                </ul>

            </section>
        </>
    )

}

export default Help