import '../styles/globals.css'
import Layout from '../components/Layout'
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client"
import { AuthProvider } from '../context/auth'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (  
  <ApolloProvider client={client}>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </AuthProvider>
  </ApolloProvider>
  )
}

export default MyApp
