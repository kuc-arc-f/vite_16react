//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import './App.css'

function App() {
//  const [count, setCount] = useState(0);
  //
  const testProc = async function (){
    try{
  console.log("testProc" + new Date().toString());
      const item = { param1: 111 };
      const body: any = JSON.stringify(item);		
      const res = await fetch("/api/test/test1", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json();
  console.log(json);
      if(json.ret && json.ret === 'OK') {
        alert("OK, api POST")
      }
    } catch (e) {
      console.error(e);
    }
  }
  //
  return (
    <>
      <h1>Vite + React</h1>
      <hr />
      <button onClick={()=>testProc()}>Test</button>
      <hr />
      <span>App.tsx!</span>
    </>
  )
}

export default App
