import { Injectable, signal } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { it_IT, en_GB } from 'ng-zorro-antd/i18n';

export interface Translations {
  hero: {
    greeting: string;
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
  };
}

const translations: Record<string, Translations> = {
  'en-GB': {
    hero: {
      greeting: 'Hey,',
      name: 'Roy',
      title: 'Web Developer.',
      subtitle: 'With Graphic Design and Marketing skills, but tech savy since 12.',
      contactButton: 'Contact me',
      scrollDown: 'Scroll down'
    },
    about: {
      title: 'About myself',
      description: `I've fallen in love in computers & web since 12. I met a friend who was able to make incredible things in PHP, AngularJS and WordPress (and most of all get paid from it).
From 2021, after many years of graphic design experience, I decided to full immerse in the field as self-taught.
I'm now working in a SAP Company in Padua as developer and consultant with SAPUI5 MVC framework for big client companies.`
    },
    contact: {
      title: 'Contact me',
      description: 'If you have other request or questions, just ask even if only for a chat (really)! I\'m just on the other side of the form ;)'
    }
  },
  'it': {
    hero: {
      greeting: 'Ciao,',
      name: 'Roy',
      title: 'Sviluppatore Web.',
      subtitle: 'Con competenze di Graphic Design e Marketing, ma nerd informatico dai 12 anni.',
      contactButton: 'Contattami',
      scrollDown: 'Scorri verso il basso'
    },
    about: {
      title: 'Chi sono',
      description: `Mi sono innamorato di computer e web dai 12 anni. Ho conosciuto un amico che riusciva a fare cose incredibili in PHP, AngularJS e WordPress (e soprattutto a farsi pagare per questo).
Dal 2021, dopo molti anni di esperienza nel graphic design, ho deciso di immergermi completamente nel campo come autodidatta.
Ora lavoro in un'azienda SAP a Padova come sviluppatore e consulente con il framework SAPUI5 MVC per grandi aziende clienti.`
    },
    contact: {
      title: 'Contattami',
      description: 'Se hai altre richieste o domande, chiedi pure anche solo per una chiacchierata (davvero)! Sono dall\'altra parte del modulo ;)'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal<string>('en-GB');

  constructor(private nzI18nService: NzI18nService) {}

  getCurrentLanguage(): string {
    return this.currentLang();
  }

  setLanguage(lang: string): void {
    this.currentLang.set(lang);

    // Update Ng-Zorro locale
    if (lang === 'it') {
      this.nzI18nService.setLocale(it_IT);
    } else {
      this.nzI18nService.setLocale(en_GB);
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
