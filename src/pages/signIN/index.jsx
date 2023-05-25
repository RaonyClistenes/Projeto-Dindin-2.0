import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import { useState, useEffect, } from 'react'
import api from '../../api/api'
import { setItem, getItem } from '../../storage/storage'


export default function SignIN() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()

    async function login() {
        try {
            const form = {
                email: email,
                senha: password
            }
            if (!email || !password) {
                return
            }
            setAlert(false)
            const response = await api.post('/login', form)
            const token = await response.data.token
            setItem('token', token)
            navigate('/main')
        } catch (error) {
            if (error.response.status === 400) {
                setAlert(true)
            }
        }
    }
    function preventForm(e) {
        e.preventDefault()
    }
    useEffect(() => {
        const token = getItem('token')
        if (token) {
            navigate('/main')
        }
    }, [])

    return (
        <div className='container_login'>
            <header className='header_login'>
                <img className='logo' src={logo} alt="logo" />
                <h1 className='title'>Dindin</h1>
            </header>
            <section className='section_login'>
                <div className='login_apresentation'>
                    <h1 className='text_up'>Controle suas <span id='finanças_word'>finanças</span> sem planilha chata</h1>
                    <h3 className='text_last'>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância</h3>
                    <Link className='button_register' to={'/signup'}>
                        <button id='button_register'>Cadastre-se</button>
                    </Link>
                </div>
                <div className='container_form_login'>
                    <h1 id='login_name'>Login</h1>
                    <form onSubmit={preventForm} className='form_login'>
                        <label htmlFor="email_login">E-mail
                            <input className='input_form_login' id='email_login' onChange={(e) => setEmail(e.target.value)} type="email" />
                        </label>
                        <label htmlFor="password_login">Password
                            <input className='input_form_login' onChange={(e) => setPassword(e.target.value)} id='password_login' type="password" />
                        </label>
                        <button onClick={login} id='button_enter'>Entrar</button>
                        <span className={alert?'alert_password':'hide'}>E-mail ou senha incorreto</span>
                    </form>
                </div>
            </section>
        </div>
    )
}