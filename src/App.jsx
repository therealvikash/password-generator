import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharacterAllowed, setSpecialCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwrodRef = useRef(null);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwrodRef.current.select();
  };

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ASDFGHJKLZXCVBNMQWERTYUIOPasdfghjklzxcvbnmqwertyuiop";
    if (numberAllowed) str += "0123456789";
    if (specialCharacterAllowed) str += "!@#$%^&*(){}[]=-,./<>?;':|`~";
    if (specialCharacterAllowed && numberAllowed)
      str += "!@#$%^&*(){}[]=-,./<>?;':|`~0123456789";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, specialCharacterAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, specialCharacterAllowed]);

  return (
    <>
      <div className="max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="w-full py-1 px-3"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwrodRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-700 text-white px-3"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="range"
              max={100}
              min={6}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label> Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="checkbox"
              defaultChecked={specialCharacterAllowed}
              onChange={() => setSpecialCharacterAllowed((prev) => !prev)}
            />
            <label>Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
