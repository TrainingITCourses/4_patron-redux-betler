import { Launch } from "./launch";
import { Filters } from './filters';
export interface Global {
  launches: Launch[];
  filters: Filters;
  filteredLaunches: Launch[];
}

export const globalInitialState: Global = {
  launches: [],
  filters: null,
  filteredLaunches: []
};
