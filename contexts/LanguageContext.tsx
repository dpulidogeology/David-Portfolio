import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('es');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Detect language with priority: URL param > geolocation > localStorage
        const initializeLanguage = async () => {
            try {
                // 1. Check URL parameter (?lang=es) - explicit user choice
                const params = new URLSearchParams(window.location.search);
                const urlLang = params.get('lang') as Language | null;

                if (urlLang && ['es', 'en', 'fr', 'de'].includes(urlLang)) {
                    setLanguageState(urlLang);
                    localStorage.setItem('preferred_language', urlLang);
                    setIsLoading(false);
                    return;
                }

                // 2. Detect language based on geolocation (updated IP/VPN)
                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();
                    const countryCode = data.country_code;

                    // Latin America and Spain - Spanish
                    const spanishCountries = [
                        'CO', // Colombia
                        'AR', // Argentina
                        'BR', // Brazil
                        'CL', // Chile
                        'EC', // Ecuador
                        'PE', // Peru
                        'VE', // Venezuela
                        'BO', // Bolivia
                        'PY', // Paraguay
                        'UY', // Uruguay
                        'CR', // Costa Rica
                        'CU', // Cuba
                        'DO', // Dominican Republic
                        'SV', // El Salvador
                        'GT', // Guatemala
                        'HN', // Honduras
                        'MX', // Mexico
                        'NI', // Nicaragua
                        'PA', // Panama
                        'PR', // Puerto Rico
                        'ES', // Spain
                    ];

                    // French speaking countries
                    const frenchCountries = [
                        'FR', // France
                    ];

                    // German speaking countries
                    const germanCountries = [
                        'DE', // Germany
                        'AT', // Austria
                        'CH', // Switzerland
                    ];

                    let detectedLanguage: Language = 'en';

                    if (spanishCountries.includes(countryCode)) {
                        detectedLanguage = 'es';
                    } else if (frenchCountries.includes(countryCode)) {
                        detectedLanguage = 'fr';
                    } else if (germanCountries.includes(countryCode)) {
                        detectedLanguage = 'de';
                    }

                    setLanguageState(detectedLanguage);
                    localStorage.setItem('preferred_language', detectedLanguage);
                    setIsLoading(false);
                    return;
                } catch (geoError) {
                    console.warn('Geolocation detection failed, falling back to navigator.language:', geoError);
                }

                // 3. Use browser/device language setting (works on mobile without network)
                try {
                    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || '';
                    const langPrefix = browserLang.toLowerCase().split('-')[0];
                    const regionSuffix = browserLang.toLowerCase().split('-')[1] || '';

                    let browserDetected: Language = 'en';
                    if (langPrefix === 'es') {
                        browserDetected = 'es';
                    } else if (langPrefix === 'fr') {
                        browserDetected = 'fr';
                    } else if (langPrefix === 'de') {
                        browserDetected = 'de';
                    } else if (langPrefix === 'pt' && regionSuffix !== 'br') {
                        // Portuguese (not Brazilian) - leave as English
                        browserDetected = 'en';
                    }

                    if (browserDetected !== 'en' || langPrefix === 'en') {
                        setLanguageState(browserDetected);
                        localStorage.setItem('preferred_language', browserDetected);
                        setIsLoading(false);
                        return;
                    }
                } catch (navError) {
                    console.warn('navigator.language detection failed:', navError);
                }

                // 4. Check localStorage as fallback (user's previous selection)
                const savedLanguage = localStorage.getItem('preferred_language') as Language | null;
                if (savedLanguage && ['es', 'en', 'fr', 'de'].includes(savedLanguage)) {
                    setLanguageState(savedLanguage);
                    setIsLoading(false);
                    return;
                }

                // 5. Default to English if all detection methods fail
                setLanguageState('en');
                localStorage.setItem('preferred_language', 'en');
            } catch (error) {
                console.error('Error during language initialization:', error);
                setLanguageState('en');
                localStorage.setItem('preferred_language', 'en');
            } finally {
                setIsLoading(false);
            }
        };

        initializeLanguage();
    }, []);

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // Return key if not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    const value: LanguageContextType = {
        language,
        setLanguage: (newLanguage: Language) => {
            setLanguageState(newLanguage);
            localStorage.setItem('preferred_language', newLanguage);
        },
        t,
    };

    // Don't render children until language is detected
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#0a192f]">
                <div className="text-cyan-400">Loading...</div>
            </div>
        );
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
