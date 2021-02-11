import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  public getStorageItem(key: string): any {
    return JSON.parse(this.localStorage.getItem(key));
  }

  public setStorageItem(key: string, value: any): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
}
