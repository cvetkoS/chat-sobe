import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import md5 from 'md5';

class Registracija extends React.Component {

	state = {
		korisnickoIme: '',
		email: '',
		sifra: '',
    potvrdaSifre: '',
    greske: [],
    ucitavanje: false,
    referencaKorisnika: firebase.database().ref("korisnici")
	};
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
    if (!this.formaJeValidna()) {
      return;
    }

		//Preventing page reload
    event.preventDefault();
    this.setState({ greske: [], ucitavanje: true });
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.sifra)
			.then(kreiraniKorisnik => {
        console.log(kreiraniKorisnik);
        kreiraniKorisnik
            .updateProfile({
              displayName: this.state.korisnickoIme,
              photoURL: `http://gravatar.com/avatar/${md5(
                kreiraniKorisnik.email
              )}?d=identicon`
            })
            .then(() => {
              this.sacuvajKorisnika(kreiraniKorisnik).then(() => {
                console.log("korisnik sacuvan.");
                this.setState({ ucitavanje: false });
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                greske: this.state.greske.concat(err),
                ucitavanje: false
              });
            });

			})
			.catch(err => {
        console.error(err);
        this.setState({ greske: this.state.greske.concat(err), ucitavanje: false });
			})
  };

  sacuvajKorisnika = kreiraniKorisnik => {
    return this.state.referencaKorisnika.child(kreiraniKorisnik.uid).set({
      ime: kreiraniKorisnik.displayName,
      avatar: kreiraniKorisnik.photoURL
    });
  };

  formaJeValidna = () => {
    let greske = [];
    let error;

    if (this.formaJePrazna(this.state)) {
      error = { message: "Popunite sva polja." };
      this.setState({ greske: greske.concat(error) });
      return false;
    }

    if (!this.sifraJeValidna(this.state)){
      error = { message: "Šifre se moraju podudarati i moraju biti veće od 6 karaktera." };
      this.setState({ greske: greske.concat(error) });
      return false;
    }

    return true;
  }

  formaJePrazna = ({ korisnickoIme, email, sifra, potvrdaSifre }) => {
    return !korisnickoIme.length || !email.length || !sifra.length || !potvrdaSifre.length;
  };

  sifraJeValidna = ({ sifra, potvrdaSifre }) => {
    if (sifra.length < 6 || potvrdaSifre.length < 6) {
      return false;
    }

    if (sifra !== potvrdaSifre) {
      return false;
    }

    return true;
  };

  prikaziGreske = greske => greske.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (greske, inputName) => {
    return greske.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

	render() {
		//object destructuring
		const { korisnickoIme, email, sifra, potvrdaSifre, greske, ucitavanje } = this.state;

		return (
			<Grid textAlign="center" verticalAlign="middle" className="app">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h1" icon color="grey" textAlign="center">
						<Icon name="wechat" color="black" />
						Registruj se na Chat Rooms
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment>
							<Form.Input
                fluid
                name="korisnickoIme"
                icon="user"
                iconPosition="left"
                placeholder="Korisničko ime"
                onChange={this.handleChange}
                value={korisnickoIme} type="text" />

							<Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(greske, 'email')}
                type="email" />

							<Form.Input
                fluid
                name="sifra"
                icon="lock"
                iconPosition="left"
                placeholder="Šifra"
                onChange={this.handleChange}
                value={sifra}
                className={this.handleInputError(greske, 'sifra')}
                type="password" />

							<Form.Input
                fluid
                name="potvrdaSifre"
                icon="lock"
                iconPosition="left"
                placeholder="Potvrdi šifru"
                onChange={this.handleChange}
                value={potvrdaSifre}
                className={this.handleInputError(greske, 'sifra')}
                type="password" />

							<Button
                disabled={ucitavanje}
                className={ucitavanje ? 'loading' : ''}
                fluid
                color="black"
                size="large">Potvrdi
              </Button>
						</Segment>
					</Form>
          {greske.length > 0 && (
            <Message error>
              <h3>Greška!</h3>
              {this.prikaziGreske(greske)}
            </Message>
          )}
					<Message>Već imate nalog? <Link to="/login">Ulogujte se.</Link></Message>
				</Grid.Column>
			</Grid>
		)
	}
}

export default Registracija;