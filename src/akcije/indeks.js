import * as tipoviAkcije from './tipovi';

export const postaviKorisnika = korisnik => {
  return {
    type: tipoviAkcije.POSTAVI_KORISNIKA,
    payload: {
      trenutniKorisnik: korisnik
    },
  };
}

export const ocistiKorisnika = korisnik => {
  return {
    type: tipoviAkcije.OCISTI_KORISNIKA
  };
}

export const postaviTrenutnuSobu = soba => {
  return {
    type: tipoviAkcije.POSTAVI_TRENUTNU_SOBU,
    payload: {
      trenutnaSoba: soba
    }
  }
}