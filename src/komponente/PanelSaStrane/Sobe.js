import React from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { postaviTrenutnuSobu } from '../../akcije/indeks';

class Sobe extends React.Component {
  state = {
    korisnik: this.props.trenutniKorisnik,
    aktivnaSoba: '',
    sobe: [],
    imeSobe: '',
    detaljiSobe: '',
    referencaSobe: firebase.database().ref('sobe'),
    modal: false,
    prvoUcitavanje: true
  }

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let ucitaneSobe = [];
    this.state.referencaSobe.on('child_added', snap => {
      ucitaneSobe.push(snap.val());
      this.setState({ sobe: ucitaneSobe }, () => this.postaviPrvuSobu());
    });
  };

  removeListeners = () => {
    this.state.referencaSobe.off();
  }

  //Callback function
  postaviPrvuSobu = () => {
    const prvaSoba = this.state.sobe[0];
    if (this.state.prvoUcitavanje && this.state.sobe.length > 0) {
      this.props.postaviTrenutnuSobu(prvaSoba);
      this.postaviAktivnuSobu(prvaSoba);
    }

    this.setState({ prvoUcitavanje: false });
  }

  dodajSobu = () => {
    const { referencaSobe, imeSobe, detaljiSobe, korisnik } = this.state;

    const key = referencaSobe.push().key;

    const novaSoba = {
      id: key,
      ime: imeSobe,
      detalji: detaljiSobe,
      kreirao: {
        ime: korisnik.displayName,
        avatar: korisnik.photoURL
      }
    };

    referencaSobe
      .child(key)
      .update(novaSoba)
      .then(() => {
        this.setState({ imeSobe: '', detaljiSobe: '' });
        this.closeModal();
        console.log('soba dodata');
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleSubmit = event => {
    event.preventDefault();

    if(!this.formaJeValidna(this.state)) {
      return;
    }
    this.dodajSobu();
    // this.closeModal();

  }

  formaJeValidna = ({ imeSobe, detaljiSobe }) => imeSobe && detaljiSobe;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  promeniSobu = soba => {
    this.postaviAktivnuSobu(soba);
    this.props.postaviTrenutnuSobu(soba);
  }

  postaviAktivnuSobu = soba => {
    this.setState({ aktivnaSoba: soba.id });
  }

  closeModal = () => this.setState({ modal: false });
  openModal = () => this.setState({ modal: true });

  prikaziSobe = sobe =>
    sobe.length > 0 && sobe.map(soba => (
      <Menu.Item
        key={soba.id}
        onClick={() => this.promeniSobu(soba)}
        name={soba.ime}
        style={{ opacity: 0.7 }}
        active={ soba.id === this.state.aktivnaSoba}
      >

        # {soba.ime}


      </Menu.Item>
    ))

  render() {
    const { sobe, modal } = this.state;
    return (
      // React.Fragment is used for grouping 2 components into 1
      <React.Fragment>
        <Menu.Menu style={{ position: 'absolute', top: '130px', left: '0', width: '100%', paddingBottom: '2em' }}>
          <Menu.Item style={{ color: 'white', paddingBottom: '11px' }}>
            <span>
              <Icon name="exchange" /> Sobe{' '}
            </span>
            ({ sobe.length }) <Icon name="add" style={{ cursor: 'pointer' }} onClick={this.openModal} />
          </Menu.Item>
          {this.prikaziSobe(sobe)}
        </Menu.Menu>

          {/* Sobe */}

          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Dodaj sobu</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Input
                    fluid
                    label="Ime sobe: "
                    name="imeSobe"
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field>
                  <Input
                    fluid
                    label="O čemu će se pisati ovde: "
                    name="detaljiSobe"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>

            <Modal.Actions>
              <Button color="green" inverted onClick={this.handleSubmit}>
                <Icon name="checkmark" /> Kreiraj
              </Button>

              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Odustani
              </Button>
            </Modal.Actions>

          </Modal>
      </React.Fragment>
    )
  }
}

export default connect(
  null,
  { postaviTrenutnuSobu }
)(Sobe);