
import '../App.css'; 
// import '../dist/style.css';
import '../assets/fonts/flaticon/css/all.css'
import '../assets/fonts/flaticon/css/all.min.css'

// import { Link } from 'react-router-dom';

// const nav_list = [
//   {name: "Dashboard", icon: "fa fa-chart-column",}, 
//   {name: "My Download", icon: "fa fa-download"},
//   {name: "Course Materials", icon: "fas fa-book-open"}, 
//   {name: "Past Questions", icon: "fa-regular fa-clipboard"},
//   {name: "Video Tutorials", icon: "fas fa-tv"},
//   {name: "Projects", icon: "fa-regular fa-folder-open"}, 
//   {name: "Source Code", icon: "fa fa-code"},
//   {name: "Text to Speech", icon: "fa fa-microphone-alt"}, 
//   {name: "Analytics", icon: "fa fa-chart-line"},
//   {name: "Settings", icon: "fa fa-cog"}, 
//   {name: "Logout", icon: "fa fa-sign-out"}
// ];

import studyHubData from "../data/studyHubData.json";



function reload_dashboard(){window.location.href = "/";}



function sideBar(){
  const navigation = studyHubData.navigation;

  return (
    <>
      <aside className="sidebar__section bg-white" id='sidebar$section'>
        <div className="sidebar__section_wrapper flex flex-col">
          <header className="sidebar__header flex items-center justify-between">
            <div className="sidebar__logo flex items-center cursor-pointer px-1" id='sidebar$logo' 
              onClick={reload_dashboard}>
              <i className="fa fa-graduation-cap text-3xl text-blue-600 fa-bounce"></i>
              <h3 className='text-xl font-bold mt-1 px-2 text-blue-950'>StudyHub</h3>
            </div>
            {/* <button className="toggle-sidebar items-center none" id='toggle_sidebar'>
              <i className="fa fa-bars"></i><i className="fa fa-close"></i>
            </button> */}
          </header>

          <nav className="main_sidebar_navigation" id='sidebar$nav'>
            <ul className="main_sidebar_navigation_wrapper flex flex-col">
              {navigation.map((navlist, index)=>(
                <li key={navlist.label} className="hover:bg-blue-600 hover:text-white">
                  {/* <Link to={navlist.label} className='link' key={index}>
                    <i className={navlist.icon}></i><span className=''>{navlist.label}</span>
                  </Link> */}
                  <a href={navlist.path} className='link' key={index}>
                    <i className={navlist.icon}></i><span className=''>{navlist.label}</span>
                  </a>
                </li>
              ))}

              {/* {nav_list.map((navlist, index) => (
                <li key={index} onClick={() => handleNavClick(navlist)}
                  className={activePage === navlist.page ? "active" : ""}>
                  <button className="block cursor-pointer">
                    <i className={navlist.icon}></i><span>{navlist.name}</span>
                  </button>
                </li>
              ))} */}

            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default sideBar