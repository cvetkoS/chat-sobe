import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends React.Component {

	state = {
		email: '',
		sifra: '',
    greske: [],
    ucitavanje: false,
	};
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
    //Preventing page reload
    event.preventDefault();
    if(!this.formaJeValidna(this.state)) {
      return;
    }

    this.setState({ greske: [], ucitavanje: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.sifra)
      .then(ulogovanKorisnik => {
        console.log(ulogovanKorisnik);
      })
      .catch(err => {
        console.error(err);
        this.setState({
          greske: this.state.greske.concat(err),
          ucitavanje: false
        })
      })
  };

  formaJeValidna = ({ email, sifra }) => email && sifra;

  prikaziGreske = greske => greske.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (greske, inputName) => {
    return greske.some(error => error.message.toLowerCase().includes(inputName))
      ? "greska"
      : "";
  };

	render() {
		//object destructuring
		const { email, sifra, greske, ucitavanje } = this.state;

		return (
			<Grid textAlign="center" verticalAlign="middle" className="app">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h1" icon color="grey" textAlign="center">
						<Icon name="wechat" color="black" />
						Uloguj se na Chat Rooms
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment>
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

							<Button
                disabled={ucitavanje}
                className={ucitavanje ? 'loading' : ''}
                fluid
                color="black"
                size="large">Uloguj se
              </Button>
						</Segment>
					</Form>
          {greske.length > 0 && (
            <Message error>
              <h3>Greška!</h3>
              {this.prikaziGreske(greske)}
            </Message>
          )}
					<Message>Nemate nalog? <Link to="/register">Registrujte se.</Link></Message>
				</Grid.Column>
			</Grid>
		)
	}
}

export default Login;