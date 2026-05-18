import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../translations';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const languages: { code: Language; name: string }[] = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
    ];

    return (
        <div className="flex flex-col items-center space-y-3">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-xs font-mono font-bold transition-all ${language === lang.code
                        ? 'text-cyan-400 scale-110'
                        : 'text-slate-400 hover:text-cyan-400 hover:translate-y-1 hover:scale-105'
                        }`}
                    aria-label={`Switch to ${lang.name}`}
                    title={lang.name}
                >
                    {lang.code.toUpperCase()}
                </button>
            ))}
        </div>
    );
};
