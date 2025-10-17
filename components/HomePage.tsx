import React from 'react';
import { TrainingProcess, SiteConfig } from '../types';
import * as Icons from '../data';

const iconComponents: { [key: string]: React.FC } = {
    SafetyIcon: Icons.SafetyIcon,
    MachineOperationIcon: Icons.MachineOperationIcon,
    QualityControlIcon: Icons.QualityControlIcon,
    LogisticsIcon: Icons.LogisticsIcon,
    FireSafetyIcon: Icons.FireSafetyIcon,
};

const ProcessCard: React.FC<{
    process: TrainingProcess;
    onSelect: (id: string) => void;
    lang: 'vi' | 'th';
}> = ({ process, onSelect, lang }) => {
    const IconComponent = iconComponents[process.icon];
    return (
        <button
            onClick={() => onSelect(process.id)}
            className="bg-gray-800/50 hover:bg-gray-800/80 p-6 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
            {IconComponent && <IconComponent />}
            <h3 className="text-xl font-bold text-gray-100 mb-2">{process.title[lang]}</h3>
            <p className="text-gray-400 text-sm">{process.description[lang]}</p>
        </button>
    );
};


interface HomePageProps {
    processes: TrainingProcess[];
    onSelectProcess: (processId: string) => void;
    siteConfig: SiteConfig;
    lang: 'vi' | 'th';
}

const HomePage: React.FC<HomePageProps> = ({ processes, onSelectProcess, siteConfig, lang }) => {
    return (
        <div className="animate-fade-in">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">{siteConfig.title[lang]}</h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">{siteConfig.subtitle[lang]}</p>
            </header>
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {processes.map(process => (
                        <ProcessCard key={process.id} process={process} onSelect={onSelectProcess} lang={lang} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomePage;
