import { useMutation, useQuery } from "@apollo/client"
import Head from 'next/head'
import { useState } from "react"
import { useRouter } from 'next/router'
import { loginQ, addUserM } from "../../gql/queries"
import { useAuthContext } from '../../context/auth'
import Input from "../../components/Input"
import Button from "../../components/Button3"

const index = () => {
    const [auth, setAuth] = useAuthContext()
    const [type, setType] = useState('password')

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
        <>
            <div>
                <Head>
                    <title>Auth</title>
                </Head>
            </div>
            <div className="section">
                <div class="container">
                    <div class="row full-height justify-content-center">
                        <div class="col-12 text-center align-self-center">
                            <div class="section text-center">

                                <h6 class="mb-0 pb-3"><span>Log In</span><span>Sign Up</span></h6>

                                <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label for="reg-log"></label>

                                <div class="card-3d-wrap mx-auto">

                                    <div class="card-3d-wrapper">
                                        <div class="card-front">
                                            <div class="center-wrap">
                                                <div class="section text-center">
                                                    <h4 class="mb-4 pb-3">Log In</h4>

                                                    <div class="form-group">
                                                        <Input
                                                            label='Your Mail'
                                                            type='email'
                                                            value={login.email}
                                                            onChange={e => setLogin({ ...login, email: e.target.value })}
                                                        />
                                                        <i class="input-icon uil uil-at"></i>
                                                    </div>

                                                    <div class="form-group mt-2">
                                                        <Input
                                                            label='Password'
                                                            type={type}
                                                            value={login.password}
                                                            onChange={e => setLogin({ ...login, password: e.target.value })}
                                                        />
                                                        <i class="input-icon uil uil-lock-alt"
                                                            onClick={() => setType(old => old == 'text' ? 'password' : 'text')}
                                                        ></i>
                                                    </div>

                                                    <Button onClick={handleLogin}>submit</Button>
                                                    <p class="mb-0 mt-4 text-center">
                                                        <a href="#0" class="link">
                                                            Forgot your password?
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-back">
                                            <div class="center-wrap">
                                                <div class="section text-center">
                                                    <h4 class="mb-4 pb-3">Sign Up</h4>

                                                    <div class="form-group">
                                                        <Input
                                                            label='Name'
                                                            type='text'
                                                            value={signup.name}
                                                            onChange={e => setSignup({ ...signup, name: e.target.value })}
                                                        />
                                                        <i class="input-icon uil uil-user"></i>
                                                    </div>

                                                    <div class="form-group mt-2">
                                                        <Input
                                                            label='Username'
                                                            type='text'
                                                            value={signup.username}
                                                            onChange={e => setSignup({ ...signup, username: e.target.value })}
                                                        />
                                                        <i class="input-icon uil uil-user"></i>
                                                    </div>

                                                    <div class="form-group mt-2">
                                                        <Input
                                                            label='Your Mail'
                                                            type='email'
                                                            value={signup.email}
                                                            onChange={e => setSignup({ ...signup, email: e.target.value })}
                                                        />
                                                        <i class="input-icon uil uil-at"></i>
                                                    </div>

                                                    <div class="form-group mt-2">
                                                        <Input
                                                            label='Password'
                                                            type={type}
                                                            value={signup.password}
                                                            onChange={e => setSignup({ ...signup, password: e.target.value })}
                                                        />
                                                        <i class="input-icon uil uil-lock-alt"></i>
                                                    </div>

                                                    <div class="form-group mt-2">
                                                        <Input
                                                            label='Confirm Password'
                                                            type={type}
                                                            value={signup.cPassword}
                                                            onChange={e => setSignup({ ...signup, cPassword: e.target.value })}
                                                        />
                                                        <i class="input-icon uil uil-lock-alt"></i>
                                                    </div>

                                                    <Button onClick={handleSignup}>submit</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default index