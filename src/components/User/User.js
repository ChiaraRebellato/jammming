import './User_module.css'

function User({ currentUser }) {

    return (
        <>

            <section className='my-3'>
                <div id='userTitle' className='text-center'>
                    <h1>Welcome,
                        <span> {currentUser.username} </span>
                    </h1>
                </div>

                <div className='text-center mt-2' >
                    <p className='mb-4 mx-4'> Create playlists and <span className='fst-italic'>jam</span> to your favorite songs </p>
                </div>

            </section>

        </>
    )
}

export default User;