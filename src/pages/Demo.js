import React from "react";

const Demo = () => {
  return (
    <div className="bg-secondary lg:mx-0 lg:mr-6 mx-6 rounded h-[calc(100vh_-_64px)] ">
      <div className=" box-border py-6 text-6xl flex items-center overflow-hidden fixed center">
        <div className="animate">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <div className="text-info whitespace-nowrap inline-flex items-center justify-center">
              • NEW FEATURES COMING SOON&nbsp;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo;
