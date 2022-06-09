import '../styles/globals.css'
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   useQuery,
//   gql
// } from "@apollo/client";
// //Apollo
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql',
//   cache: new InMemoryCache()
// })

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
