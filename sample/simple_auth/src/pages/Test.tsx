import * as React from 'react';
import {useState, useEffect}  from 'react';
let apiData: string = "";
//
const dataItems: any[] = [
    {id:1, title: "title_1"},
    {id:2, title: "title_2"},
    {id:3, title: "title_3"},
  ];
let items: any[] = [];
//
export default function Test() {
    const [updatetime, setUpdatetime] = React.useState("");
    const msg: string = "Test";
    useEffect(() => {
        (async () => {
            items = dataItems;
            setUpdatetime(new Date().toString());
        })()
      }, []);
    //
    const updateTimestap = function() {
        const dt = new Date().toString();
        setUpdatetime(dt);
    }
  //
  const test2 = async function(){
    try{
console.log("testProc" + new Date().toString());
      const item = { param1: 1111 };
      const body: any = JSON.stringify(item);		
      const res = await fetch("/api/test/test1", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json();
console.log(json);
/*
      if(json.ret && json.ret === 'OK') {
        alert("OK, api POST")
      }
*/
    } catch (e) {
      console.error(e);
    }
  };
  //
    return (
    <>
        <h1>Test!</h1>
        <p>apiData=[ {apiData} ]</p>
        <hr />
        <button onClick={()=>{test2()}}>Test2</button>
        <hr />
        {items.map((item: any) => {
        return (
        <div key={item.id}>
          <h3 className="text-3xl font-bold">{item.title}</h3>
          <span>id: {item.id}</span>
          <hr />
        </div>
        );
        
      })}
    </>
    )
}
