"use client";

import React from "react";

const RightView = () => {
  return (
    <div className="flex-[2] pl-0 pr-0 rounded-lg h-full">
      <div className="flex flex-col gap-2 p-0 h-full">
        <div className="bg-[#BFB7B6] flex-1 w-full rounded-lg flex items-center justify-center">
          <h2 className="text-black">Box 1</h2>
        </div>
        <div className="bg-[#BFB7B6] flex-1 w-full rounded-lg flex items-center justify-center">
          <h2 className="text-black">Box 2</h2>
        </div>
        <div className="bg-[#BFB7B6] flex-[1.5] w-full rounded-lg flex items-center justify-center">
          <h2 className="text-black">Box 3</h2>
        </div>
      </div>
    </div>
  );
};

export default RightView;