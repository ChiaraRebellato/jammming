import { NavLink } from 'react-router-dom';
import './Nav_module.css'
import { Spotify } from '../../util/Spotify/Spotify';

function Nav({ currentUser }) {

  const handleClick = () => {
    // when the link is clicked while offcanvas is visible (<768px), automatically 'close' offcanvas and reveal content

    if (document.querySelector('.offcanvas').classList.contains('show') && document.querySelector('.offcanvas-backdrop').classList.contains('show')) {
      document.querySelector('.offcanvas').classList.remove('show');
      document.querySelector('.offcanvas-backdrop').classList.remove('show');
    }
  };

  function handleLogout(){
    Spotify.logout();
  }

  return (
    <>

      <nav className="navbar navbar-expand-md flex-grow-1" role="menu"
        aria-label="Menu">
        <div className="container-fluid justify-content-start">

          <NavLink className="navbar-brand flex-grow-1 flex-md-grow-0"
            to="/"
            tabIndex="0"
            target="_self"><h1 className="text-white">JAMMMING</h1></NavLink>

          <button className="navbar-toggler border-0" type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
              fill="#ffffff" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </button>

          <div className="offcanvas offcanvas-end bg-black" tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">

            <div className="offcanvas-header z-3">
              <h5 className="offcanvas-title navbar-brand text-white fs-1"
                id="offcanvasNavbarLabel">JAMMMING
              </h5>
              <button type="button" className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas" aria-label="Close"></button>

            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav flex-md-grow-1">

                <li className="nav-item me-3">
                  <NavLink
                    className="nav-link text-white"
                    role="menuitem"
                    to="/" title="Homepage"
                    tabIndex="0" target="_self" onClick={handleClick}>HOME

                  </NavLink>
                </li>

                <li className="nav-item me-3">
                  <NavLink className="nav-link text-white" role="menuitem"
                    to="help" title="Help Page" tabIndex="0"
                    target="_self" onClick={handleClick}>HELP</NavLink>
                </li>

                <li className="nav-item">
                  <a id="userAccount" className="nav-link text-white"
                    role="menuitem"
                    href={currentUser.profile} title="Your Spotify Account"
                    tabIndex="0" target="_blank" rel="noreferrer" onClick={handleClick}>YOUR ACCOUNT</a>
                </li>

                <li id='logoutBtn' className="nav-item flex-grow-1 flex-md-grow-0">
                  <button onClick={handleLogout} className='btn text-white'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                      <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg></button>
                </li>
                
              </ul>

            </div>
          </div>

        </div>

      </nav>

    </>
  )
}
export default Nav