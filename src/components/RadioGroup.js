import React, { useRef } from 'react';

const RadioGroup = ({ options, groupName, selectedOption, onChange }) => {

    const lastOptionRef = useRef(null);
    const handleClick = (option) => {
        if (lastOptionRef.current === option) {
            // 如果点击的是同一个选项，取消选择
            onChange(null);
            lastOptionRef.current = null;
        } else {
            // 否则，选择新的选项
            onChange(option);
            lastOptionRef.current = option;
        }
    }

    return (
        <div className="flex flex-wrap -mx-2 py-2">
            {options.map((option, index) => (
                <label key={index} className="flex items-center px-2 mb-2 cursor-pointer pl-3 py-2 mr-2  border border-gray-300 rounded-full">
                    <span className="label-text mr-2 text-xm text-gray-500">{option}</span>
                    <input
                        type="radio"
                        name={groupName}
                        value={option}
                        className="radio checked:bg-blue-500"
                        checked={selectedOption === option}
                        onChange={() => {}} // 保留空的 onChange 以避免 React 警告
                        onClick={() => handleClick(option)}
                    />
                </label>
            ))}
        </div>
    );
};

export default RadioGroup;