import '../styles/globals.css'
import '../styles/Auth.css'
import Layout from '../components/Layout'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { AuthProvider } from '../context/auth'
import Head from 'next/head'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css"
        />

      </Head>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp