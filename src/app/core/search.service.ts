import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SearchService {
  constructor() {
  }
  private readonly searchSubject$ = new BehaviorSubject<string | null>('');

  public get search$(): Observable<any> {
    return this.searchSubject$.asObservable();
  }

  public emitSearch(searchInput: any): void {
    this.searchSubject$.next(searchInput);
  }
}
