import React, { useState, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SelectBox = ({ id, value, option, name, onChange, className }) => {
  const [select, setSelect] = useState();
  const [active, setActive] = useState(false);
  const selectRef = useRef(null);

  return (
    <>
      <select
        ref={selectRef}
        id={id}
        name={name}
        value={select ? select.value : value}
        onChange={(e) => {
          onChange(e);
        }}
        className={"hidden"}
      >
        {option.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <div className={"relative text-[18px] " + className}>
        <div
          className={`flex items-center justify-between w-full px-3 font-light h-[64px] border rounded-md focus:outline-none bg-white placeholder-[#A3A3A3] cursor-default ${
            active ? "border-[#434343]" : ""
          }`}
          onClick={() => {
            setActive(!active);
          }}
        >
          {select ? select.name : option[0]?.name}
          <IoIosArrowDown />
        </div>
        {active && (
          <ul className="absolute left-0 top-full w-full max-h-[252px] bg-white border border-[#434343] rounded-md mt-1 overflow-auto">
            {option.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelect(item);
                  setActive(false);
                  const event = new Event("change", { bubbles: true });
                  selectRef.current.dispatchEvent(event);
                }}
                className="flex items-center h-[40px] px-3 hover:bg-[#F3F3F3] hover:text-[#324580]"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SelectBox;
