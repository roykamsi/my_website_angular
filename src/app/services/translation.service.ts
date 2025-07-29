import { Injectable, signal } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { it_IT, en_GB } from 'ng-zorro-antd/i18n';

export interface Translations {
  hero: {
    greeting: string;
    im: string;
    name: string;
    title: string;
    subtitle: string;
    contactButton: string;
    scrollDown: string;
  };
  about: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    name: string;
    nameMandatory: string;
    email: string;
    emailMandatory: string;
    emailInvalid: string;
    subject: string;
    subjectMandatory: string;
    message: string;
    messageMandatory: string;
    sendButton: string;
    messageSent: string;
  };
  transactional: {
    sendingMessage: string;
    messageSent: string;
  }
}

const translations: Record<string, Translations> = {
  'en-GB': {
    hero: {
      greeting: 'Hey!',
      im: 'I\'m',
      name: 'Roy',
      title: 'Web Developer.',
      subtitle: 'With Graphic Design and Marketing skills, but tech savy since 12.',
      contactButton: 'Contact me',
      scrollDown: 'Scroll down'
    },
    about: {
      title: 'About myself',
      description: `I've fallen in love in computers & web since 12. I met a friend who was able to make incredible things in PHP, AngularJS and WordPress (and most of all get paid from it).
      <br>From 2021, after 8 years of graphic design experience, I decided to full immerse in the field as self-taught.
      <br>I'm now working in a SAP Company in Padua as developer and consultant with SAPUI5 MVC framework for big client companies.`
    },
    contact: {
      title: 'Contact me',
      description: 'If you have other request or questions, just ask even if only for a chat (really)! I\'m just on the other side of the form ;)',
      name: 'Name',
      nameMandatory: 'The name is mandatory.',
      email: 'Email',
      emailMandatory: 'The email is mandatory.',
      emailInvalid: 'Insert a valid email.',
      subject: 'Subject',
      subjectMandatory: 'The subject is mandatory.',
      message: 'Message',
      messageMandatory: 'The message is mandatory.',
      sendButton: 'Send',
      messageSent: 'Message sent.'
    },
    transactional: {
      sendingMessage: 'Sending the message...',
      messageSent: 'Message sent.'
    },
  },
  'it': {
    hero: {
      greeting: 'Ciao!',
      im: 'Sono',
      name: 'Roy',
      title: 'Sviluppatore Web.',
      subtitle: 'Con competenze di Graphic Design e Marketing, ma nerd informatico dai 12 anni.',
      contactButton: 'Contattami',
      scrollDown: 'Scorri verso il basso'
    },
    about: {
      title: 'Riguardo a me',
      description: `Mi sono innamorato di computer e web dai 12 anni. Ho conosciuto un amico che riusciva a fare cose incredibili in PHP, AngularJS e WordPress (e soprattutto a farsi pagare per questo).
<br>Dal 2021, dopo 8 anni di esperienza nel graphic design, ho deciso di immergermi completamente nel campo da autodidatta.
<br>Ora lavoro in un'azienda SAP a Padova come sviluppatore e consulente con il framework SAPUI5 MVC per grandi aziende clienti.`
    },
    contact: {
      title: 'Contattami',
      description: 'Se hai altre richieste o domande, chiedi pure anche solo per una chiacchierata (davvero)! Sono dall\'altra parte del form ;)',
      name: 'Nome',
      nameMandatory: 'Il nome è obbligatorio.',
      email: 'Email',
      emailMandatory: 'L\'email è obbligatoria.',
      emailInvalid: 'Inserisci un\'email valida.',
      subject: 'Oggetto',
      subjectMandatory: 'L\'oggetto è obbligatorio.',
      message: 'Messaggio',
      messageMandatory: 'Il messaggio è obbligatorio.',
      sendButton: 'Invia',
      messageSent: 'Messaggio inviato.'
    },
    transactional: {
      sendingMessage: 'Invio del messaggio in corso...',
      messageSent: 'Messaggio inviato.'
    },
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private static userSelectedLanguage: string | null = null;
  private currentLang = signal<string>(this.getInitialLanguage());

  constructor(private nzI18nService: NzI18nService) {
    this.setLanguage(this.currentLang());
  }

  private getInitialLanguage(): string {
    // Check localStorage first (only if available)
    if (this.isLocalStorageAvailable()) {
      const savedLang = localStorage.getItem('selectedLanguage');
      if (savedLang && translations[savedLang]) {
        TranslationService.userSelectedLanguage = savedLang;
        return savedLang;
      }
    }

    // Use user's previous choice if available
    if (TranslationService.userSelectedLanguage) {
      return TranslationService.userSelectedLanguage;
    }

    // Otherwise detect from browser
    const browserLang = navigator.language || navigator.languages[0];

    if (browserLang.startsWith('it')) {
      return 'it';
    } else if (browserLang.startsWith('en')) {
      return 'en-GB';
    }

    return 'en-GB'; // default fallback
  }

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof localStorage !== 'undefined' && localStorage !== null;
    } catch {
      return false;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang();
  }

  setLanguage(lang: string): void {
    if (translations[lang]) {
      this.currentLang.set(lang);
      TranslationService.userSelectedLanguage = lang;
      
      // Save to localStorage if available
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('selectedLanguage', lang);
      }

      // Update Ng-Zorro locale
      if (lang === 'it') {
        this.nzI18nService.setLocale(it_IT);
      } else {
        this.nzI18nService.setLocale(en_GB);
      }
    }
  }

  translate(key: string): string {
    const keys = key.split('.');
    const langTranslations = translations[this.currentLang()];

    if (!langTranslations) return key;

    let result: any = langTranslations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }

    return result;
  }

  getTranslations(): Translations {
    return translations[this.currentLang()] || translations['en-GB'];
  }
}
