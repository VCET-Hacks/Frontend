import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Replace this URL with Meta's GraphQL endpoint if using the Graph API
const httpLink = new HttpLink({
  uri: 'https://graph.facebook.com/v16.0/graphql', // or the latest version of the API
  headers: {
    Authorization: `Bearer EAAIfBSQza0IBO3tZBnmdyFBoTCiYEJwtQCaY88g2ePhhq6v3dBbZBBdRruvknZCMo3KcacsFcQ0qa3LRL8XbNV6ZBcnK8Q7cZBpuHVHglsDDhxbbqLBMtMQHKIbcLVXWBH4TXaHYRukGKW0rV0z3znQN6vRjJOPDZBPrumCAPkG4uDOlw87HRUlcuBhMR5CSZBvufSHtr7JpWjp4jdOmruREN9AeAV3`, // Replace with your access token
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
