'use client';

import { useState, useCallback } from 'react';
import { PencilIcon, LightBulbIcon, DocumentDuplicateIcon, /* ... other imports ... */ } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import WhyUseOurAITextGenerator from '../../../components/WhyUseOurAITextGenerator';
import FrequentlyAskedQuestions from '../../../components/FrequentlyAskedQuestions';

export default function Home() {
    const t = useTranslations('AITextGenerator');
    const th = useTranslations('Index');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);

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
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center">{t('title')}</h1>
            <h2 className="text-xm text-center mb-4">
                <p className="py-6 font-mono">
                    {th('heroP')}<br /> {th('heroP2')}
                </p>
            </h2>
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
                                    disabled={isGenerating || !inputText}
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
                                ) : (
                                    outputText.split('\n').map((line, lineIndex) => (
                                        <p key={lineIndex}>
                                            {line.split(' ').map((word, wordIndex) => (
                                                <span key={`${lineIndex}-${wordIndex}`} className="inline-block mr-1 mb-1 animate-fade-in">
                                                    {word}
                                                </span>
                                            ))}
                                        </p>
                                    ))
                                )}
                            </div>
                            <div className="card-actions justify-end">
                                <div className="tooltip" data-tip={isCopied ? t('copied') : t('copy')}>
                                    <button
                                        id="copyBtn"
                                        className="btn btn-secondary"
                                        onClick={handleCopy}
                                        disabled={isGenerating || !outputText}
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
            <WhyUseOurAITextGenerator />
            <FrequentlyAskedQuestions />
        </div>
    );
}