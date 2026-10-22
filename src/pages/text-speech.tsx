
import '../App.css'; import '../css/tts.css'
import '../assets/fonts/flaticon/css/all.css'
import '../assets/fonts/flaticon/css/all.min.css'

// import studyHubData from "../data/studyHubData.json";

import tts_img from "../assets/images/m-a.png"

import tts_test_one from "../data/tts_test_1.txt"
import tts_test_two from "../data/tts_test_1.txt"
import { useState } from 'react';

  function startToggle(){
    const text_typing = document.getElementById("text_typing");
    const text_upload = document.getElementById("text_upload");
    const text_input = document.getElementById("text_input");
    const upload_input = document.getElementById("upload_input");
    text_typing?.classList.remove("active");
    text_upload?.classList.add("active");

    text_input?.classList.add("none");
    upload_input?.classList.remove("none");
    
  }

  function reverseToggle(){
    const text_typing = document.getElementById("text_typing");
    const text_upload = document.getElementById("text_upload");
    const text_input = document.getElementById("text_input");
    const upload_input = document.getElementById("upload_input");

    text_typing?.classList.add("active");
    text_upload?.classList.remove("active");

    upload_input?.classList.add("none");
    text_input?.classList.remove("none");

  }

  // const [name, setName] = useState("");
  // const handleClear = ()=>{setName("")};

  // const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{event.preventDefault()}

function texttospeech(){

  return (
    <>
      <section className="text-to-speech w-full bg-white">
        <div className="text-to-speech-container w-full px-5 py-3 flex gap-5">

          <div className="tts-main-container w-full">
            <div className="tts-top-col bg-blue-50 flex items-center gap-5 px-5 py-5 rounded-2xl">
              <div className="tsst-top-col-img w-100"><img src={tts_img} width={250} draggable="false" /></div>
              <div className="tsst-top-col-txt flex flex-col gap-2">
                <h2 className='text-xl font-bold'>Turn Your Text to Natural Speech</h2>
                <p className='text-sm text-mauve-600'>
                  Listen to study materials, notes and documents anytime, anywhere.
                  Choose from multiple voices and languages for a better learning experience.
                </p>
                <div className='flex gap-4 my-3 text-xs b-wrp-col'>
                  <div className='flex items-center gap-1.5'>
                    <i className='fa fa-bolt-lightning text-amber-400'></i><span>Fast & Acurate</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <i className='fa fa-shield text-green-400'></i><span>Multiple Languages</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <i className='fa fa-star text-sky-400'></i><span>Multiple Voices</span>
                  </div>
                </div>
              </div>
            </div>

            <form action="" className='tts-conversion-form my-5 flex flex-col gap-3 border border-blue-100 px-5 py-5 rounded-2xl'>
              
              <div className="tts-form-header flex items-center justify-between">
                <div className="tts-form-label-h">
                  <h4 className='font-bold text-lg'>Enter Your Text</h4>
                  <p className='text-xs'>
                    Type or paste your text below, or upload a file (PDF, DOC. TXT) to convert to speech
                  </p>
                </div>
                <div className="btn-conversion-type h-13 flex items-center rounded-lg gap-1 border text-sm 
                border-mauve-300">
                  <button type='button' className='px-2 cursor-pointer h-full  items-center active flex' onClick={reverseToggle} id='text_typing'>
                    Text Input
                  </button>
                  <button type='button' className='px-2 cursor-pointer h-full items-center flex' onClick={startToggle} id='text_upload'>
                    Upload File
                  </button>
                </div>
              </div>
              <div className="input-types border border-mauve-300 my-3 h-40 rounded-lg">
                <textarea id='text_input' className='w-full h-full px-4 py-4 resize-none' 
                // onChange={(e)=> setName(e.target.value)}
                placeholder='Place your text here.....(e.g lecture notes, articles, study materials)' />
                <input id='upload_input' type="file" className='w-full h-full none px-4 py-4 cursor-pointer'
                // onChange={(e)=> setName(e.target.value)}
                placeholder='Place your text here.....(e.g lecture notes, articles, study materials)' />
              </div>
              <div className='flex justify-between items-center px-1'>
                <div className="text-count">
                  <label htmlFor="">0</label><span>/5000 characters</span>
                </div>
                <button className='flex items-center gap-2.5 cursor-pointer' type='button'>
                  <i className="fa-regular fa-trash-can text-sm"></i><span>Clear</span>
                </button>
              </div>

              <div className="conversion-controls my-5 flex gap-2.5 items-center justify-between">
                
                <div className="controls--card px-4 py-5 flex flex-col gap-3.5 border border-mauve-300 rounded-lg">
                  <div className="controls-label flex items-center gap-1.5">
                    <div className='controls-icon w-10 h-10 bg-blue-600 rounded-3xl flex items-center justify-center'>
                      <i className='fa fa-globe fa-beat text-white text-lg'></i>
                    </div>
                    <h4 className='font-bold'>Select Language</h4>
                  </div>
                  <div className="controls-selection border border-mauve-300 rounded-sm h-10 px-2">
                    <select name="" id="" className='h-full w-full cursor-pointer'>
                      <option value="">English (US)</option>
                    </select>
                  </div>
                  <span className='text-xs'>Choose the language for your speech</span>
                </div>

                <div className="controls--card px-4 py-5 flex flex-col gap-3.5 border border-mauve-300 rounded-lg">
                  <div className="controls-label flex items-center gap-1.5">
                    <div className='controls-icon w-10 h-10 bg-blue-600 rounded-3xl flex items-center justify-center'>
                      <i className='fa-regular fa-user fa-beat text-white text-sm'></i>
                    </div>
                    <h4 className='font-bold'>Select Voice</h4>
                  </div>
                  <div className="controls-selection border border-mauve-300 rounded-sm h-10 px-2">
                    <select name="" id="" className='h-full w-full cursor-pointer'>
                      <option value="">English (US)</option>
                    </select>
                  </div>
                  <span className='text-xs'>pick a voice that sounds natural you</span>
                </div>

                <div className="controls--card px-4 py-5 flex flex-col gap-3.5 border border-mauve-300 rounded-lg">
                  <div className="controls-label flex items-center gap-1.5">
                    <div className='controls-icon w-10 h-10 bg-blue-600 rounded-3xl flex items-center justify-center'>
                      <i className='fa fa-dashboard fa-beat text-white text-lg'></i>
                    </div>
                    <h4 className='font-bold'>Select Speed</h4>
                  </div>
                  <div className="controls-selection border border-mauve-300 rounded-sm h-10 px-2">
                    <select name="" id="" className='h-full w-full cursor-pointer'>
                      <option value="">English (US)</option>
                    </select>
                  </div>
                  <span className='text-xs'>Adjust the reading speech to suit you</span>
                </div>  

              </div>
              <button type='submit' className='flex bg-blue-600 w-full justify-center items-center
              gap-1.5 text-white h-12 rounded-lg cursor-pointer hover:bg-blue-700 transition-all'>
                <i className="fa fa-play"></i><span>Convert to Speech</span>
              </button>
            </form>
          </div>

          <div className="tts-main-aside w-120 gap-5 flex flex-col">
            <div className="voices-container border border-mauve-200 rounded-lg py-3 flex flex-col gap-2.5">
              <div className="voices-container-header flex justify-between px-4 py-4 pb-3 border-b border-b-mauve-300">
                <h5 className='text-blue-600 font-bold'>Popular Voices Select to play</h5>
                {/* <button className='text-blue-500 cursor-pointer'>View All</button> */}
              </div>

              <div className="selection-ppv flex items-center px-3 justify-between gap-2.5">
                <select className='w-60 cursor-pointer' name="" id="">
                  <option value="popular Voices">Popular Voices</option>
                </select>
                <div className='w-8 h-8 bg-blue-600 cursor-pointer items-center justify-center flex rounded-4xl'>
                  <i className="fa fa-play text-white"></i>
                </div>
              </div>

            </div>

            <div className="tts-benefits flex flex-col gap-3 rounded-lg px-5 py-5 bg-blue-50">
              <div className="tts-benefit-header font-bold flex items-center gap-5">
                <i className="fas fa-microphone fa-fade text-blue-500"></i> <h5>Why Use Text to Speech?</h5>
              </div>
              <ul className='flex-flex-col'>
                <li className='flex items-center gap-5 py-1'>
                  <i className='fa fa-check text-blue-500'></i><span>Save time and effort</span>
                </li>
                <li className='flex items-center gap-5 py-1'>
                  <i className='fa fa-check text-blue-500'></i><span>Improve focus while studying</span>
                </li>
                <li className='flex items-center gap-5 py-1'>
                  <i className='fa fa-check text-blue-500'></i><span>Listen on the go</span>
                </li>
                <li className='flex items-center gap-5 py-1'>
                  <i className='fa fa-check text-blue-500'></i><span>Multiple language and voices</span>
                </li>
              </ul>
            </div>

            <div className="tts-test-samples flex flex-col gap-3 rounded-lg px-5 py-5 border-mauve-300 border">
              <div className="tts-test-samples-h flex flex-col gap-1 border-b border-b-mauve-300 pb-5">
                <h5 className='font-bold text-blue-600'>Quick Test Samples</h5>
                <p className='text-sm text-mauve-600'>
                  Try these samples test to see how it works, drag to upload.
                </p>
              </div>
              <ul className='flex flex-col gap-2'>
                <iframe src={tts_test_one} draggable="true" /><br />
                <iframe src={tts_test_two} draggable="true" />
              </ul>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default texttospeech;