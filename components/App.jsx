import React, { useState, useEffect, useRef } from 'react';
import Light from './Light';
import ControlButton from './ControlButton';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if(delay > 0) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function App() {
  const SIGNAL_DELAY_MS = 10000;
  const [lightOn, setLightOn] = useState('red');
  const [delay, setDelay] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useInterval(()=>{
    if(lightOn == 'red') {
      setLightOn('yellow');
    } else if(lightOn == 'yellow') {
      setLightOn('green');
    } else if(lightOn == 'green') {
      setLightOn('red');
    }
  }, delay);

  useEffect(()=>{
    if(isStarted) {
      setLightOn('red');
      setDelay(SIGNAL_DELAY_MS);
    } else {
      setLightOn(null);
      setDelay(0);
    }
  }, [isStarted])

  return (
    <>
      <div><h1>Traffic Lights simulator</h1></div>
      <div className="traffic-lights-container">
        <Light on={lightOn == 'red'} color="#cc3232" />
        <Light on={lightOn == 'yellow'} color="#e7b416" />
        <Light on={lightOn == 'green'} color="#2dc937" />
      </div>
      <div>
        <ControlButton label="Start" disabled={isStarted} onClick={()=>{setIsStarted(true)}} />
        <ControlButton label="Stop" disabled={!isStarted} onClick={()=>{setIsStarted(false)}}/>
      </div>
    </>
  )
}