import '../styles/globals.css'
import '../styles/Auth.css'
import '../styles/Habit.css'
import '../styles/Daily.css'
import '../styles/Todo.css'
import '../styles/Timer.css'
import Layout from '../components/Layout'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { AuthProvider } from '../context/auth'
import { OptionsProvider } from '../context/option'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          <OptionsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </OptionsProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp