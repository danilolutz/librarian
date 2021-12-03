import { i18n } from 'i18next';
import { AppEvent } from '../../common/AppEvent';
import { trigger } from './EventHandler';

interface Message {
  language: string;
  namespace: string;
  resource: unknown;
}

export default class {
  globalSearch: any;
  constructor(
    private language: i18n,
  ) {
    this.registerCallbacks();
  }

  registerCallbacks(): void {
    window.api.on(AppEvent.languageChange, this.languageChange.bind(this));

    this.forward(AppEvent.borrowTab);
    this.forward(AppEvent.personTab);
    this.forward(AppEvent.titleTab);
    this.forward(AppEvent.settingsTab);
    this.forward(AppEvent.closeCurrentTab);
    this.forward(AppEvent.languageChange);
    this.forward(AppEvent.quickSearch);
    this.forward(AppEvent.tabClick);
  }

  forward(event: string): void {
    const emit = () => {
      trigger(event);
    }
    window.api.on(event, emit.bind(this));
  }

  languageChange(_event: never, message: Message): void {
    if (!this.language.hasResourceBundle(message.language, message.namespace)) {
      this.language.addResourceBundle(message.language, message.namespace, message.resource);
    }

    this.language.changeLanguage(message.language);
  }
}
