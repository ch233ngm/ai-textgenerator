import { Link } from 'next-view-transitions';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export default function LandingContent() {
    return (
        <>
            <div className="min-h-screen text-neutral-content relative pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32"
                style={{
                    backgroundImage: "url(/static/images/feat.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "top"
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-100 pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 px-4 text-center font-['Prompt','Sarabun',sans-serif] font-medium md:font-extrabold italic">
                    AI Text Features
                </h2>
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8 xl:space-x-16 mt-8 sm:mt-12 md:mt-16 px-4">
                    <div className="card w-full max-w-sm lg:w-96 shadow-xl" style={{ backgroundColor: 'rgba(10,8,8,.3)', backdropFilter: 'blur(8px)' }}>
                        <div className="card-body p-4 sm:p-6">
                            <Link href="/ai-text-generator" className="card-title font-['Prompt','Sarabun',sans-serif] text-xl sm:text-2xl mb-2 sm:mb-4 text-white hover:text-blue-300 transition-colors duration-300 flex items-center">
                                <h2>AI Text Generator</h2>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                            </Link>
                            <p className="text-gray-200 text-sm sm:text-base lg:text-lg font-['Prompt','Sarabun',sans-serif]">
                                Our AI Text Generator creates high-quality, coherent text on any topic. It's perfect for blog posts, product descriptions, or creative writing. This tool understands context, maintains consistency, and adapts to various writing styles, boosting productivity for content creators, marketers, and writers.
                            </p>
                        </div>
                    </div>
                    <div className="card w-full max-w-sm lg:w-96 shadow-xl" style={{ backgroundColor: 'rgba(10,8,8,.3)', backdropFilter: 'blur(8px)' }}>
                        <div className="card-body p-4 sm:p-6">
                            <Link href="/ai-response-generator" className="card-title font-['Prompt','Sarabun',sans-serif] text-xl sm:text-2xl mb-2 sm:mb-4 text-white hover:text-blue-300 transition-colors duration-300 flex items-center">
                                <h2>AI Response Generator</h2>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                            </Link>
                            <p className="text-gray-200 text-sm sm:text-base lg:text-lg font-['Prompt','Sarabun',sans-serif]">
                                The AI Response Generator provides intelligent, context-aware responses to queries or prompts. Ideal for chatbots and customer service systems, it understands language nuances and maintains a conversational tone. Enhance your communication efficiency with this powerful tool.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}