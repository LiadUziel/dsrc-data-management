import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme: 'light-purple' | 'dark-purple' = 'light-purple';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: 'light-purple' | 'dark-purple') {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    // Change theme
    themeLink.href = `${theme}.css`;

    // Change Background color and text color
    const bgColor = theme === 'light-purple' ? '#efefef' : '#20262e';
    const color = theme === 'light-purple' ? '#000' : '#fff';

    this.document.body.style.backgroundColor = bgColor;
    this.document.body.style.color = color;

    // Save current theme to localStorage
    localStorage.setItem('theme', theme);
  }
}
