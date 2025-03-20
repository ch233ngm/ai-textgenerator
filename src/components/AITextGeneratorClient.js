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
    const [userStats, setUserStats] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);

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
            // 接口响应示例
            //{"success":true,"message":"用户统计数据已更新","stats":{"total":2,"daily":2}}
            const data = await result.json();
            return data.stats; // 返回统计数据

        } catch (error) {
            // 埋点失败不影响主流程
            return null;
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
        const stats = await trackUserAction('text_gen');
        setUserStats(stats);
        
        // 检查用户是否超过每日限制
        if (stats && stats.daily > 3) {
            setIsGenerating(false);
            setShowShareModal(true);
            return;
        }

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

    // 生成分享链接
    const generateShareLink = () => {
        const baseUrl = window.location.origin;
        return `${baseUrl}?ref=${session?.user?.email || 'unknown'}`;
    };

    // 处理分享操作
    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(generateShareLink());
            alert(t('linkCopied'));
            
            // 记录分享行为并获得额外次数
            const updatedStats = await trackUserAction('share_link');
            setUserStats(updatedStats);
            setShowShareModal(false);
        } catch (error) {
            console.error("分享失败:", error);
        }
    };

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
            
            {/* 显示用户剩余次数 */}
            {userStats && (
                <div className="text-sm text-gray-600 mb-2">
                    {t('remainingDaily')}: {Math.max(0, 3 - userStats.daily)}/3
                </div>
            )}
            
            {/* 分享模态框 */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md">
                        <h3 className="text-lg font-bold mb-4">{t('shareToGetMore')}</h3>
                        <p className="mb-4">{t('shareDescription')}</p>
                        <div className="flex justify-end gap-2">
                            <button 
                                className="btn btn-outline" 
                                onClick={() => setShowShareModal(false)}
                            >
                                {t('cancel')}
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={handleShare}
                            >
                                {t('share')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}