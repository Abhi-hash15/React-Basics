import { useState } from "react";

function App() {
  const [color, setColor] = useState("bg-emerald-600");

  const colors = [
    { name: "Red", class: "bg-red-600" },
    { name: "Green", class: "bg-green-600" },
    { name: "Blue", class: "bg-blue-600" },
    { name: "Purple", class: "bg-purple-700" },
    { name: "Orange", class: "bg-orange-500" },
    { name: "Pink", class: "bg-pink-500" },
    { name: "Teal", class: "bg-teal-500" },
    { name: "Yellow", class: "bg-yellow-400", textColor: "text-black" },
  ];

  return (
    <div className={`w-full h-screen duration-300 ${color}`}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-4">
        <div className="flex flex-wrap justify-center gap-4 shadow-2xl bg-white/90 backdrop-blur-md px-5 py-4 rounded-full border border-gray-200">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.class)}
              className={`px-5 py-2 rounded-full shadow-md font-semibold hover:scale-105 transition-transform duration-150 ${
                c.class
              } ${c.textColor || "text-white"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
