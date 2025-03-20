'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { PencilIcon, LightBulbIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Poll from './Poll';
export default function AITextGeneratorClient() {
    
    const { data: session } = useSession();

    

    const t = useTranslations('AITextGenerator');

    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    // 添加埋点函数
    const trackUserAction = async (statType) => {
        if (!session?.user?.email) return;
        
        try {
            const result =await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/user-stats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: session.user.email,
                    statType: statType
                }),
            });
            console.log("打印text", result); 
        } catch (error) {
            // 埋点失败不影响主流程
        }
    };

    const handleGenerate = async () => {
        if (!session) {
            alert("Please login to generate AI text.");
            return;
        }
        
        setIsGenerating(true);
        if (inputText.trim() === '') {
            alert("Please enter some text to generate AI text.");
            setIsGenerating(false);
            return;
        }
        
        // 调用埋点函数记录文本生成行为
        trackUserAction('text_gen');
        
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textPrompt: inputText }),
        });

        const data = await result.json();

        if (!data?.response) {
            alert("AI text generation failed. Please try again later.");
            setIsGenerating(false);
            return;
        }

        
        setIsGenerating(false);


        // AI生成过程
        const words = data.response.split(' ');
        let currentIndex = -1;

        const interval = setInterval(() => {
            if (currentIndex < words.length - 1) {
                setOutputText(prev => prev + (prev ? ' ' : '') + words[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(interval);
                setIsGenerating(false);
            }
        }, 200);
    };

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(outputText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
    }, [outputText]);

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title flex items-center">
                            <PencilIcon className="h-6 w-6 mr-2" />
                            {t('inputText')}
                        </h2>
                        <textarea
                            className="textarea textarea-bordered h-64 w-full"
                            placeholder={t('inputPlaceholder')}
                            value={inputText}
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                {t('generate')}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="font-bold mb-2">{t('example')}:</h3>
                    <p className="text-sm text-gray-600">
                        {t('exampleText')}
                    </p>
                </div>
            </div>
            <div className="flex-1">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title flex items-center">
                            <LightBulbIcon className="h-6 w-6 mr-2" />
                            {t('generatedText')}
                        </h2>
                        <div className="h-64 overflow-y-auto">
                            {isGenerating ? (
                                <div id="myloading">
                                    <span className="loading loading-ring loading-lg"></span>
                                    <span className="loading loading-ring loading-lg"></span>
                                    <span className="loading loading-ring loading-lg"></span>
                                </div>
                            ) : outputText ? (
                                outputText.split('\n').map((line, lineIndex) => (
                                    <p key={lineIndex}>
                                        {line.split(' ').map((word, wordIndex) => (
                                            <span key={`${lineIndex}-${wordIndex}`} className="inline-block mr-1 mb-1 animate-fade-in">
                                                {word}
                                            </span>
                                        ))}
                                    </p>
                                ))
                            ) : (
                                <Poll />
                            )}
                        </div>
                        <div className="card-actions justify-end">
                            <div className="tooltip" data-tip={isCopied ? t('copied') : t('copy')}>
                                <button
                                    id="copyBtn"
                                    className="btn btn-secondary"
                                    onClick={handleCopy}
                                    disabled={isGenerating}
                                >
                                    <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                                    {t('copy')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}