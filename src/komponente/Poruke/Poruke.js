import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from '../../firebase';

import HeaderPoruke from "./HeaderPoruke";
import FormaPoruke from "./FormaPoruke";
import Poruka from './Poruka';

class Poruke extends React.Component {
  state = {
    referencaPoruke: firebase.database().ref('poruke'),
    poruke: [],
    porukeSeUcitavaju: true,
    soba: this.props.trenutnaSoba,
    korisnik: this.props.trenutniKorisnik,
    brojJedinstvenihKorisnika: ''
  }

  componentDidMount = () => {
    const { soba, korisnik } = this.state;

    if (soba && korisnik) {
      this.addListeners(soba.id);
    }
  }

  addListeners = sobaId => {
    this.addMessageListener(sobaId);
  }

  addMessageListener = sobaId => {
    let ucitanePoruke = [];
    this.state.referencaPoruke.child(sobaId).on('child_added', snap => {
      ucitanePoruke.push(snap.val());
      this.setState({
        poruke: ucitanePoruke,
        porukeSeUcitavaju: false
      });
      this.prebrojJedinstveneKorisnike(ucitanePoruke);
    });
  };

  prebrojJedinstveneKorisnike = poruke => {
    const jedinstveniKorisnici = poruke.reduce((akumulator, poruka) => {
      if(!akumulator.includes(poruka.korisnik.ime)) {
        akumulator.push(poruka.korisnik.ime);
      }
      return akumulator;
    }, []);
    const brojKorisnikaJeJedan = jedinstveniKorisnici.length === 1;
    const brojJedinstvenihKorisnika = `${jedinstveniKorisnici.length} korisnik${brojKorisnikaJeJedan ? '' : 'a'}`;
    this.setState({ brojJedinstvenihKorisnika });
  }

  prikaziPoruke = poruke => (
    poruke.length > 0 && poruke.map(poruka => (
      <Poruka
        key={poruka.timestamp}
        poruka={poruka}
        korisnik={this.state.korisnik}
      />
    ))
  )

  prikaziImeSobe = soba => soba ? `#${soba.ime}`: '';

  render() {
    const { referencaPoruke, poruke, soba, korisnik, brojJedinstvenihKorisnika } = this.state;

    return (
      <React.Fragment>
        <HeaderPoruke
          imeSobe={this.prikaziImeSobe(soba)}
          brojJedinstvenihKorisnika={brojJedinstvenihKorisnika} />

        <Segment>
          <Comment.Group className="poruke">
            {this.prikaziPoruke(poruke)}
          </Comment.Group>
        </Segment>

        <FormaPoruke
          referencaPoruke={referencaPoruke}
          trenutnaSoba={soba}
          trenutniKorisnik={korisnik}
        />
      </React.Fragment>
    );
  }
}

export default Poruke;
