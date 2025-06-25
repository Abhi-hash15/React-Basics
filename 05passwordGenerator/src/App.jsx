import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '@#*-_';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-orange-400">
      <div className="w-full max-w-md shadow-xl rounded-2xl px-6 py-6 bg-gray-900 border border-gray-700">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          🔐 Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-6 border border-gray-700">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-2 text-lg bg-gray-800 text-orange-300 outline-none"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 transition-all"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          {/* Length */}
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-sm font-medium">
              Length: <span className="text-white font-semibold">{length}</span>
            </label>
            <input
              type="range"
              id="length"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-2/3 accent-blue-500"
            />
          </div>

          {/* Numbers */}
          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-sm font-medium">
              Include Numbers
            </label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="h-4 w-4 accent-orange-500"
            />
          </div>

          {/* Special Characters */}
          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="text-sm font-medium">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="h-4 w-4 accent-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
