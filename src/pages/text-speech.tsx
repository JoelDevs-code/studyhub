
import '../App.css';
import '../css/tts.css';
import '../assets/fonts/flaticon/css/all.css';
import '../assets/fonts/flaticon/css/all.min.css';

import { useEffect, useRef, useState } from 'react';
import tts_img from '../assets/images/m-a.png';

const MAX_CHARACTERS = 5000;

type SpeechStatus = 'idle' | 'speaking' | 'paused';
type InputMode = 'typing' | 'upload';

interface TestSample {
  title: string;
  text: string;
}

const testSamples: TestSample[] = [
  {
    title: 'Study Sample',
    text: 'Learning is a continuous process. Regular revision, active listening, and consistent practice help students understand difficult concepts and remember important information.',
  },
  {
    title: 'Motivation Sample',
    text: 'Success in education comes from dedication, patience, and the willingness to learn from mistakes. Take small steps every day and keep working towards your goals.',
  },
];

function TextToSpeech() {
  const [text, setText] = useState<string>('');
  const [inputMode, setInputMode] = useState<InputMode>('typing');
  const [language, setLanguage] = useState<string>('en-US');
  const [voiceURI, setVoiceURI] = useState<string>('');
  const [speed, setSpeed] = useState<string>('1');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [error, setError] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setError('Your browser does not support text-to-speech.');
      return;
    }

    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();

    window.speechSynthesis.addEventListener(
      'voiceschanged',
      loadVoices
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        'voiceschanged',
        loadVoices
      );

      window.speechSynthesis.cancel();
    };
  }, []);

  const availableVoices = voices.filter(
    (voice) => voice.lang === language
  );

  const supportedLanguages = [
    ...new Set(voices.map((voice) => voice.lang)),
  ].sort();

  const stopSpeech = (): void => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = null;
    setStatus('idle');
  };

  const startSpeech = (speechText: string = text): void => {
    const cleanText = speechText.trim();

    if (!cleanText) {
      setError('Please enter some text before converting to speech.');
      return;
    }

    if (cleanText.length > MAX_CHARACTERS) {
      setError(`Text cannot exceed ${MAX_CHARACTERS} characters.`);
      return;
    }

    if (!('speechSynthesis' in window)) {
      setError('Your browser does not support text-to-speech.');
      return;
    }

    setError('');
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.lang = language;
    utterance.rate = Number(speed);
    utterance.pitch = 1;

    const selectedVoice = voices.find(
      (voice) => voice.voiceURI === voiceURI
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setStatus('speaking');

    utterance.onend = () => {
      utteranceRef.current = null;
      setStatus('idle');
    };

    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      utteranceRef.current = null;
      setStatus('idle');

      if (
        event.error !== 'canceled' &&
        event.error !== 'interrupted'
      ) {
        setError('Speech could not be played. Please try again.');
      }
    };

    utteranceRef.current = utterance;
    setStatus('speaking');

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = (): void => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  };

  const handleResume = (): void => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus('speaking');
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    stopSpeech();
    setLanguage(event.target.value);
    setVoiceURI('');
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError('');

    if (!file.name.toLowerCase().endsWith('.txt')) {
      setError('Please upload a plain-text .txt file.');
      event.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Please upload a file smaller than 2 MB.');
      event.target.value = '';
      return;
    }

    try {
      const contents = await file.text();

      if (contents.length > MAX_CHARACTERS) {
        setError(
          `The file exceeds the ${MAX_CHARACTERS}-character limit.`
        );
        event.target.value = '';
        return;
      }

      stopSpeech();
      setText(contents);
      setFileName(file.name);
    } catch {
      setError('Unable to read this file. Please try another one.');
    }
  };

  const handleClear = (): void => {
    stopSpeech();
    setText('');
    setFileName('');
    setError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const previewVoice = (voice: SpeechSynthesisVoice): void => {
    stopSpeech();

    setVoiceURI(voice.voiceURI);

    const preview = new SpeechSynthesisUtterance(
      `Hello! This is a preview of the ${voice.name} voice.`
    );

    preview.lang = voice.lang;
    preview.voice = voice;
    preview.rate = Number(speed);

    preview.onstart = () => setStatus('speaking');

    preview.onend = () => {
      utteranceRef.current = null;
      setStatus('idle');
    };

    preview.onerror = () => {
      utteranceRef.current = null;
      setStatus('idle');
    };

    utteranceRef.current = preview;
    window.speechSynthesis.speak(preview);
  };

  const loadSample = (sample: TestSample): void => {
    stopSpeech();
    setText(sample.text);
    setFileName('');
    setError('');
    setInputMode('typing');
  };

  return (
    <section className="text-to-speech w-full bg-white">
      <div className="text-to-speech-container w-full px-5 py-3 flex gap-5">

        <div className="tts-main-container w-full">

          <div className="tts-top-col bg-blue-50 flex items-center gap-5 px-5 py-5 rounded-2xl">
            <div className="tsst-top-col-img w-100">
              <img
                src={tts_img}
                width={250}
                alt="Text-to-speech illustration"
                draggable={false}
              />
            </div>

            <div className="tsst-top-col-txt flex flex-col gap-2">
              <h2 className="text-xl font-bold">
                Turn Your Text to Natural Speech
              </h2>

              <p className="text-sm text-mauve-600">
                Listen to study materials, notes and documents anytime,
                anywhere. Choose from available voices and languages.
              </p>

              <div className="flex gap-4 my-3 text-xs b-wrp-col">
                <div className="flex items-center gap-1.5">
                  <i className="fa fa-bolt-lightning text-amber-400" />
                  <span>Fast & Accurate</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <i className="fa fa-shield text-green-400" />
                  <span>Multiple Languages</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <i className="fa fa-star text-sky-400" />
                  <span>Multiple Voices</span>
                </div>
              </div>
            </div>
          </div>

          <form
            className="tts-conversion-form my-5 flex flex-col gap-3 border border-blue-100 px-5 py-5 rounded-2xl"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              startSpeech();
            }}
          >
            <div className="tts-form-header flex items-center justify-between gap-3">
              <div className="tts-form-label-h">
                <h4 className="font-bold text-lg">Enter Your Text</h4>
                <p className="text-xs">
                  Type or paste text below, or upload a .TXT file.
                </p>
              </div>

              <div className="btn-conversion-type h-13 flex items-center rounded-lg gap-1 border border-mauve-300 text-sm">
                <button
                  type="button"
                  className={`px-2 cursor-pointer h-full ${
                    inputMode === 'typing' ? 'active' : ''
                  }`}
                  onClick={() => setInputMode('typing')}
                >
                  Text Input
                </button>

                <button
                  type="button"
                  className={`px-2 cursor-pointer h-full ${
                    inputMode === 'upload' ? 'active' : ''
                  }`}
                  onClick={() => setInputMode('upload')}
                >
                  Upload File
                </button>
              </div>
            </div>

            <div className="input-types border border-mauve-300 my-3 min-h-40 rounded-lg overflow-hidden">
              {inputMode === 'typing' ? (
                <textarea
                  id="text_input"
                  className="w-full h-40 px-4 py-4 resize-none outline-none"
                  value={text}
                  maxLength={MAX_CHARACTERS}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setText(event.target.value);
                    setError('');
                    setFileName('');
                  }}
                  placeholder="Place your text here... e.g. lecture notes, articles, study materials"
                />
              ) : (
                <div className="h-40 px-4 py-4 flex flex-col justify-center items-center gap-3">
                  <i className="fa fa-cloud-arrow-up text-blue-600 text-3xl" />

                  <input
                    ref={fileInputRef}
                    id="upload_input"
                    type="file"
                    accept=".txt,text/plain"
                    onChange={handleFileUpload}
                    className="w-full cursor-pointer"
                  />

                  <p className="text-xs text-mauve-600">
                    {fileName || 'Upload a .txt file (maximum 2 MB)'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center px-1 gap-3">
              <div className="text-count">
                <label>{text.length}</label>
                <span>/{MAX_CHARACTERS} characters</span>
              </div>

              <button
                className="flex items-center gap-2.5 cursor-pointer"
                type="button"
                onClick={handleClear}
              >
                <i className="fa-regular fa-trash-can text-sm" />
                <span>Clear</span>
              </button>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="conversion-controls my-5 flex gap-2.5 items-stretch justify-between">

              <div className="controls--card px-4 py-5 flex flex-col gap-3.5 border border-mauve-300 rounded-lg flex-1 min-w-0">
                <div className="controls-label flex items-center gap-1.5">
                  <div className="controls-icon w-10 h-10 bg-blue-600 rounded-3xl flex items-center justify-center shrink-0">
                    <i className="fa fa-globe text-white text-lg" />
                  </div>
                  <h4 className="font-bold">Select Language</h4>
                </div>

                <div className="controls-selection border border-mauve-300 rounded-sm h-10 px-2">
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="h-full w-full cursor-pointer"
                  >
                    {!supportedLanguages.includes('en-US') && (
                      <option value="en-US">English (US)</option>
                    )}

                    {supportedLanguages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-xs">
                  Choose the language for your speech.
                </span>
              </div>

              <div className="controls--card px-4 py-5 flex flex-col gap-3.5 border border-mauve-300 rounded-lg flex-1 min-w-0">
                <div className="controls-label flex items-center gap-1.5">
                  <div className="controls-icon w-10 h-10 bg-blue-600 rounded-3xl flex items-center justify-center shrink-0">
                    <i className="fa-regular fa-user text-white text-sm" />
                  </div>
                  <h4 className="font-bold">Select Voice</h4>
                </div>

                <div className="controls-selection border border-mauve-300 rounded-sm h-10 px-2">
                  <select
                    value={voiceURI}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setVoiceURI(event.target.value)
                    }
                    className="h-full w-full cursor-pointer"
                  >
                    <option value="">Default voice</option>

                    {availableVoices.map((voice) => (
                      <option key={voice.voiceURI} value={voice.voiceURI}>
                        {voice.name}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-xs">
                  Choose an available voice.
                </span>
              </div>

              <div className="controls--card px-4 py-5 flex flex-col gap-3.5 border border-mauve-300 rounded-lg flex-1 min-w-0">
                <div className="controls-label flex items-center gap-1.5">
                  <div className="controls-icon w-10 h-10 bg-blue-600 rounded-3xl flex items-center justify-center shrink-0">
                    <i className="fa fa-dashboard text-white text-lg" />
                  </div>
                  <h4 className="font-bold">Select Speed</h4>
                </div>

                <div className="controls-selection border border-mauve-300 rounded-sm h-10 px-2">
                  <select
                    value={speed}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setSpeed(event.target.value)
                    }
                    className="h-full w-full cursor-pointer"
                  >
                    <option value="0.5">0.5x - Very slow</option>
                    <option value="0.75">0.75x - Slow</option>
                    <option value="1">1x - Normal</option>
                    <option value="1.25">1.25x - Fast</option>
                    <option value="1.5">1.5x - Faster</option>
                    <option value="2">2x - Very fast</option>
                  </select>
                </div>

                <span className="text-xs">
                  Adjust your reading speed.
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!text.trim() || status === 'speaking'}
              className="flex bg-blue-600 w-full justify-center items-center gap-1.5 text-white h-12 rounded-lg cursor-pointer hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              <i className="fa fa-play" />
              <span>Convert to Speech</span>
            </button>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePause}
                disabled={status !== 'speaking'}
                className="flex-1 border rounded-lg p-3 disabled:opacity-40"
              >
                <i className="fa fa-pause mr-2" />
                Pause
              </button>

              <button
                type="button"
                onClick={handleResume}
                disabled={status !== 'paused'}
                className="flex-1 border rounded-lg p-3 disabled:opacity-40"
              >
                <i className="fa fa-play mr-2" />
                Resume
              </button>

              <button
                type="button"
                onClick={stopSpeech}
                disabled={status === 'idle'}
                className="flex-1 border rounded-lg p-3 disabled:opacity-40"
              >
                <i className="fa fa-stop mr-2" />
                Stop
              </button>
            </div>

            <p aria-live="polite" className="text-sm text-blue-600">
              {status === 'speaking' && 'Speech is playing...'}
              {status === 'paused' && 'Speech is paused.'}
              {status === 'idle' && 'Ready to convert your text.'}
            </p>
          </form>
        </div>

        <aside className="tts-main-aside w-120 gap-5 flex flex-col">
          <div className="voices-container border border-mauve-200 rounded-lg py-3 flex flex-col gap-2.5">
            <div className="voices-container-header flex justify-between px-4 py-4 pb-3 border-b border-b-mauve-300">
              <h5 className="text-blue-600 font-bold">
                Popular Voices
              </h5>
            </div>

            {availableVoices.length === 0 ? (
              <p className="px-4 py-2 text-sm text-mauve-600">
                No voices are available for this language yet.
              </p>
            ) : (
              availableVoices.slice(0, 5).map((voice) => (
                <div
                  key={voice.voiceURI}
                  className="flex items-center px-3 justify-between gap-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {voice.name}
                    </p>
                    <p className="text-xs text-mauve-600">
                      {voice.lang}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Preview ${voice.name}`}
                    onClick={() => previewVoice(voice)}
                    className="w-8 h-8 shrink-0 bg-blue-600 cursor-pointer items-center justify-center flex rounded-full"
                  >
                    <i className="fa fa-play text-white" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="tts-benefits flex flex-col gap-3 rounded-lg px-5 py-5 bg-blue-50">
            <div className="tts-benefit-header font-bold flex items-center gap-5">
              <i className="fas fa-microphone text-blue-500" />
              <h5>Why Use Text to Speech?</h5>
            </div>

            <ul className="flex flex-col">
              {[
                'Save time and effort',
                'Improve focus while studying',
                'Listen on the go',
                'Multiple available languages and voices',
              ].map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-5 py-1"
                >
                  <i className="fa fa-check text-blue-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="tts-test-samples flex flex-col gap-3 rounded-lg px-5 py-5 border-mauve-300 border">
            <div className="tts-test-samples-h flex flex-col gap-1 border-b border-b-mauve-300 pb-5">
              <h5 className="font-bold text-blue-600">
                Quick Test Samples
              </h5>
              <p className="text-sm text-mauve-600">
                Select a sample to load it into the text editor.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {testSamples.map((sample) => (
                <div
                  key={sample.title}
                  className="border border-mauve-200 rounded-lg p-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h6 className="font-semibold text-sm">
                      {sample.title}
                    </h6>
                    <p className="text-xs text-mauve-600">
                      {sample.text.slice(0, 65)}...
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => loadSample(sample)}
                    className="text-blue-600 text-sm font-semibold shrink-0"
                  >
                    Use sample
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default TextToSpeech;
