import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { SiteConfig, TrainingProcess, Video, LocaleString } from '../types';
import * as Icons from '../data';
import { GoogleGenAI } from '@google/genai';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { EditorHandle } from '../App';

const iconNames = Object.keys(Icons);
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface LiveEditorProps {
    initialSiteConfig: SiteConfig;
    initialTrainingData: TrainingProcess[];
    onSave: (data: { siteConfig: SiteConfig, trainingData: TrainingProcess[] }) => void;
    onClose: () => void;
}

const inputClasses = "p-1.5 bg-gray-900 border border-gray-600 rounded-md w-full text-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500";
const textareaClasses = `${inputClasses} min-h-[4rem]`;
const selectClasses = `${inputClasses} appearance-none`;


const LiveEditor = forwardRef<EditorHandle, LiveEditorProps>(({ initialSiteConfig, initialTrainingData, onSave, onClose }, ref) => {
    const [draftSiteConfig, setDraftSiteConfig] = useState<SiteConfig>(JSON.parse(JSON.stringify(initialSiteConfig)));
    const [draftTrainingData, setDraftTrainingData] = useState<TrainingProcess[]>(JSON.parse(JSON.stringify(initialTrainingData)));
    const [isDirty, setIsDirty] = useState(false);
    const [isTranslating, setIsTranslating] = useState<string | null>(null);

    useEffect(() => {
        setDraftSiteConfig(JSON.parse(JSON.stringify(initialSiteConfig)));
        setDraftTrainingData(JSON.parse(JSON.stringify(initialTrainingData)));
        setIsDirty(false);
    }, [initialSiteConfig, initialTrainingData]);

    useImperativeHandle(ref, () => ({
        saveChanges() {
            handleSave();
        }
    }));

    const handleValueChange = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, updater: (draft: T) => void) => {
        setter(prev => {
            const newDraft = JSON.parse(JSON.stringify(prev));
            updater(newDraft);
            return newDraft;
        });
        setIsDirty(true);
    };

    const translateText = async (text: string): Promise<string> => {
        if (!text) return '';
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Translate this Vietnamese text to Thai, keeping the meaning and tone as close as possible. Do not add any extra text or explanations. Text: "${text}"`,
            });
            return response.text.trim();
        } catch (error) {
            console.error('Translation error:', error);
            return 'Translation failed';
        }
    };
    
    // FIX: Correctly handle nested paths for translation, which can contain both strings and numbers.
    const handleTranslate = async (path: (string|number)[], field: 'title' | 'description' | 'siteName' | 'subtitle') => {
        const translationKey = `${path.join('-')}-${field}`;
        setIsTranslating(translationKey);

        // Helper to traverse a path on an object
        const getTarget = (root: any, path: (string|number)[]) => {
            let target = root;
            for (const key of path) {
                if (target === undefined) return undefined;
                target = target[key];
            }
            return target;
        };

        let textToTranslate = '';
        if (path[0] === 'siteConfig') {
            textToTranslate = (draftSiteConfig[field as 'title' | 'subtitle' | 'siteName'] as LocaleString).vi;
        } else {
            const targetObject = getTarget(draftTrainingData, path);
            if (targetObject && (field === 'title' || field === 'description')) {
                 textToTranslate = (targetObject[field] as LocaleString).vi;
            }
        }
       
        if (!textToTranslate) {
            setIsTranslating(null);
            console.warn("No text to translate for path", path, "and field", field);
            return;
        }

        try {
            const translated = await translateText(textToTranslate);
            if (path[0] === 'siteConfig') {
                 handleValueChange(setDraftSiteConfig, d => {
                    (d[field as 'title' | 'subtitle' | 'siteName'] as LocaleString).th = translated;
                });
            } else {
                handleValueChange(setDraftTrainingData, draft => {
                    const targetObject = getTarget(draft, path);
                    if (targetObject && (field === 'title' || field === 'description')) {
                        (targetObject[field] as LocaleString).th = translated;
                    }
                });
            }
        } finally {
            setIsTranslating(null);
        }
    };
    
    const handleSave = () => {
        onSave({ siteConfig: draftSiteConfig, trainingData: draftTrainingData });
        setIsDirty(false);
    };

    const handleDiscard = () => {
        setDraftSiteConfig(JSON.parse(JSON.stringify(initialSiteConfig)));
        setDraftTrainingData(JSON.parse(JSON.stringify(initialTrainingData)));
        setIsDirty(false);
        onClose();
    };

    const handleAddProcess = () => {
        handleValueChange(setDraftTrainingData, draft => {
            const newId = `p${Date.now()}`;
            draft.push({
                id: newId,
                title: { vi: 'Quy trình mới', th: 'กระบวนการใหม่' },
                description: { vi: 'Mô tả ngắn cho quy trình mới.', th: 'คำอธิบายสั้น ๆ สำหรับกระบวนการใหม่' },
                icon: 'SafetyIcon',
                videos: [],
            });
        });
    };

    const handleDeleteProcess = (processId: string) => {
        handleValueChange(setDraftTrainingData, draft => {
            const index = draft.findIndex(p => p.id === processId);
            if (index > -1) draft.splice(index, 1);
        });
    };

    const handleAddVideo = (processId: string) => {
        handleValueChange(setDraftTrainingData, draft => {
            const process = draft.find(p => p.id === processId);
            if (process) {
                process.videos.push({
                    id: 'dQw4w9WgXcQ', // Default video
                    title: { vi: 'Video mới', th: 'วิดีโอใหม่' },
                    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
                });
            }
        });
    };

    const handleDeleteVideo = (processId: string, videoIndex: number) => {
        handleValueChange(setDraftTrainingData, draft => {
            const process = draft.find(p => p.id === processId);
            if (process) {
                process.videos.splice(videoIndex, 1);
            }
        });
    };
    
    const handleExport = async () => { /* ... Full export logic from previous version ... */ };


    return (
        <div className="h-full flex flex-col text-sm text-gray-300">
            {isDirty && (
                <div className="p-3 bg-yellow-900/50 flex justify-between items-center border-b border-yellow-700">
                    <span className="font-bold text-yellow-300">Bạn có thay đổi chưa lưu!</span>
                    <div className="flex gap-2">
                        <button onClick={handleDiscard} className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500">Hủy</button>
                        <button onClick={handleSave} className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500">Lưu Dữ Liệu</button>
                    </div>
                </div>
            )}
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                 <h2 className="text-xl font-bold gradient-text">Live Editor</h2>
                 <button onClick={onClose} className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-xs">Close</button>
            </div>
            
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {/* General Settings */}
                <details open className="bg-gray-800/50 p-3 rounded-md">
                    <summary className="font-bold cursor-pointer text-base">Cài đặt chung</summary>
                     <div className="mt-4 space-y-3">
                        {/* Site Title */}
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Tiêu đề trang</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input value={draftSiteConfig.title.vi} onChange={e => handleValueChange(setDraftSiteConfig, d => { d.title.vi = e.target.value })} onBlur={() => handleTranslate(['siteConfig'], 'title')} className={inputClasses} />
                                <input value={draftSiteConfig.title.th} onChange={e => handleValueChange(setDraftSiteConfig, d => { d.title.th = e.target.value })} className={inputClasses} />
                            </div>
                        </div>
                        {/* Subtitle */}
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Phụ đề</label>
                            <div className="grid grid-cols-2 gap-2">
                                <textarea value={draftSiteConfig.subtitle.vi} onChange={e => handleValueChange(setDraftSiteConfig, d => { d.subtitle.vi = e.target.value })} onBlur={() => handleTranslate(['siteConfig'], 'subtitle')} rows={2} className={textareaClasses} />
                                <textarea value={draftSiteConfig.subtitle.th} onChange={e => handleValueChange(setDraftSiteConfig, d => { d.subtitle.th = e.target.value })} rows={2} className={textareaClasses} />
                            </div>
                        </div>
                        {/* Site Name */}
                         <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Tên trang (Footer)</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input value={draftSiteConfig.siteName.vi} onChange={e => handleValueChange(setDraftSiteConfig, d => { d.siteName.vi = e.target.value })} onBlur={() => handleTranslate(['siteConfig'], 'siteName')} className={inputClasses} />
                                <input value={draftSiteConfig.siteName.th} onChange={e => handleValueChange(setDraftSiteConfig, d => { d.siteName.th = e.target.value })} className={inputClasses} />
                            </div>
                        </div>
                    </div>
                </details>

                {/* Training Processes */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-base">Quy trình đào tạo</h3>
                        <button onClick={handleAddProcess} className="px-3 py-1 rounded bg-cyan-700 hover:bg-cyan-600 text-xs">+ Thêm Quy Trình</button>
                    </div>
                    {draftTrainingData.map((process, pIndex) => (
                        <details key={process.id} className="bg-gray-800/50 p-3 rounded-md">
                            <summary className="font-bold cursor-pointer text-sm flex justify-between items-center">
                                <span>{process.title.vi || 'Quy trình mới'}</span>
                                <button onClick={(e) => { e.preventDefault(); handleDeleteProcess(process.id); }} className="px-2 py-0.5 text-xs bg-red-800 hover:bg-red-700 rounded">Xóa</button>
                            </summary>
                            <div className="mt-4 border-t border-gray-700 pt-4 space-y-3">
                                {/* Process Title, Desc, Icon */}
                                <div className="grid grid-cols-2 gap-2">
                                    <input placeholder="Tiêu đề (VI)" value={process.title.vi} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].title.vi = e.target.value })} onBlur={() => handleTranslate([pIndex], 'title')} className={inputClasses} />
                                    <input placeholder="Tiêu đề (TH)" value={process.title.th} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].title.th = e.target.value })} className={inputClasses} />
                                    <textarea placeholder="Mô tả (VI)" value={process.description.vi} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].description.vi = e.target.value })} onBlur={() => handleTranslate([pIndex], 'description')} rows={2} className={textareaClasses}/>
                                    <textarea placeholder="Mô tả (TH)" value={process.description.th} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].description.th = e.target.value })} rows={2} className={textareaClasses}/>
                                </div>
                                <select value={process.icon} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].icon = e.target.value })} className={selectClasses}>
                                    {iconNames.map(name => <option key={name} value={name}>{name}</option>)}
                                </select>
                                {/* Videos */}
                                <div className="space-y-2">
                                     <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-xs text-gray-400">Videos</h4>
                                        <button onClick={() => handleAddVideo(process.id)} className="px-2 py-0.5 rounded bg-cyan-800 hover:bg-cyan-700 text-xs">+ Thêm Video</button>
                                    </div>
                                    {process.videos.map((video, vIndex) => (
                                         <div key={vIndex} className="p-2 bg-gray-900/50 rounded grid grid-cols-2 gap-2">
                                             <input value={video.title.vi} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].videos[vIndex].title.vi = e.target.value })} onBlur={() => handleTranslate([pIndex, 'videos', vIndex], 'title')} placeholder="Video Title (VI)" className={`${inputClasses} col-span-1`} />
                                             <input value={video.title.th} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].videos[vIndex].title.th = e.target.value })} placeholder="Video Title (TH)" className={`${inputClasses} col-span-1`}/>
                                             <input value={video.id} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].videos[vIndex].id = e.target.value })} placeholder="YouTube ID" className={`${inputClasses} col-span-1`} />
                                             <input value={video.thumbnailUrl} onChange={e => handleValueChange(setDraftTrainingData, d => { d[pIndex].videos[vIndex].thumbnailUrl = e.target.value })} placeholder="Thumbnail URL" className={`${inputClasses} col-span-1`} />
                                              <button onClick={() => handleDeleteVideo(process.id, vIndex)} className="col-span-2 text-xs bg-red-900 hover:bg-red-800 rounded py-1">Xóa Video</button>
                                         </div>
                                    ))}
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
                {/* Export section could be added here */}
            </div>
        </div>
    );
});

export default LiveEditor;