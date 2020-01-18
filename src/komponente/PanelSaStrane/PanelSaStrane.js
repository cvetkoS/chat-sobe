import React from 'react';
import { Menu } from 'semantic-ui-react';
import KorisnickiPanel from './KorisnickiPanel';
import Sobe from './Sobe';

class PanelSaStrane extends React.Component {
  render() {
    const { trenutniKorisnik } = this.props;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: '#404040', fontSize: '1.2rem' }}
      >
        <KorisnickiPanel trenutniKorisnik={trenutniKorisnik} />
        <Sobe trenutniKorisnik={trenutniKorisnik} />

      </Menu>
    )
  }
}

export default PanelSaStrane;