import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';

const sopstvenaPoruka = (poruka, korisnik) => {
  return poruka.korisnik.id === korisnik.uid ? 'poruka__svoja' : '';
}

const vremeOdSada = timestamp => moment(timestamp).fromNow();

const Poruka = ({ poruka, korisnik }) => (
  <Comment>
    <Comment.Avatar src={poruka.korisnik.avatar} />
    <Comment.Content className={sopstvenaPoruka(poruka, korisnik)}>
      <Comment.Author as="a">{poruka.korisnik.ime}</Comment.Author>
      <Comment.Metadata>{vremeOdSada(poruka.timestamp)}</Comment.Metadata>
      <Comment.Text>{poruka.sadrzaj}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Poruka;