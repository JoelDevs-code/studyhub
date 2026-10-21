import { useEffect, useState } from "react";


// import "./dist/style.css";

import './App.css'; 
import '../src/assets/fonts/flaticon/css/all.css';
import '../src/assets/fonts/flaticon/css/all.min.css';
import './assets/fonts/flaticon/icomoon/style.css'

import { Routes, Route } from 'react-router-dom';

import Loader from "./components/loader"

import SideBar from './components/sidebar';
import HomePage from './components/home_page'
import Header from "./components/header"

import studyHubData from "./data/studyHubData.json";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {const timer = setTimeout(() => { setLoading(false); }, 1000); 
  return () => clearTimeout(timer);}, []);
  
  const database = studyHubData;



  return (
    <>
    {loading && <Loader />} 
      <main className="main__dashbaord_section w-full px-0 py-0" id='main$dashbaord'>
        <section className="main__dashboard_wrapper flex" aria-label='dashboard container'>
          <SideBar />

          <Routes>

            <Route path={'/'} element={
              <>
                <section className="main__section_wrapper w-full" id='main_wrapper'>
                  <Header />
                  {/* {activePage === "dashboard" && <HomePage/> } */}
                  {<HomePage />}
                  <div className="main_content_footer  flex justify-center">
                    <div className='px-1 py_5'><span className=''>&copy; Bulus Joel Project</span></div>
                  </div>
                </section>
              </>
            }/>
            <Route path={'/Dashboard'} element={
              <>
                <section className="main__section_wrapper w-full" id='main_wrapper'>
                  <Header />
                  {/* {activePage === "dashboard" && <HomePage/> } */}
                  {<HomePage />}
                  <div className="main_content_footer bg-blue-50 mt-3flex justify-center">
                    <div className='px-1 py_5'><span className=''>&copy; Bulus Joel Project</span></div>
                  </div>
                </section>
              </>
            }/>

            <Route path='/My Downloads' element={
              <>
                <section className="main__section_wrapper w-full" id='main_wrapper'>
                  <Header />

                  <section className="main_download_content w-full bg-white" id='main'>
                    <div className="main_download_content_wrapper flex flex-col px-2 py-1">

                      <div className="downloads__report">
                        <div className="downloads__report_wrapper flex items-center justify-between gap-1 py-2">
                          {
                            database.download.map((downloads)=>(
                              <>
                                {downloads.downloadReports?.map((dow)=>(
                                  <div className={`download__report_card flex flex-col px-1 gap-1 py-1 ${dow.background}`}>
                                    <div className={`download_report_icon ${dow.color}`}><i className={dow.icon}></i></div>
                                    <div className="download_report_text flex flex-col gap-5">
                                      <div className="flex items-center gap-5">
                                        <h4 className="font-bold">{dow.value}</h4>
                                        <span className="text-sm font-bold">{dow.report}</span>
                                      </div>
                                      <label className="text-sm" htmlFor="download_report_text">{dow.record}</label>
                                    </div>
                                  </div>
                                ))}
                              </>
                            ))
                          }
                        </div>
                      </div>

                      <div className="downloads__table w-full">
                        <table className="download_table w-full">
                          <thead>
                            <tr className="">
                              {database.download.map((downloads)=>(
                                <>
                                  {downloads.download_table_header?.map((tbd)=>(
                                    <th>{tbd}</th>
                                  ))}
                                </>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {database.download.map((downloadData)=>(
                              <>
                                {downloadData.donwload_data?.map((ddt)=>(
                                  <tr>
                                    <td>
                                      <div className="flex items-center gap-1 text-sm">
                                        <div className={`download-icon-col ${ddt.doc_icon_bg}`}>
                                          <i className={`${ddt.doc_icon} ${ddt.doc_icon_color}`}></i>
                                        </div>
                                        <div><h4 className="font-bold">{ddt.doc_title}</h4><span>{ddt.doc_label}</span></div>
                                      </div>
                                    </td>
                                    <td><span>{ddt.doc_type}</span></td>
                                    <td><span>{ddt.doc_size}</span></td>
                                    <td>
                                      <div className={`flex items-center justify-center py_4 font-bold status_wrapper
                                        text-sm gap-5 ${ddt.doc_bg} ${ddt.doc_text_status}`}>
                                        <i className={ddt.doc_status_icon}></i><span>{ddt.doc_status}</span>
                                      </div>
                                    </td>

                                    <td>
                                      <div className="flex items-center gap-5">
                                        <button className="cursor-pointer" title={ddt.doc_view_action_totake}>
                                          <i className={`cursor-pointer ${ddt.doc_view_icon}`}></i>
                                        </button>
                                        <button className="">
                                          <div title="View Menu" className="cursor-pointer"><i className={ddt.doc_action_icon}></i></div>

                                          <div className="action__drpp absolute bg-white px-1 py-1 shadow gap-1">
                                            <button className="flex items-center gap-1">
                                              <span>Properties</span><i className="fa fa-circle-info"></i>
                                            </button>
                                            <button className="flex items-center gap-1">
                                              <span>Share</span><i className="fa fa-share-alt"></i>
                                            </button>
                                            <button className="flex items-center gap-1">
                                              <span>Delete</span><i className="fa fa-trash"></i>
                                            </button>
                                          </div>
                                        </button>
                                      </div>  
                                    </td>
                                  </tr>
                                ))}
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </section>

                  <div className="main_content_footer bg-blue-50 mt-3 flex justify-center">
                    <div className='px-1 py_5'><span className=''>&copy; Bulus Joel Project</span></div>
                  </div>
                </section>
              </>
            } />

            <Route path='/Course Materials' element={
              <>
                <section className="main__section_wrapper w-full" id='main_wrapper'>
                  <Header />

                  <section className="main_cmaterial_content w-full bg-white" id='main'>
                    <div className="main_cmaterial_content_wrapper flex flex-col px-2 py-1">

                      <div className="cmaterial__report">
                        <div className="cmaterial__report_wrapper flex items-center justify-between gap-1 py-2">
                          {
                            database.courseMaterials.map((courses)=>(
                              <>
                                {courses.coursesReports?.map((cm)=>(
                                  <div className={`download__report_card flex flex-col px-1 gap-1 py-1 ${cm.background}`}>
                                    <div className={`download_report_icon ${cm.color}`}><i className={cm.icon}></i></div>
                                    <div className="download_report_text flex flex-col gap-5">
                                      <div className="flex items-center gap-5">
                                        <h4 className="font-bold">{cm.value}</h4>
                                        <span className="text-sm font-bold">{cm.report}</span>
                                      </div>
                                      <label className="text-sm" htmlFor="cmaterial_report_text">{cm.record}</label>
                                    </div>
                                  </div>
                                ))}
                              </>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </section>


                  <div className="main_content_footer bg-blue-100 flex justify-center">
                    <div className='px-1 py_5'><span className=''>&copy; Bulus Joel Project</span></div>
                  </div>
                </section>
              </>
            } />


          </Routes>

        </section>
      </main>
    </>
  )
}

export default App
