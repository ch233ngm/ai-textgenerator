'use client';

import React, { useState, useEffect } from 'react';
import RadioGroup from '@/components/RadioGroup';
import AIResponseChat from '@/components/AIResponsechat';
export default function AIResponseGenerator() {
    const sceneOptions = [
        'Professional',
        'Friendly',
        'Formal',
        'Casual',
        'Empathetic',
        'Assertive',
        'Apologetic',
        'Appreciative',
        'Informative'
    ];

    const counterpartOptions = [
        'Friends',
        'Customers',
        'Colleagues',
        'Partner',
        'Family',
        'Superiors',
        'Stakeholders',
        "Others"
    ];

    const [rangeValue, setRangeValue] = useState(30);
    const [isGenerating, setIsGenerating] = useState(false);
    const [messageLength, setMessageLength] = useState(0);

    const handleRangeChange = (value) => {
        const newValue = Math.min(Math.max(parseInt(value) || 20, 20), 500);
        setRangeValue(newValue);
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // 这里添加生成响应的逻辑
        // 获取用户输入的数据
        let requestData = {
            message: inputText,
            responseLength: rangeValue,
            counterpart: counterpart,
            scence : scence,
        }
        // 完成后，记得设置 setIsGenerating(false)
        setTimeout(() => setIsGenerating(false), 2000); // 模拟生成响应的假设
    };

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const height = navbar.offsetHeight;
                document.documentElement.style.setProperty('--navbar-height', `${height}px`);
            }
        };

        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);

        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
        };

    }, []);



    return (
        <div className="min-h-[calc(100vh-var(--navbar-height))] py-4 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-row md:flex-col">
            <div className="flex-grow md:flex">
                <div className="card bg-base-100 rounded-box flex-grow md:flex-[4] flex p-4 sm:p-6 lg:p-8 relative">
                    <div className='max-h-[calc(100vh-var(--navbar-height)-8rem)] px-3' style={{overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none'}} onScroll={(e) => e.target.style.setProperty('--scroll', `${e.target.scrollTop}`)}>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text font-bold">Message</span>
                                <span className="label-text-alt text-gray-400">{messageLength}/2000</span>
                            </div>
                            <textarea 
                                className="textarea textarea-bordered h-32 placeholder-gray-400 textarea-secondary no-scrollbar"
                                style={{
                                    overflowY: 'auto',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'rgba(155, 155, 155, 0.1) transparent'
                                }}
                                placeholder="Example: I'm thrilled with the recent updates to your software. It has significantly improved my workflow, and I appreciate the new features. However, I noticed a small bug when trying to export data. Could this be looked into?"
                                onChange={(e) => setMessageLength(e.target.value.length)}
                                maxLength={2000}
                            ></textarea>
                        </label>

                        <div className='pt-4 pb-2'>
                            <span className='font-bold'>Scene</span>
                            <span className='text-gray-400 text-sm'>&nbsp;(optional)</span>
                        </div>
                        <RadioGroup options={sceneOptions} groupName={'response1'}/>
                        <div className="divider"></div>
                        <div className=''>
                            <span className='font-bold'>Counterpart</span>
                            <span className='text-gray-400 text-sm'>&nbsp;(optional)</span>
                        </div>
                        <RadioGroup options={counterpartOptions} groupName={'response2'}/>
                        <div className="divider  divider-secondary"></div>
                        <div className='pb-4 flex items-center justify-between'>
                            <span className='font-bold'>Response Length</span>
                            <input
                                type="text"
                                value={rangeValue}
                                onChange={(e) => handleRangeChange(e.target.value)}
                                size={rangeValue.toString().length}
                                className="input input-bordered input-info input-xs ml-2 min-w-[40px] text-center"
                            />
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="500"
                            defaultValue="50"
                            className="range range-info"
                            onChange={(e) => handleRangeChange(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary btn-sm absolute bottom-0 right-0"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                        clipRule="evenodd" />
                                </svg>
                                Generate
                            </>
                        )}
                    </button>
                </div>
                <div className="divider md:divider-horizontal"></div>
                <div className="card bg-base-100 rounded-box flex-grow md:flex-[7] flex items-start p-4 h-[calc(100vh-var(--navbar-height)-2rem)] overflow-y-auto">
                {isGenerating?(
                    <div className="flex w-full flex-col gap-4">
                        <div className="skeleton h-40 w-full"></div>
                        <div className="skeleton h-5 w-3/4"></div>
                        <div className="skeleton h-5 w-5/6"></div>
                        <div className="skeleton h-5 w-full"></div>
                        <div className="skeleton h-5 w-2/3"></div>
                    </div>) : (
                        // 这里添加生成的响应的 UI
                        // 完成后，记得返回 JSX
                        <AIResponseChat/>
                    )}
                </div>
            </div>
        </div>
    );
}
