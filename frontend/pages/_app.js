import '../styles/globals.css'
import Layout from '../components/Layout'
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client"

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (  
  <ApolloProvider client={client}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ApolloProvider>
  )
}

export default MyApp
