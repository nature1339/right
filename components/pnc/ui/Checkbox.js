import { FaCheck } from "react-icons/fa6";
import React, { useState } from "react";

const Checkbox = ({ id, onChange }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="hidden"
        onChange={(e) => {
          setActive(!active);
          onChange(e);
        }}
      />
      <div
        className={`w-[20px] h-[20px] border rounded-[4px] border-solid ${
          active ? "bg-[#324580] border-[#324580]" : "bg-white border-[#C3C3C3]"
        }`}
      >
        <div className="w-full h-full flex justify-center items-center">
          <FaCheck color="#fff" size={12} />
        </div>
      </div>
    </>
  );
};

export default Checkbox;
