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
          className={`flex items-center justify-between w-full px-[12px] font-light h-[64px] border rounded-md focus:outline-none bg-white placeholder-[#A3A3A3] cursor-default text-[#131313] border-solid ${
            active ? "border-[#434343]" : "border-[#e3e3e3]"
          }`}
          onClick={() => {
            setActive(!active);
          }}
        >
          {select ? select.name : option[0]?.name}
          <IoIosArrowDown />
        </div>
        {active && (
          <ul className="absolute left-0 top-full w-full max-h-[252px] bg-white border border-solid border-[#434343] rounded-md mt-[4px] overflow-auto">
            {option.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setSelect(item);
                  setActive(false);
                  if (selectRef.current) {
                    selectRef.current.value = item.value; // **선택된 값으로 직접 변경**
                    const event = new Event("change", { bubbles: true });
                    selectRef.current.dispatchEvent(event);
                  }
                }}
                className="flex items-center h-[40px] px-[12px] hover:bg-[#F3F3F3] hover:text-[#324580] text-[#131313]"
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
