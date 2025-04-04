'use client';

import React, { useState, useEffect } from 'react';
import RadioGroup from '@/components/RadioGroup';
import AIResponseChat from '@/components/AIResponsechat';
export default function AIResponseGenerator() {
    const [selectedScene, setSelectedScene] = useState('');
    const [selectedCounterpart, setSelectedCounterpart] = useState('');
    const sceneOptions = [
        'Professional',
        'Friendly',
        'Formal',
        'Casual',
        'Empathetic',
        'Assertive',
        'Apologetic',
        'Appreciative',
        'Humorous'
    ];

    const counterpartOptions = [
        'Friend',
        'Partner',
        'Colleague',
        'Lover',
        'Family',
        'Superior',
        'Stakeholder'
    ];

    const [rangeValue, setRangeValue] = useState(30);
    const [isGenerating, setIsGenerating] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    const [reply, setReply] = useState("I hate you!");
    const [inputText, setInputText] = useState('');
    const handleRangeChange = (value) => {
        setRangeValue(value);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setReply(null);
        let requestData = {
            message: inputText,
            responseLength: rangeValue,
            counterpart: selectedCounterpart === 'Superior' ? 'staff' : selectedCounterpart,   
            scence : selectedScene,
        }
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/airesponsegenerator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            setTimeout(() => setIsGenerating(false), 2000); 

            const data = await result.json();
            if (!data?.response) {
                setIsGenerating(false);
                setReply("Sorry, I can't generate a response right now. Please try again later.");
                return;
            } else {
                setReply(data.response);
                setIsGenerating(false);
            }
        } catch (error) {
            setIsGenerating(false);
            setReply("Sorry, I can't generate a response right now. Please try again later.");
        }
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
                    <div className='md:max-h-[calc(100vh-var(--navbar-height)-8rem)] px-3 pb-4' style={{overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none'}} onScroll={(e) => e.target.style.setProperty('--scroll', `${e.target.scrollTop}`)}>
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
                                placeholder="Enter your message here. For example: 'Thank you for your email regarding the project update. I've reviewed the changes and have a few questions about the timeline. Could we schedule a brief call to discuss this further?'"
                                onChange={(e) => {
                                    setMessageLength(e.target.value.length);
                                    setInputText(e.target.value);
                                }}
                                value={inputText}
                                maxLength={2000}
                            ></textarea>
                        </label>

                        <div className='pt-4 pb-2'>
                            <span className='font-bold'>Scene</span>
                            <span className='text-gray-400 text-sm'>&nbsp;(optional)</span>
                        </div>
                        <RadioGroup
                            options={sceneOptions}
                            groupName={'response1'}
                            selectedOption={selectedScene}
                            onChange={(value) => setSelectedScene(value)}
                        />
                        <div className="divider"></div>
                        <div className=''>
                            <span className='font-bold'>Counterpart</span>
                            <span className='text-gray-400 text-sm'>&nbsp;(optional)</span>
                        </div>
                        <RadioGroup
                            options={counterpartOptions}
                            groupName={'response2'}
                            selectedOption={selectedCounterpart}
                            onChange={(value) => {setSelectedCounterpart(value);
                            }}
                        />
                        <div className="divider  divider-secondary"></div>
                        <div className='pb-4 flex items-center justify-between'>
                            <span className='font-bold'>Response Length Limit</span>
                            <input
                                type="text"
                                value={rangeValue}
                                onChange={(e) => handleRangeChange(e.target.value)}
                                size={rangeValue.toString().length}
                                className="input input-bordered input-info input-xs ml-2 max-w-[40px] text-center"
                            />
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="200"
                            defaultValue="30"
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
                        <AIResponseChat reply={reply} counterpart={selectedCounterpart} inputText={inputText}/>
                    )}
                </div>
            </div>
        </div>
    );
}
