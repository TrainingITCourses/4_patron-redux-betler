import { GlobalActions, GlobalActionTypes } from './global-store.actions';
import { Global, globalInitialState } from './models/global.model';
import { Launch } from './models/launch';
import { Filters } from './models/filters';

export function globalStoreReducer(state = globalInitialState, action: GlobalActions): Global {

  const result = { ...state };
  switch (action.type) {
    case GlobalActionTypes.LoadLaunches:
      state.launches = action.payload;
      result.launches = action.payload;
      break;
    // case GlobalActionTypes.FilteredLaunches:
    //   // TODO mal pensado el tema de separar setFilters y filteredLaunches, ignoro payload.
    //   console.log("globalStoreReducer.applyFilters");
    //   console.log(state.filters);
    //   state.filteredLaunches = applyFilters(state.launches, state.filters);
    //   result.filteredLaunches = {...state.filteredLaunches};
    //   
    //   break;
    case GlobalActionTypes.SetFilters:
      console.log("Setting filters in reducer");
      result.filters = action.payload;
      state.filters = action.payload;
      state.filteredLaunches = applyFilters(state.launches, state.filters);
      // TODO no me gusta... estamos haciendo 2 veces el spread del filtered launches: arriba y aquí
      result.filteredLaunches = [...state.filteredLaunches];
      break;
  }
  return result;
}

/**
 * Devuelve una copia del parámetro launches eliminando los elementos que no cumplan los filtros.
 * @param launches No es modificado
 * @param filters Filtros de búsqueda
 * 
 */
function applyFilters(launches: Launch[], filterParam: any): Launch[] {

  console.log("Launches in applyFilters");
  console.log(launches);
  var aux = launches;
  // TODO ¿Por qué no puedo decirle a filterParam que es un Filters?
  var filters: Filters = filterParam;

  if (filters == null) {
    // At load, filters is null
    return aux;
  }

  console.log("Filtering status: " + filters.status);
  // Filter by estado
  if (filters.status != -1) {
    aux = aux.filter((launch) => launch.status == filters.status);
  }

  // Filter by agencia
  if (filters.agency != "") {
    aux = aux.filter((launch) => {
      var coincidences = 0;
      if (launch.missions[0] && launch.missions[0].agencies && launch.missions[0].agencies[0]) {
        if (launch.missions[0].agencies[0].name.search(filters.agency) != -1) {
          coincidences++;
        }
      }
      if (launch.rocket.agencies && launch.rocket.agencies[0]) {
        if (launch.rocket.agencies[0].name.search(filters.agency) != -1) {
          coincidences++;
        }
      }
      if (launch.location && launch.location.pads[0] && launch.location.pads[0].agencies && launch.location.pads[0].agencies[0]) {
        if (launch.location.pads[0].agencies[0].name.search(filters.agency) != -1) {
          coincidences++;
        }
      }

      return coincidences > 0;
    });
  }

  // Filter by tipo
  // TODO falla, hay algunas sin misión
  if (filters.type != -1) {
    aux = aux.filter((launch) => {
      if (launch.missions[0]) {
        return launch.missions[0].type == filters.type;
      } else {
        return false;
      }
    });
  }

  console.log("Filtro aplicado, " + aux.length + " resultados");
  return aux;
}