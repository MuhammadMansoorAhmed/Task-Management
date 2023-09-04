import { Link, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRef } from 'react';
import './Navbar.css'
import { FaBars, FaTimes } from 'react-icons/fa'


const Navbar = () => {
  const navRef = useRef();
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const logOut = () => {
    setCookies("accessToken", "");
    window.location.reload()
  }
  const ShowNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }


  return (
    <header>
      <div className='navBar' ref={navRef}>
        <Link to='/' className='link'>Home</Link>
        <Link to='/tasks' className='link'>Tasks</Link>
        {!cookies.accessToken ?
          (<>
            <Link to='/login' className='link'>Log in</Link>
            <Link to='/register' className='link'>Sign Up</Link>
          </>) :
          (<button className='logOutButton' onClick={logOut}>LogOut</button>)
        }
        <button onClick={ShowNavBar} className='fatime'>
          <FaTimes />
        </button>
      </div>
      <button onClick={ShowNavBar} className='fabar'>
        <FaBars />
      </button>
      <div>
        <Outlet />
      </div>
    </header>
  )
}

export default Navbar
