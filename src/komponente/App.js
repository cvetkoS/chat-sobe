import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import { connect } from 'react-redux';
import PanelSaStrane from './PanelSaStrane/PanelSaStrane';
import Poruke from './Poruke/Poruke';

// import ColorPanel from './ColorPanel/ColorPanel';
// import SidePanel from './SidePanel/SidePanel';
// import MetaPanel from './MetaPanel/MetaPanel';


//Changing App to stateless functional component
const App = ({ trenutniKorisnik, trenutnaSoba }) => (
  <Grid padded columns="equal" className="app" style={{ background: '#eee' }}>
    {/* <ColorPanel /> */}
    <PanelSaStrane
      key={trenutniKorisnik && trenutniKorisnik.uid}
      trenutniKorisnik={trenutniKorisnik}
    />

     <Grid.Column style={{ marginLeft: 255 }}>
      <Poruke
        key={trenutnaSoba && trenutnaSoba.id}
        trenutnaSoba={trenutnaSoba}
        trenutniKorisnik={trenutniKorisnik}
       />
    </Grid.Column>

    {/*<Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column> */}

  </Grid>
)

const mapStateToProps = state => ({
  trenutniKorisnik: state.korisnik.trenutniKorisnik,
  trenutnaSoba: state.soba.trenutnaSoba
})

export default connect(mapStateToProps)(App);
