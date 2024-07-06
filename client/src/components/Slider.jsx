import { useState } from "react";
import { FaRunning, FaDumbbell } from "react-icons/fa";
import {IoIosFootball, IoIosBicycle } from "react-icons/io";
import {PiBeerStein} from "react-icons/pi";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";


const Sliders = () => { 
  //json-data icons hardcode - temporarily
  const activityData = [
    { icon: <FaRunning  />, name: "Running" },
    { icon: <IoIosFootball />, name: "Fútbol" },
    { icon: <FaDumbbell />, name: "Gimnasio" },
    { icon: <PiBeerStein />, name: "Cerveceria" },
    { icon: <IoIosBicycle  />, name: "Ciclismo" },
  ];

  const [currentIcons, setCurrentIcons] = useState(activityData);

  const showNextIcon = () => {
    setCurrentIcons((prevIcon) => {
      return [...prevIcon.slice(1), prevIcon[0]]
    });
  }

  const showPreviousIcon = () => {
    setCurrentIcons((prevIcon) => {
      return [prevIcon[prevIcon.length - 1], ...prevIcon.slice(0, prevIcon.length -1 )];
    })
  }

  return (
    <>
    <div className="bg-[#fff] w-full py-2 flex items-center justify-center my-2">
      <BsArrowLeftCircle className="text-xl cursor-pointer opacity-70 m-2" onClick={showPreviousIcon} />
      <div className="flex space-x-10 ml-12 mr-12">
      {currentIcons.map((act, i) => (
          <div
            key={i}
            className="flex flex-col items-center opacity-60 font-bold cursor-pointer">
            {act.icon}
            <span className="text-sm font-semibold opacity-80 my-1">{act.name}</span>
          </div>
        ))}
      </div>
      <BsArrowRightCircle className="text-xl cursor-pointer opacity-70 mr-8" onClick={showNextIcon} />
    </div>
    </>
  );
};
export default Sliders;