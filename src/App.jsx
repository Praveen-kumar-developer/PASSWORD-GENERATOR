import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLenght] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "-=[]{}';./,.<>:?/|_+?!@#$%^7890-=";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-4xl text-center my-3">
          Password Generator
        </h1>
        <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordtoclipboard}
            className=" block outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                return setLenght(e.target.value);
              }}
            />
            <label>Lenght: {length}</label>
          </div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberinput"
            onChange={() => {
              setNumberAllowed((prev) => {
                return !prev;
              });
            }}
          />
          <label htmlFor="numberinput">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="numberinput"
            onChange={() => {
              setCharAllowed((prev) => {
                return !prev;
              });
            }}
          />
          <label htmlFor="numberinput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
