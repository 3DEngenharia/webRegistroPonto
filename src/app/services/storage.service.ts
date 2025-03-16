import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private plataformId: object) {}

  public getItem(key: string): string | null {
    if (isPlatformBrowser(this.plataformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  public setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.plataformId)) {
      localStorage.setItem(key, value);
    }
  }

  public removeItem(key: string): void {
    if (isPlatformBrowser(this.plataformId)) {
      localStorage.removeItem(key);
    }
  }

  public clearAll(): void {
    if (isPlatformBrowser(this.plataformId)) {
      localStorage.clear();
    }
  }
}
