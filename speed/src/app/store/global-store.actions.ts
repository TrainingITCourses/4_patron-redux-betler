import { Launch } from './models/launch';
import { Filters } from './models/filters';

export enum GlobalActionTypes {
  LoadLaunches = '[Global] LoadLaunches',
  SetFilters = '[Global] SetFilters',
  //FilteredLaunches = '[Global] FilteredLaunches',
}

export interface Action {
  readonly type: GlobalActionTypes;
  readonly payload: any;
}

export class LoadLaunches implements Action {
  public readonly type = GlobalActionTypes.LoadLaunches;
  constructor(public readonly payload: Launch[]) { }
}

// export class FilterLaunches implements Action {
//   public readonly type = GlobalActionTypes.FilteredLaunches;
//   constructor(public readonly payload: any) {}
// }

export class SetFilters implements Action {
  public readonly type = GlobalActionTypes.SetFilters;
  constructor(public readonly payload: Filters) { }
}

export type GlobalActions = LoadLaunches | SetFilters; // | FilterLaunches
