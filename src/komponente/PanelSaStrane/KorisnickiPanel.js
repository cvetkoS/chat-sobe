import React from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';

class KorisnickiPanel extends React.Component {

  state = {
    korisnik: this.props.trenutniKorisnik
  }

  opcijeZaPadajuciMeni = () => [
    {
      key: 'korisnik',
      text: <span>Ulogovan kao: <strong>{this.state.korisnik.displayName}</strong></span>,

      disabled: true
    },
    {
      key: 'avatar',
      text: <span>Promeni fotografiju</span>
    },
    {
      key: 'signout',
      text: <span onClick={this.handleSignout}>Izloguj se</span>
    }
  ]

handleSignout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('signed out'));
}

  render () {
    const { korisnik } = this.state;

    return (
      <Grid style={{ background: '#707070'}}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0}}>
          {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="wechat" />
              <Header.Content>Chat Sobe</Header.Content>
            </Header>
            {/* User Drowdown */}
            <Header style={{ padding: '0.25em'}} as="h4" inverted>
              <Dropdown trigger={
                <span>
                  <Image src={korisnik.photoURL} spaced="right" avatar />
                  {korisnik.displayName}
                </span>
              } options={this.opcijeZaPadajuciMeni()} />
            </Header>
          </Grid.Row>

        </Grid.Column>
      </Grid>
    )
  }
}


export default KorisnickiPanel;