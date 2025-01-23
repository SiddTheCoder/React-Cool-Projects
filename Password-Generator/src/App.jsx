import { useCallback, useState, useEffect, useRef } from "react"


function App(){

    //Creating states for variables management
    const [passlength,setPassLength] = useState(7)
    const [numAllowed,setNumAllowed] = useState(false)
    const [charAllowed,setCharAllowed] = useState(false)
    const [password,setPassword] = useState('')

    const passwordGenerator = useCallback( () =>{
      let pass = ''
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

      if(numAllowed){
        str += '1234567890'
      }
      if(charAllowed){
        str += '!@#$%^&*_-|~'
      }

      for (let i = 1; i <= passlength; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)        
      }

      setPassword(pass)

    }, [passlength,numAllowed,charAllowed,setPassword])

    useEffect(() => {
      passwordGenerator()
    }, [passlength, numAllowed, charAllowed, passwordGenerator])


    const passwordRef = useRef(null)
    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select(); // This method select the text being selected
      window.navigator.clipboard.writeText(password)
    }, [password])
  return(
    <>
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">Welcome to Password Generator
      </h1>
      <div className="bg-purple-800 w-max-md w-[700px] h-44 mt-20 rounded-md p-4 flex flex-col">
        <div className="flex">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
          className="bg-slate-950 border-none py-2 px-4 rounded-tl-md rounded-bl-md w-full outline-none"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-purple-300 w-24 text-xl text-slate-950 font-semibold rounded-tr-md rounded-br-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer"
        >Copy</button>

        </div>
        <hr className="mt-4" />
        <div className="mt-10 flex text-xl justify-around items-center">

          <div className="flex items-center gap-3">
          <input
           type="range"
           onChange={(e) => setPassLength(e.target.value)}
           value={passlength}
           max={100}
           min={6}
          />
          <label>Length : {passlength}</label>
          </div>

          <div>
            <input
             type="checkbox"
             checked={numAllowed}
             onChange={() => {
              setNumAllowed((prev) => !(prev))
             }}
             className="text-2xl"
            />
            <label>Numbers</label>
          </div>

          <div>
            <input
             type="checkbox"
             checked={charAllowed}
             onChange={() => {
              setCharAllowed((prev) => !(prev))
             }}
            />
            <label>Characters</label>
          </div>

        </div>

      </div>

    </div>
    </>
  )
}

export default App