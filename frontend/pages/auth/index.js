import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { useRouter } from 'next/router'
import { loginQ, addUserM } from "../../gql/queries"
import { useAuthContext } from '../../context/auth'
import Input from "../../components/Input"
import styles from '../../styles/Auth.module.css'

const index = () => {
    const [auth, setAuth] = useAuthContext()

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        cPassword: ''
    })

    const { loading, error, data } = useQuery(loginQ, { variables: login })
    const [addUser, status] = useMutation(addUserM)

    const router = useRouter()

    const handleLogin = e => {
        e.preventDefault()
        if (loading) return <p>LOADING...</p>;
        if (error) return <p>ERROR</p>;
        const { id, token, status } = data.login
        if (status === 'Found') {
            localStorage.setItem('id', id)
            localStorage.setItem('jwt', token)
            setAuth(id)
            setTimeout(() => router.push('/'), 500)
        }
        else {
            alert('Invalid email/password!')
        }
    }

    const handleSignup = e => {
        e.preventDefault()
        if (signup.cPassword !== signup.password) {
            alert("Confirm password doesn't match")
            return
        }
        if (status.loading) return <p>LOADING...</p>;
        if (status.error) return <p>ERROR</p>;
        const newUser = signup
        delete newUser.cPassword
        addUser({
            variables: newUser, onCompleted: (data) => {
                const { id, token, status } = data.addUser.login
                if (status === 'Found') {
                    localStorage.setItem('id', id)
                    localStorage.setItem('jwt', token)
                    setAuth(id)
                    setTimeout(() => router.push('/'), 500)
                }
            }
        })
        setSignup({ name: '', email: '', password: '', username: '', cPassword: '' })
        setTimeout(() => router.push('/'), 500)
    }

    return (
        <div className={styles.cntr}>
            <form className={styles.form} onSubmit={handleLogin}>
                LOGIN
                <Input
                    label='E-Mail'
                    type='email'
                    value={login.email}
                    onChange={e => setLogin({ ...login, email: e.target.value })}
                />
                <Input
                    label='Password'
                    type='password'
                    value={login.password}
                    onChange={e => setLogin({ ...login, password: e.target.value })}
                />
                <button type='submit'>Login</button>
            </form>
            <form className={styles.form_singup} onSubmit={handleSignup}>
                SINGUP
                <Input
                    label='Name'
                    type='text'
                    value={signup.name}
                    onChange={e => setSignup({ ...signup, name: e.target.value })}
                />
                <Input
                    label='E-Mail'
                    type='email'
                    value={signup.email}
                    onChange={e => setSignup({ ...signup, email: e.target.value })}
                />
                <Input
                    label='Username'
                    type='text'
                    value={signup.username}
                    onChange={e => setSignup({ ...signup, username: e.target.value })}
                />
                <Input
                    label='Password'
                    type='password'
                    value={signup.password}
                    onChange={e => setSignup({ ...signup, password: e.target.value })}
                />
                <Input
                    label='Confirm Password'
                    type='password'
                    value={signup.cPassword}
                    onChange={e => setSignup({ ...signup, cPassword: e.target.value })}
                />

                <button type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default index