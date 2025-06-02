"use client"
import { useState } from "react";

const Slider = () => {
  const [items, setItems] = useState([
    { id: 1, pos: -2 },
    { id: 2, pos: -1 },
    { id: 3, pos: 0 },
    { id: 4, pos: 1 },
    { id: 5, pos: 2 },
  ]);

  const updatePosition = (newActivePos) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        const diff = item.pos - newActivePos;
        const absDiff = Math.abs(diff);

        let newPos = absDiff > 2 ? -item.pos : diff;
        return { ...item, pos: newPos };
      })
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ul className="relative flex list-none w-full h-[300px] justify-center perspective-[300px]">
        {items.map((item) => (
          <li
            key={item.id}
            data-pos={item.pos}
            onClick={() => updatePosition(item.pos)}
            className={`absolute flex items-center justify-center text-white text-2xl w-[150px] h-[250px] rounded-lg shadow-lg transition-all duration-300 ease-in cursor-pointer
              ${
                item.pos === 0
                  ? "z-10"
                  : item.pos === -1 || item.pos === 1
                  ? "z-5 opacity-70 transform scale-90 blur-[1px] grayscale-[10%]"
                  : "z-1 opacity-40 transform scale-80 blur-[3px] grayscale-[20%]"
              }
              ${
                item.pos === -1
                  ? "-translate-x-[40%]"
                  : item.pos === 1
                  ? "translate-x-[40%]"
                  : item.pos === -2
                  ? "-translate-x-[70%]"
                  : item.pos === 2
                  ? "translate-x-[70%]"
                  : ""
              }
              ${
                item.id === 1
                  ? "bg-gradient-to-br from-blue-700 to-purple-500"
                  : item.id === 2
                  ? "bg-gradient-to-br from-blue-700 to-yellow-400"
                  : item.id === 3
                  ? "bg-gradient-to-br from-blue-700 to-teal-400"
                  : item.id === 4
                  ? "bg-gradient-to-br from-yellow-400 to-purple-500"
                  : "bg-gradient-to-br from-teal-400 to-purple-500"
              }`}
          >
            {item.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
