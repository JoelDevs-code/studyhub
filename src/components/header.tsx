
import '../App.css'; 
// import '../dist/style.css';
import '../assets/fonts/flaticon/css/all.css'
import '../assets/fonts/flaticon/css/all.min.css'

import profile_img from "../assets/images/profile.jpg"



import studyHubData from "../data/studyHubData.json";
import { useLocation } from 'react-router-dom';


function header(){


  const ProfileData = studyHubData.student;
  // let hText = studyHubData.header_text;

  function drop_profile_down(){
    const profile_drop = document.getElementById("profile_drop");
    profile_drop?.classList.toggle("toggle");
  }

  const location = useLocation()

  const pageLable : Record<string, string> = {
    "/" : "Dashboard",
    "/dashboard" : "Dashboard",
  }

  const activeLable = pageLable[location.pathname] || "Dashboard";

  return (
    <>
      <header className="main__section_header h-15 bg-white" id='main_sec_header'>
        <div className="main__section_header_wrapper flex items-center justify-between gap-5 h-full relative py-2 px-7">
          <div className="main_page_label">
            <h3 className='text-black text-xl' id='labelTxt'>{activeLable}</h3>
          </div>
          <form action="" className='flex gap-3 items-center search_form h-full'>
            <button className='cursor-pointer h-full'><i className="icon-search text-blue-600"></i></button>
            <input type="text" className='h-full' placeholder='Search for courses, materials..........' name="" id="search_input" />
          </form>
          <div className="notify_profile_wrapper flex items-center gap-7">
            <div className="notification_section relative">
              <button type="button" className="cursor-pointer"><i className="fa-regular fa-shake fa-bell text-lg"></i></button>
              <div className="notification_display absolute bg-white"></div>
            </div>
            <div className="profile_section relative">
              <div className='profile_con flex items-center gap-2 cursor-pointer' onClick={drop_profile_down}>
                <div className='profile_con_img'><img className='' src={profile_img} alt="" /></div>
                <div className='prof-label-txt flex flex-col'>
                  <h5 className='font-bold'>{ProfileData.displayName}</h5><span className='text-xs'>Student</span>
                </div>
                <i className="fa fa-angle-down text-xs" id='profile_caret'></i>
                <i className="fa-regular fa-user text-base profile_iconx" title='view profile'></i>
              </div>
              <div id='profile_drop' className="profile_display px-5 py-5 absolute bg-white">
                <ul>
                  <div className='flex items-center gap-1.5 bg-blue-100 px-2 py-3 rounded-lg text-blue-600'>
                    <i className="fa-regular fa-user font-bold" aria-hidden="true"></i>
                    <span className='font-bold'>Student Info</span>
                  </div>
                  <li>
                    <label className='font-bold' htmlFor="profile_display">Matric No:</label> 
                    <span> {ProfileData.matric_no}</span>
                  </li>
                  <li>
                    <label className='font-bold' htmlFor="profile_display">Level: </label>
                    <span> {ProfileData.level}</span>
                  </li>
                  <li>
                    <label className='font-bold' htmlFor="profile_display">Dept: </label> 
                    <span> {ProfileData.department}</span>
                  </li>
                </ul>
                <ul>
                </ul>
              </div>
            </div>
            <button className='menu--btn items-center gap-5'>
              <i className="fa fa-bars cursor-pointer" title='Open navigation bar' id='openMenu'></i>
              <i className="fa fa-close cursor-pointer" title='Close navigation bar' id='closeMenu'></i>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default header