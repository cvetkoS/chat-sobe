import { combineReducers } from 'redux';
import * as tipoviAkcije from '../akcije/tipovi';

const pocetnoStanjeKorisnika = {
  trenutniKorisnik: null,
  ucitavaSe: true
};

const pocetnoStanjeSobe = {
  trenutnaSoba: null
}


const korisnik_reducer = (state = pocetnoStanjeKorisnika, akcija) => {
  switch (akcija.type) {
    case tipoviAkcije.POSTAVI_KORISNIKA:
      return {
        trenutniKorisnik: akcija.payload.trenutniKorisnik,
        ucitavaSe: false
      };
    case tipoviAkcije.OCISTI_KORISNIKA:
      return {
        ...pocetnoStanjeKorisnika,
        ucitavaSe: false
      }
      default:
        return state;
  }
}

const soba_reducer = (state = pocetnoStanjeSobe, akcija) => {
  switch (akcija.type) {
    case tipoviAkcije.POSTAVI_TRENUTNU_SOBU:
      return {
        ...state,
        trenutnaSoba: akcija.payload.trenutnaSoba
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  korisnik: korisnik_reducer,
  soba: soba_reducer
});

export default rootReducer;