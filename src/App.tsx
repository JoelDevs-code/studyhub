import { useEffect, useState } from "react";



import './index.css'
// import './dist/style.css'
import './App.css'; 
import '../src/assets/fonts/flaticon/css/all.css';
import '../src/assets/fonts/flaticon/css/all.min.css';
import './assets/fonts/flaticon/icomoon/style.css'

import { Routes, Route } from 'react-router-dom';

import Loader from "./components/loader"

import SideBar from './components/sidebar';
import HomePage from './components/home_page'
import Header from "./components/header"

import TexttoSpeech from "./pages/text-speech"

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

            <Route path='/my-downloads' element={
              <>
                <section className="main__section_wrapper w-full" id='main_wrapper'>
                  <Header />

                  <section className="main_download_content w-full bg-white" id='main'>
                    <div className="main_download_content_wrapper flex flex-col px-5 py-2">

                      <div className="downloads__report">
                        <div className="downloads__report_wrapper flex items-center justify-between gap-5 py-5">
                          {
                            database.download.map((downloads)=>(
                              <>
                                {downloads.downloadReports?.map((dow)=>(
                                  <div className={`download__report_card flex flex-col px-3 gap-3 py-3 ${dow.background}`}>
                                    <div className={`download_report_icon ${dow.color}`}><i className={dow.icon}></i></div>
                                    <div className="download_report_text flex flex-col gap-1 text-mauve-700">
                                      <div className="flex items-center gap-1">
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

                      <div className="downloads__table w-full flex flex-col gap-5 items-center">

                        <form action="" className="py-4 flex items-center justify-between w-full">
                          <ul className="flex gap-5">
                            {
                              database.download.map((downloadquerry)=>(<>{downloadquerry.historySearchHeader?.map((downloadsearch)=>(
                                    <>{downloadsearch.searchStatus.map((ss)=>(
                                      <li className="cursor-pointer hover:text-blue-700
                                      hover:border-b-1 pb-2">{ss.status}</li>
                                    ))}</>
                                  ))}
                                </>
                              ))
                            }
                          </ul>

                          <ul className="flex gap-5">
                            {
                              database.download.map((downloadquerry)=>(
                                <>{downloadquerry.historySearchHeader?.map((downloadsearch)=>(
                                    <div className="border px-2 py-1 w-auto border-mauve-400 rounded-lg text-mauve-600">
                                      <select className="w-35 h-full cursor-pointer">{downloadsearch.searchCategories.map((ss)=>(
                                      <option value="">{ss}</option>
                                    ))}</select>
                                    </div>
                                  ))}
                                  {downloadquerry.historySearchHeader?.map((downloadsearch)=>(
                                    <div className="border px-3 py-1 w-auto h-11 border-mauve-400 rounded-lg 
                                    flex items-center gap-1 text-mauve-600">
                                      <label className="text-sm flex items-center">
                                        <i className="fa fa-sort"></i> <span>Sort by : </span>
                                      </label>
                                      <select className="w-35 h-full cursor-pointer">{downloadsearch.searchSort.map((ss)=>(
                                      <option value="">{ss}</option>
                                    ))}</select>
                                    </div>
                                  ))}
                                </>
                              ))
                            }
                          </ul>

                        </form>

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
                                      <div className="flex items-center gap-2 text-sm">
                                        <div className={`download-icon-col ${ddt.doc_icon_bg}`}>
                                          <i className={`${ddt.doc_icon} ${ddt.doc_icon_color}`}></i>
                                        </div>
                                        <div><h4 className="font-bold">{ddt.doc_title}</h4><span>{ddt.doc_label}</span></div>
                                      </div>
                                    </td>
                                    <td><span className="text-xs">{ddt.doc_type}</span></td>
                                    <td><span className="text-xs">{ddt.doc_size}</span></td>
                                    <td>
                                      <div className={`flex items-center justify-center py-2 status_wrapper
                                        text-xs gap-1 ${ddt.doc_bg} ${ddt.doc_text_status}`}>
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
                        <button className="flex items-center gap-2 justify-center border border-gray-300 cursor-pointer 
                        px-2 py-2 mt-3 text-gray-600 rounded-lg">
                          <span>show more</span><i className="fa fa-angle-down"></i>
                        </button>
                      </div>

                    </div>
                  </section>

                  <div className="main_content_footer bg-blue-50 mt-3 flex justify-center">
                    <div className='px-1 py_5'><span className=''>&copy; Bulus Joel Project</span></div>
                  </div>
                </section>
              </>
            } />

            <Route path='/course-materials' element={
              <>
                <section className="main__section_wrapper w-full" id='main_wrapper'>
                  <Header />

                  <section className="main_cmaterial_content w-full bg-white" id='main'>
                    <div className="main_cmaterial_content_wrapper flex flex-col px-5 py-2">

                      <div className="cmaterial__report">
                        <div className="cmaterial__report_wrapper flex items-center justify-between gap-5 py-2">
                          {
                            database.courseMaterials.map((courses)=>(
                              <>
                                {courses.coursesReports?.map((cm)=>(
                                  <div className={`download__report_card flex flex-col px-5 gap-5 py-5 ${cm.background}`}>
                                    <div className={`download_report_icon ${cm.color}`}><i className={cm.icon}></i></div>
                                    <div className="download_report_text flex flex-col gap-1">
                                      <div className="flex items-center gap-1">
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

                      <div className="downloads__table w-full flex flex-col gap-5 items-center">

                        <form action="" className="py-4 flex items-center justify-between w-full">
                          <ul className="flex gap-5">
                            {
                              database.download.map((downloadquerry)=>(
                                <>{downloadquerry.historySearchHeader?.map((downloadsearch)=>(
                                    <div className="border px-2 py-1 w-auto border-mauve-400 rounded-lg text-mauve-600">
                                      <select className="w-35 h-full cursor-pointer">{downloadsearch.searchCategories.map((ss)=>(
                                      <option value="">{ss}</option>
                                    ))}</select>
                                    </div>
                                  ))}
                                  {downloadquerry.historySearchHeader?.map((downloadsearch)=>(
                                    <div className="border px-3 py-1 w-auto h-11 border-mauve-400 rounded-lg 
                                    flex items-center gap-1 text-mauve-600">
                                      <label className="text-sm flex items-center">
                                        <i className="fa fa-sort"></i> <span>Sort by : </span>
                                      </label>
                                      <select className="w-35 h-full cursor-pointer">{downloadsearch.searchSort.map((ss)=>(
                                      <option value="">{ss}</option>
                                    ))}</select>
                                    </div>
                                  ))}
                                </>
                              ))
                            }
                          </ul>

                        </form>

                        <table className="download_table w-full">
                          <div className="flex px-5 py-4">
                            <span className="text-blue-600 border-b pb-2">Material list</span>
                          </div>
                          <tbody className="w-full">
                            {database.download.map((downloadData)=>(
                              <>
                                {downloadData.donwload_data?.map((ddt)=>(
                                  <tr className="w-full">
                                    <td>
                                      <div className="flex items-center gap-2 text-sm">
                                        <div className={`download-icon-col ${ddt.doc_icon_bg}`}>
                                          <i className={`${ddt.doc_icon} ${ddt.doc_icon_color}`}></i>
                                        </div>
                                        <div><h4 className="font-bold">{ddt.doc_title}</h4><span>{ddt.doc_label}</span></div>
                                      </div>
                                    </td>
                                    <td><span className="text-xs">{ddt.doc_type}</span></td>
                                    <td><span className="text-xs">{ddt.doc_size}</span></td>
                                    <td>
                                      <div className={`flex items-center justify-center py-2 status_wrapper
                                        text-xs gap-1 ${ddt.doc_bg} ${ddt.doc_text_status}`}>
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
                        <button className="flex items-center gap-2 justify-center border border-gray-300 cursor-pointer 
                        px-2 py-2 mt-3 text-gray-600 rounded-lg">
                          <span>show more</span><i className="fa fa-angle-down"></i>
                        </button>
                      </div>
                    </div>
                  </section>


                  <div className="main_content_footer bg-blue-100 flex justify-center">
                    <div className='px-1 py_5'><span className=''>&copy; Bulus Joel Project</span></div>
                  </div>
                </section>
              </>
            } />


            <Route path='/text-to-speech' element={
              <>
                <section className="main__section_wrapper w-full" id='main_wrapper'>
                  <Header />
                  <TexttoSpeech />
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
