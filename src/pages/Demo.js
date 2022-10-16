import React from "react";
import chatImage from "../assets/chatImage.jpg";

const Demo = () => {
  return (
    <div className="bg-secondary lg:mx-0 lg:mr-6 mx-6 rounded h-[calc(100vh_-_64px)]  overflow-hidden">
      <div className=" box-border text-5xl flex items-center overflow-hidden fixed center">
        <div className="animate">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <div className="text-info whitespace-nowrap inline-flex items-center justify-center">
              || NEW FEATURES COMING SOON&nbsp;
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center pt-16 ">
        <img className="lg:w-1/2" src={chatImage} alt="chatImage" />
      </div>
    </div>
  );
};

export default Demo;
