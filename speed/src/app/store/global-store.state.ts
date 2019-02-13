import { Injectable } from '@angular/core';
import { Global, globalInitialState } from './models/global.model';
import { BehaviorSubject } from 'rxjs';
import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { globalStoreReducer } from './global-store.reducer';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {

  constructor() { }

  private state: Global = { ...globalInitialState };
  private launches$ = new BehaviorSubject<any>(this.state.launches);
  private filters$ = new BehaviorSubject<any>(this.state.filters);
  private filteredLaunches$ = new BehaviorSubject<any>(this.state.filteredLaunches);


  public select$ = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.launches:
        return this.launches$.asObservable();
      case GlobalSlideTypes.filteredLaunches:
        return this.filteredLaunches$.asObservable();
      case GlobalSlideTypes.setFilters:
        return this.filters$.asObservable();
    }
  };

  public selectSnapShot = (slice: GlobalSlideTypes) => {
    switch (slice) {
      case GlobalSlideTypes.launches:
        return [...this.state.launches];
      case GlobalSlideTypes.filteredLaunches:
        return [...this.state.filteredLaunches];
    }
  };

  public dispatch = (action: GlobalActions) => {
    console.log('dispatching...', action);
    console.log('payload_____________');
    console.log(action.payload);

    this.state = globalStoreReducer(this.state, action);
    switch (action.type) {
      case GlobalActionTypes.LoadLaunches:
        this.launches$.next([...this.state.launches]);
        break;
      case GlobalActionTypes.SetFilters:
        this.filters$.next({ ...this.state.filters });
        this.filteredLaunches$.next([...this.state.filteredLaunches]);
    }
  };
}

export enum GlobalSlideTypes {
  launches = 'launches',
  filteredLaunches = 'filteredLaunches',
  setFilters = 'setFilters'
}
