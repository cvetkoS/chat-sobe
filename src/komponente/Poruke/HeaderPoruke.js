import React from 'react';
import { Segment, Header, Input, Icon } from 'semantic-ui-react';

class HeaderPoruke extends React.Component {
  render() {

    const { imeSobe, brojJedinstvenihKorisnika, handleSearchChange, searchLoading } = this.props;

    return(
      //Clearing is for clearing floats (clearfix)
      // Room Title
      <Segment clearing style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header fluid as="h2" floated="left" style={{ marginBottom: '0' }}>
          <span>
          {imeSobe}
          <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>{brojJedinstvenihKorisnika.length === 0 ? '0 Korisnika' : brojJedinstvenihKorisnika}</Header.Subheader>
        </Header>
        {/* Room Search Input */}
        <Header floated="right" style={{ marginLeft: 'auto'}}>
          <Input
            onChange={handleSearchChange}
            loading={searchLoading}
            size="mini"
            icon="search"
            name="vrednostPretrage"
            placeholder="Pretraži poruke"
          />
        </Header>

      </Segment>
    );
  }
}

export default HeaderPoruke;