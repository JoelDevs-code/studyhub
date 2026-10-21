// import { useState } from 'react'
import '../App.css'; 
import "../dist/style.css";
import '../assets/fonts/flaticon/css/all.css';
import '../assets/fonts/flaticon/css/all.min.css';

import '../assets/fonts/flaticon/icomoon/style.css'

import ProgressChart from '../components/linechart';
import CourseChart from '../components/barchar';
import SubjectChart from '../components/piechart';

import audio_wave from "../assets/images/wave.jpg"

// const operation_card = [
//   {background: "bg-purple-100", icon: "fa fa-book-open", color: "text-purple-500", icon_bg: "bg-purple-500",
//     oppNum: "12", oppPercent: "20%", oppTxt: "Course Materials Downloaded"},
//   {background: "bg-green-100", icon: "fa fa-clipboard-list", color: "text-green-500", icon_bg: "bg-green-500", 
//     oppNum: "28", oppPercent: "35%", oppTxt: "Past Questions Downloaded"},
//   {background: "bg-blue-100", icon: "fa fa-play", color: "text-blue-500", icon_bg: "bg-blue-500", 
//     oppNum: "15", oppPercent: "18%", oppTxt: "Video Tutorials Watched"},
//   {background: "bg-red-100", icon: "fa fa-folder-open", color: "text-red-500", icon_bg: "bg-red-500", 
//     oppNum: "8", oppPercent: "40%", oppTxt: "Final Projects Completed"},
//   {background: "bg-blue-100", icon: "fa fa-code", color: "text-blue-500", icon_bg: "bg-blue-500",
//     oppNum: "10", oppPercent: "22%", oppTxt: "Source Code Downloads"},
//   {background: "bg-yellow-100", icon: "fa fa-microphone-alt", color: "text-yellow-500", icon_bg: "bg-yellow-500",
//     oppNum: "5,600", oppPercent: "15%", oppTxt: "Text to speech conversion"}
// ]

const streak_count = [
  {name: "fa fa-circle-check", color: "text-green-500", day: "M"},
  {name: "fa fa-circle-check", color: "text-green-500", day: "T"},
  {name: "fa fa-circle-check", color: "text-green-500", day: "W"},
  {name: "fa fa-circle-check", color: "text-green-500", day: "T"},
  {name: "fa fa-circle-check", color: "text-green-500", day: "F"},
  {name: "fa fa-circle-check", color: "text-green-500", day: "S"},
  {name: "fa fa-xmark-circle", color: "text-gray-400", day: "S"}
]

const current_month = new Date().toISOString().slice(0,7)

import studyHubData from "../data/studyHubData.json";

function home$page() {
  const operation_card = studyHubData.dashboard.statCards;
  const coursesCompleted = studyHubData.dashboard.coursesCompleted;
  const acdPrgOv = studyHubData.dashboard.academicProgressOverview;

  return (
    <>
      <section className="main_dashobard_content w-full bg-white" id='main'>
        <div className="main_dashboard_content_wrapper flex flex-col px-2 py-1">
          <div className="dashboard_content_header flex justify-between items-center flex-wrap">

            <div className="dashboard_content_welcome_display flex flex-col">
              <h4 className='font-bold'>Welcome back, Joel!</h4>
              <span className='text-xs text-gray-400'>Here's what happening with your academic journey.</span>
            </div>

            <div className="dashboard_calender_btn justify-between px-1 cursor-pointer flex items-center gap-5">
              {/* <i className="fa-regular fa-calendar-days text-blue-500"></i> */}
              <input type="month" placeholder='This month' 
              className='calnder_input text-blue-400 text-sm font-bold' defaultValue = {current_month} />
            </div>

          </div>
          <div className="dashboard_operations_grid w-full py-2">
            <div className="dashboard_operations_grid_wrapper flex gap-2 justify-between">
              {operation_card.map((operationCard, index)=>(
                <div className={operationCard.background} id='oppcardId' key={index}>
                  <div className={operationCard.icon_bg} id="dash_opp_img">
                    <i className={operationCard.icon}></i>
                  </div>
                  <div className="dash_opp_txt-m">
                    <h5 className={operationCard.color}>{operationCard.value}</h5>
                    <span className='text-gray-400'>{operationCard.title}</span>
                  </div>
                  <div className="dash_opp_txt-sm text-sm font-bold">
                    <label className={operationCard.color}>{operationCard.changePercent}% </label>
                    <span className='text-black'>{operationCard.changeLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="dash_oop_charts_wrapper gap-1 flex items-center">

            <div className="dash_opp_chart_line border px-1 py-1 flex flex-col gap-2">
              <div className="dash_opp_chart_line_header flex items-center justify-between">
                <h5 className='font-bold text-xs'>Academic Progress Overview</h5>
                <div className="dash_select">
                  <select name="semester_chart_dp" id="" className='cursor-pointer'>
                    {/* <option value="">{acdPrgOv.defaultLevel}</option> */}
                    {
                      acdPrgOv.levels.map((acdLvv)=>(
                        <option value={acdLvv}>{acdLvv}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <ProgressChart />
            </div>

            <div className="dash_opp_chart_line border px-1 py-1 flex flex-col gap-2">
              <div className="dash_opp_chart_line_header flex items-center justify-between">
                <h5 className='font-bold text-xs'>Courses Completed (Last 3 Semester)</h5>
                <div className='dash_select'>
                  <select name="semester_chart_dp" className='cursor-pointer' id="">
                    {/* <option className='text-black' value=""></option> */}
                    {
                      // <option value="">{coursesCompleted.defaultLevel}</option>
                    }
                    {
                      coursesCompleted.levels.map((cComplete)=>(
                        <option value={cComplete}>{cComplete}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <CourseChart />
            </div>

          </div>
          <div className="down_dash_operations py-2 flex justify-between gap-1">

            <div className="f_node_down_operation flex gap-5">

              <div className="dash_opp_chart_pie border px-1 py-1 flex flex-col gap-2">
                <div className="dash_opp_chart_pie_header flex items-center justify-between">
                  <h5 className='font-bold text-xs'>Top Courses</h5>
                </div>
                <SubjectChart />
              </div>

              <div className="dash_opp_txt_aud border px-1 py-1 flex flex-col gap-2">
                <div className="dash_opp_txt_aud_header flex flex-col justify-between">
                  <h5 className='font-bold text-xs'>Text to Speech</h5>
                </div>
                <div className="conversion_icon text-5xl">
                  {/* <i className="fa-regular fa-file-text text-blue-800"></i>
                  <i className="fa fa-arrow-right"></i>
                  <i className="fa-regular fa-file-audio text-blue-900"></i> */}
                  <img src={audio_wave} alt="" className='txt_audio_img' />
                </div>
                <button className='bg-blue-500 text-white txt-spc-btn'>Convert Text Now</button>
              </div>
              
            </div>

            <div className="study_streak_container flex flex-col gap-1 px-1 py-1 border">
              <label htmlFor="study_streak_container" className='font-bold text-sm'>Study Streak</label>
              <div className="main_streak_display flex items-center gap-5">
                <div className="main_streak_display_img">
                  <i className="fa fa-fire text-amber-400 font-bold text-5xl"></i>
                </div>
                <div className="main_streak_display_txt flex flex-col">
                  <h4 className='font-bold text-4xl'>14</h4><span className='text-sm text-gray-400'>Days in a row!</span>
                </div>
              </div>
              <div className="streak_count_display flex gap-1">
                {
                  streak_count.map((streakCount, index)=>(
                    <div className='flex flex-col items-center'>
                      <span className='text-sm' key={index}>{streakCount.day}</span>
                      <div className={streakCount.color}><i className={streakCount.name}></i></div>
                    </div>
                  ))
                }
              </div>
              <div className="study_streak_footer flex gap-5 items-center text-sm bg-blue-50 px-1 py_5">
                <i className="fa fa-bars-progress text-blue-500"></i>
                <span className='text-blue-500'>Consistency today, success tomorrow.</span>
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  )
}

export default home$page
