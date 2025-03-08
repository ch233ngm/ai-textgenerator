'use client';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Poll() {
    return (
        <div className="card w-full h-full shadow-xl hover:scale-105 transition-transform duration-300 m-4" 
            style={{ 
                backgroundColor: 'rgba(255,255,255,0.9)', 
                backdropFilter: 'blur(8px)',
                background: 'linear-gradient(135deg, #e6f2ff, #f5f0ff)'
            }}>
            <div className="card-body p-4 sm:p-6">
                <Link 
                    href="https://fas.st/t/U2ssxRR2" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="card-title font-['Prompt','Sarabun',sans-serif] text-xl sm:text-2xl mb-2 sm:mb-4 text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center"
                >
                    <h2>Pollo AI</h2>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                </Link>
                <div className="flex items-center gap-2 mb-4">
                    <span className="badge bg-blue-100 text-blue-600 border-blue-200">Video Generation</span>
                    <span className="badge bg-purple-100 text-purple-600 border-purple-200">Image Generation</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-['Prompt','Sarabun',sans-serif]">
                    ALL the great AI video & image models in ONE place! Try Pollo AI image video generator now!
                </p>
                <div className="card-actions justify-end mt-4">
                    <button 
                        onClick={() => window.open('https://fas.st/t/U2ssxRR2', '_blank')}
                        className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300"
                    >
                        Try Now
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}