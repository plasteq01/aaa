import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/HomePage';
import VideoCarousel from './components/VideoCarousel';
import LiveEditor from './components/LiveEditor';
import PasswordPrompt from './components/PasswordPrompt';
import { trainingData as initialTrainingData } from './data';
import { SiteConfig, TrainingProcess } from './types';

// The handle for the editor component to trigger save externally
export interface EditorHandle {
    saveChanges: () => void;
}

// Initial Site Configuration
const initialSiteConfig: SiteConfig = {
    logoUrl: '/logo.png', // A placeholder logo
    title: {
        vi: "Cổng Đào Tạo Nội Bộ",
        th: "พอร์ทัลการฝึกอบรมภายใน"
    },
    subtitle: {
        vi: "Nâng cao kỹ năng, đảm bảo an toàn và chất lượng trong mọi quy trình sản xuất.",
        th: "พัฒนาทักษะ รับรองความปลอดภัยและคุณภาพในทุกกระบวนการผลิต"
    },
    siteName: {
        vi: "Nhà Máy ABC",
        th: "โรงงาน ABC"
    }
};

const App: React.FC = () => {
    // State Management
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig);
    const [trainingData, setTrainingData] = useState<TrainingProcess[]>(initialTrainingData);
    const [currentPage, setCurrentPage] = useState<string>('home');
    const [lang, setLang] = useState<'vi' | 'th'>('vi');
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

    const editorRef = useRef<EditorHandle>(null);

     // Load data from localStorage on initial render
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('trainingPortalData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setSiteConfig(parsedData.siteConfig || initialSiteConfig);
                setTrainingData(parsedData.trainingData || initialTrainingData);
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);


    // Handlers
    const handleSelectProcess = (processId: string) => {
        setCurrentPage(processId);
    };

    const handleGoHome = () => {
        setCurrentPage('home');
    };

    const handleSave = (data: { siteConfig: SiteConfig, trainingData: TrainingProcess[] }) => {
        setSiteConfig(data.siteConfig);
        setTrainingData(data.trainingData);
         try {
            localStorage.setItem('trainingPortalData', JSON.stringify(data));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
        // No alert needed for a smoother UX, especially with single-click save
    };
    
    const handlePasswordSuccess = () => {
        setIsEditing(true);
        setShowPasswordPrompt(false);
    };

    const handleFooterSingleClick = () => {
        if (isEditing) {
            editorRef.current?.saveChanges();
            setIsEditing(false);
        }
    };

    const handleFooterDoubleClick = () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            setShowPasswordPrompt(true);
        }
    };

    const selectedProcess = trainingData.find(p => p.id === currentPage);

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans relative">
            <div className={`fixed top-0 left-0 h-full w-[450px] bg-gray-900/90 backdrop-blur-sm border-r border-gray-700 shadow-2xl z-40 transition-transform duration-500 ease-in-out ${isEditing ? 'translate-x-0' : '-translate-x-full'} hidden lg:block`}>
                 <LiveEditor
                    ref={editorRef}
                    initialSiteConfig={siteConfig}
                    initialTrainingData={trainingData}
                    onSave={handleSave}
                    onClose={() => setIsEditing(false)}
                />
            </div>
             {showPasswordPrompt && (
                <PasswordPrompt 
                    onSuccess={handlePasswordSuccess} 
                    onCancel={() => setShowPasswordPrompt(false)}
                />
            )}
            
            <div className={`transition-all duration-500 ${isEditing ? 'lg:ml-[450px]' : 'ml-0'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                    {/* Page Content */}
                    {selectedProcess ? (
                        <VideoCarousel 
                            process={selectedProcess} 
                            onGoHome={handleGoHome} 
                            lang={lang} 
                        />
                    ) : (
                        <HomePage 
                            processes={trainingData} 
                            onSelectProcess={handleSelectProcess}
                            siteConfig={siteConfig}
                            lang={lang}
                        />
                    )}

                </div>

                 {/* Footer with hidden triggers */}
                <footer 
                    onClick={handleFooterSingleClick}
                    onDoubleClick={handleFooterDoubleClick}
                    className="text-center py-8 border-t border-gray-800 mt-16 cursor-pointer"
                    title="Single-click to save & close editor, Double-click to open editor"
                >
                     <div className="flex justify-center items-center gap-6">
                        <p className="text-gray-500">&copy; {new Date().getFullYear()} {siteConfig.siteName[lang]}. All rights reserved.</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent footer clicks from triggering
                                setLang(lang === 'vi' ? 'th' : 'vi');
                            }}
                            className="px-4 py-2 text-sm rounded-md transition-colors bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            {lang === 'vi' ? 'ไทย' : 'Tiếng Việt'}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default App;