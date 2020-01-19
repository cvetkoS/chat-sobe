import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';

class FormaPoruke extends React.Component {
  state = {
    poruka: '',
    soba: this.props.trenutnaSoba,
    korisnik: this.props.trenutniKorisnik,
    loading: false,
    greske: []
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  kreirajPoruku = () => {
    const poruka = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      korisnik: {
        id: this.state.korisnik.uid,
        ime: this.state.korisnik.displayName,
        avatar: this.state.korisnik.photoURL
      },
      sadrzaj: this.state.poruka
    };
    return poruka;
  };

  posaljiPoruku = () => {
    const { referencaPoruke } = this.props;
    const { poruka, soba } = this.state;

    if (poruka) {
      this.setState({ loading: true });
      referencaPoruke
        .child(soba.id)
        .push()
        .set(this.kreirajPoruku())
        .then(() => {
          this.setState({ loading: false, poruka: "", greske: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            greske: this.state.greske.concat(err)
          });
        });
    } else {
      this.setState({
        greske: this.state.greske.concat({ poruka: 'Poruka je prazna!' })
      });
    }
  };

  render() {
    const { greske, poruka, loading } = this.state;

    return (
      <Segment className="forma__poruke">
        <Input
          fluid
          name="poruka"
          onChange={this.handleChange}
          value={poruka}
          style={{ marginBottom: "0.7em" }}
          label={<Button
            onClick={this.posaljiPoruku}
            disabled={loading}
            color="orange"
            content="Odgovori"
            labelPosition="left"
            icon="edit"
          />  }
          labelPosition="left"
          className={greske.some(error => error.poruka.includes(poruka)) ? 'error' : ''}
          placeholder="Unesite tekst poruke"
        />

      </Segment>
    );
  }
}

export default FormaPoruke;