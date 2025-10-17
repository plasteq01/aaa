import React, { useState, useEffect, useRef } from 'react';
import { TrainingProcess } from '../types';

interface VideoCarouselProps {
    process: TrainingProcess;
    onGoHome: () => void;
    lang: 'vi' | 'th';
}

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const VideoCarousel: React.FC<VideoCarouselProps> = ({ process, onGoHome, lang }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    const currentVideo = process.videos[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % process.videos.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + process.videos.length) % process.videos.length);
    };

    useEffect(() => {
        const container = thumbnailContainerRef.current;
        if (container) {
            const activeThumbnail = container.children[currentIndex] as HTMLElement;
            if (activeThumbnail) {
                activeThumbnail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [currentIndex]);

    return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in">
            <header className="mb-8">
                <button
                    onClick={onGoHome}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md"
                >
                    <ArrowLeftIcon />
                    {lang === 'vi' ? 'Quay về trang chủ' : 'กลับไปที่หน้าหลัก'}
                </button>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 gradient-text">
                    {process.title[lang]}
                </h1>
                <p className="text-lg text-gray-400">{process.description[lang]}</p>
            </header>

            <main>
                <div className="aspect-video mb-4 shadow-2xl shadow-cyan-500/10 rounded-lg overflow-hidden border border-gray-700">
                    <iframe
                        key={currentVideo.id} // Important for re-mounting and triggering autoplay
                        src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0&cc_lang_pref=${lang}&hl=${lang}`}
                        title={currentVideo.title[lang]}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                <h2 className="text-xl font-semibold mb-6 text-center text-gray-200">{currentVideo.title[lang]}</h2>

                <div className="relative group">
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous video"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <div ref={thumbnailContainerRef} className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar px-12">
                        {process.videos.map((video, index) => (
                            <button
                                key={video.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`flex-shrink-0 w-40 h-24 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 ${
                                    currentIndex === index 
                                    ? 'border-2 border-cyan-400 scale-105 opacity-100' 
                                    : 'opacity-60 scale-95 hover:opacity-100'
                                }`}
                            >
                                <img src={video.thumbnailUrl} alt={video.title[lang]} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                     <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/80 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next video"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </main>
        </div>
    );
};

export default VideoCarousel;