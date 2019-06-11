import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://aqueous-reef-98968.herokuapp.com/',
  // uri: 'http://127.0.0.1:4000',
});

export default client;
