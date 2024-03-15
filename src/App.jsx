import { Toast } from 'flowbite-react';
import { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [length, setLenght] = useState(8);
  const[numberChecked, setNumberChecked] = useState(false);
  const[charChecked,setCharChecked]=useState(false);
  const[password,setPassword]=useState("");
  const [showToast, setShowToast] = useState(false);

 const passwordGenerator=useCallback(()=>{
   let pass="";
   let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if (numberChecked) {str+="1234567890"}
   if(charChecked){str+= "!@#$%^&*()_+=-{}[]|\\?/.,:;\"\'<>~`"}

   for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random() * str.length +  1);
    pass+=str.charAt(char);

   }
   setPassword(pass);

 },[length, numberChecked, charChecked,setPassword])

 const copyPasswordToClip=useCallback(()=>{
  passwordRef.current?.select();
  toast("Copy to ClipBoard")
  
    window.navigator.clipboard.writeText(password);
 },[password])

 useEffect(()=>{
  passwordGenerator();
 },[length,charChecked,numberChecked])

 const passwordRef=useRef(null);
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-center text-white my-3
      '>Password Generator</h1>
         <div className='flex shadow-md rounded-lg overflow-hidden mb-4'>
          <input type="text" className='outline-none w-full py-1 px-3' value={password} placeholder='password' ref={passwordRef}  readOnly/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClip}>copy</button>
     
         </div>
         <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
             <input type="range" name="" min={6} max={100} value={length} className='cursorpointer' id="range" onChange={(e)=>setLenght(e.target.value)}/>
             <label htmlFor="">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="" id=""  defaultChecked={numberChecked} onChange={()=>setNumberChecked(!numberChecked)}/>
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" name="" id=""  defaultChecked={charChecked} onChange={()=>setCharChecked(!charChecked)}/>
            <label htmlFor="">Characters</label>
          </div>
         </div>

 
     </div>

     <ToastContainer/>
    </>
  )
}

export default App
