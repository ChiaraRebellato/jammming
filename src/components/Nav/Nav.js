import { NavLink } from 'react-router-dom';
import './Nav_module.css'

function Nav({ currentUser }) {

  const handleClick = () => {
  // when the link is clicked while offcanvas is visible (<768px), automatically 'close' offcanvas and reveal content

  if(document.querySelector('.offcanvas').classList.contains('show') && document.querySelector('.offcanvas-backdrop').classList.contains('show')){
    document.querySelector('.offcanvas').classList.remove('show');
    document.querySelector('.offcanvas-backdrop').classList.remove('show');
    }
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

                <li className="nav-item ">
                  <a id="userAccount" className="nav-link text-white"
                    role="menuitem"
                    href={currentUser.profile} title="Your Spotify Account"
                    tabIndex="0" target="_blank" onClick={handleClick}>YOUR ACCOUNT</a>
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