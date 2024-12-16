import React, { useState } from 'react';

const RadioGroup = ({ options, groupName }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log('Selected option:', event.target.value);
    };

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
                        onChange={handleChange}
                    />
                </label>
            ))}
        </div>
    );
};

export default RadioGroup;