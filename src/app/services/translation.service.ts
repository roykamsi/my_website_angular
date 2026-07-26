import { Injectable, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { it_IT, en_GB } from 'ng-zorro-antd/i18n';
import { Router, NavigationEnd } from '@angular/router';
import { Location, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

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
    sendMessage: string;
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
      subtitle: 'With Graphic Design and Marketing skills, but working in Cloud since 2022.',
      contactButton: 'Contact me',
      scrollDown: 'Scroll down'
    },
    about: {
      title: 'About me',
      description: `I fell in love into web and computers since 12 when I met a friend who could do incredible things with PHP, Angular and WordPress (and above all, get paid for it).
<br>After 8 years in the graphic design world, following my degree in 2021, I decided to fully dive into the field as a self-taught developer.
<br>I've worked: <br>
  <ul>
    <li>
      Two years in web agencies. First as a Web Designer, then as a WordPress Full Stack Developer.
    </li>
    <li>
      Two years at the first SAP BTP consulting company in Italy. This allowed me to deepen my knowledge of cloud enterprise, both FE and BE.
    </li>
    <li>
      Since 2026 at CAME as BTP representative for the SAP department, working on Cloud green and brownfield projects with a strong focus on cybersecurity.
    </li>
  </ul>`
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
      sendMessage: 'Send message',
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
      subtitle: 'Con competenze di Graphic Design e Marketing, ma dal 2022 lavoro sul Cloud.',
      contactButton: 'Contattami',
      scrollDown: 'Scorri verso il basso'
    },
    about: {
      title: 'Su di me',
      description: `Sono innamorato di computer e web da quando avevo 12 anni grazie a un amico che mi riusciva a a fare cose incredibili in PHP, Angular e WordPress (e soprattutto a farsi pagare).
<br>Alché dopo 8 anni nel mondo nel graphic design, dopo la mia laurea nel 2021, ho deciso di immergermi completamente nel campo da autodidatta.
<br>Ho lavorato: <br><ul><li>Due anni in agenzie Web. Prima come Web Designer e poi come WordPress Full Stack Developer.</li>
<li>Due anni per la prima azienda di consulenza di SAP BTP in Italia. Questo mi ha permesso di approfondire il mondo cloud enterprise FE e BE.</li>
<li>Dal 2026 in CAME come referente BTP del reparto SAP per progetti Cloud green e brown field con un serio accento alla sicurezza informatica.</li></ul>`
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
      sendMessage: 'Invia messaggio',
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
  private router = inject(Router);
  private location = inject(Location);
  private platformId = inject(PLATFORM_ID);
  private currentLang = signal<string>(this.getInitialLanguage());

  constructor(private nzI18nService: NzI18nService) {
    this.setLanguage(this.currentLang());

    // Defer past the initial render/hydration: Angular's own automatic initial
    // navigation (to whatever URL the browser had) still fires a NavigationEnd,
    // which would otherwise be caught by setupRouteListener() and mistaken for
    // an explicit request to switch to the URL's (non-prefixed) language before
    // our own redirect below gets a chance to run.
    afterNextRender(() => {
      setTimeout(() => {
        this.handleInitialNavigation();
        this.setupRouteListener();
      });
    });
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const urlLang = this.extractLanguageFromUrl(event.url);
        if (urlLang && urlLang !== this.currentLang()) {
          // Use setLanguage to properly update all state including localStorage
          this.setLanguageFromUrl(urlLang);
        }
      });
  }

  private setLanguageFromUrl(lang: string): void {
    if (translations[lang]) {
      this.currentLang.set(lang);
      TranslationService.userSelectedLanguage = lang;

      // Save to localStorage if available
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('selectedLanguage', lang);
      }

      this.updateNzZorroLocale(lang);
    }
  }

  private extractLanguageFromUrl(url: string): string | null {
    if (url.startsWith('/it')) {
      return 'it';
    }
    return 'en-GB'; // default for URLs without language prefix
  }

  private getInitialLanguage(): string {
    // First check if URL already has language info. Location works on both
    // server (from the incoming request URL) and browser, so this must run
    // on both platforms - otherwise SSR always falls through to the default
    // language regardless of the requested path, causing a language mismatch
    // between the server-rendered HTML and the client hydration/re-render.
    const currentUrl = this.location.path();
    if (currentUrl.startsWith('/it')) {
      return 'it';
    }

    // Check localStorage first (only if available)
    if (this.isLocalStorageAvailable()) {
      const savedLang = localStorage.getItem('selectedLanguage');
      if (savedLang && translations[savedLang]) {
        TranslationService.userSelectedLanguage = savedLang;
        return savedLang;
      }
    }

    // Use user's previous choice if available. Browser-only: this is a
    // static field, so on the server it would leak across requests and make
    // one visitor's language stick for everyone else's SSR render.
    if (isPlatformBrowser(this.platformId) && TranslationService.userSelectedLanguage) {
      return TranslationService.userSelectedLanguage;
    }

    // Otherwise detect from browser (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language;

      if (browserLang.startsWith('it')) {
        return 'it';
      } else if (browserLang.startsWith('en')) {
        return 'en-GB';
      }
    }

    return 'en-GB'; // default fallback
  }

  private handleInitialNavigation(): void {
    // Only handle navigation in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Only auto-navigate if we're on root path and browser language is Italian
    const currentUrl = this.location.path();
    const detectedLang = this.currentLang();

    if ((currentUrl === '' || currentUrl === '/') && detectedLang === 'it' && !this.isLanguageFromUrl()) {
      // Navigate to Italian version if browser is Italian and we're on root English page
      this.router.navigate(['/it']);
    }
  }

  private isLanguageFromUrl(): boolean {
    // Check if current language was determined from URL (not browser/localStorage)
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const currentUrl = this.location.path();
    return currentUrl.startsWith('/it');
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
      if (isPlatformBrowser(this.platformId)) {
        TranslationService.userSelectedLanguage = lang;
      }

      // Save to localStorage if available
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('selectedLanguage', lang);
      }

      this.updateNzZorroLocale(lang);
    }
  }

  private updateNzZorroLocale(lang: string): void {
    // Update Ng-Zorro locale
    if (lang === 'it') {
      this.nzI18nService.setLocale(it_IT);
    } else {
      this.nzI18nService.setLocale(en_GB);
    }
  }

  navigateWithLanguage(lang: string): void {
    const currentUrl = this.router.url;
    let newUrl: string;

    // Remove existing language prefix if present
    const urlWithoutLang = currentUrl.replace(/^\/it/, '') || '/';

    if (lang === 'it') {
      newUrl = '/it' + urlWithoutLang;
    } else {
      newUrl = urlWithoutLang;
    }

    this.router.navigate([newUrl]);
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
