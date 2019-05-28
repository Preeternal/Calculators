import ApolloBoost from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'https://aqueous-reef-98968.herokuapp.com/',
  // uri: 'http://127.0.0.1:4000',
});

export default client;
