import Polyglot from 'node-polyglot';
import phrases from '../../assets/localization/phrases.json';

const defaultLanguage = 'en';

const detectLanguage = (): string => {
    let languageRegExp: RegExpMatchArray;
    if (navigator) {
        if (navigator.userAgent && (languageRegExp = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))) {
            return languageRegExp[1];
        }
        if (navigator.languages) {
            return navigator.languages[0];
        }
        if (navigator.language) {
            return navigator.language;
        }
        if (navigator.browserLanguage) {
            return navigator.browserLanguage;
        }
        if (navigator.systemLanguage) {
            return navigator.systemLanguage;
        }
        if (navigator.userLanguage) {
            return navigator.userLanguage;
        }
    }
    return defaultLanguage;
};

class Localization {
    private _polyglot: Polyglot;
    private _language: string;
    private _iso6391Language: string;

    public constructor() {
        this._polyglot = new Polyglot({ locale: detectLanguage() });
        this._language = this._polyglot.locale();
        this._iso6391Language = this._getISO6391Language();
        this._setPhrases();
    }

    public t(phrase: string, options?: number | Polyglot.InterpolationOptions): string {
        return this._polyglot.t(phrase, options);
    }

    public has(phrase: string): boolean {
        return this._polyglot.has(phrase);
    }

    public locale(locale?: string): string {
        this._language = this._polyglot.locale(locale);
        const newISO6391Language = this._getISO6391Language();
        if (newISO6391Language !== this._iso6391Language) {
            this._iso6391Language = newISO6391Language;
            this._setPhrases();
        }
        return this._language;
    }

    private _setPhrases(): void {
        let currentLanguagePhrases: { [key: string]: string } = {};
        currentLanguagePhrases = Object.keys(phrases).reduce((obj: { [key: string]: string }, phrase) => {
            const currentPhrase = phrases[phrase as keyof typeof phrases];
            obj[phrase] = Object.prototype.hasOwnProperty.call(currentPhrase, this._iso6391Language)
                ? currentPhrase[this._iso6391Language as keyof typeof currentPhrase]
                : currentPhrase[defaultLanguage];
            return currentLanguagePhrases;
        }, currentLanguagePhrases);

        this._polyglot.replace(currentLanguagePhrases);
    }

    private _getISO6391Language(): string {
        return this._language.substr(0, 2);
    }
}

export const localization = new Localization();
