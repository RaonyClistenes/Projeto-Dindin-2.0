import './style.css'
import { Link } from 'react-router-dom'
import logo from './assets/logo.png'
import { useEffect, useState } from 'react'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [nome, setName] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [verify, setVerify] = useState(false)
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
    }
    async function handleRegister() {
        try {
            const formUser = {
                nome: nome,
                email: email,
                senha: senha
            }
            if (!nome || !senha || !email || !confirmPassword) {
                setVerify(false)
                return
            }
            if (senha !== confirmPassword) {
                setAlert(true)
                return
            }
            const response = await api.post('/usuario', formUser)
            setAlert(false)

            if (response.status == 201) {
                setVerify(true)
                navigate('/')
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        handleRegister()
    }, [])
    return (
        <div className='container_register'>
            <header className='header_login'>
                <img className='logo' src={logo} alt="logo" />
                <h1 className='title'>Dindin</h1>
            </header>
            <section className='section_register'>
                <form onSubmit={(e) => handleSubmit(e)} className='form_register' action="">
                    <h1 className='register_name'>Cadastre-se</h1>
                    <label htmlFor="input_name"> Nome
                        <input className='input_form' onChange={(e) => setName(e.target.value)} id='input_name' type="text" />
                    </label>
                    <label htmlFor="input_email">E-mail
                        <input className='input_form' onChange={(e) => setEmail(e.target.value)} id='input_email' type="email" />
                    </label>
                    <label htmlFor="input_password">Senha
                        <input className='input_form' onChange={(e) => setPassword(e.target.value)} id='input_password' type="password" />
                    </label>
                    <label htmlFor="input_password_confirm">Confirmação de senha
                        <input className='input_form' onChange={(e) => setConfirmPassword(e.target.value)} id='input_password_confirm' type="password" />
                    </label>
                    <span className={alert ? 'alert_password' : 'hide'}>As senhas não conferem!</span>
                        <button className='button_register' onClick={handleRegister} type='submit'>Cadastrar</button>
                    <Link className='question_register' to={'/'}>
                        <p>Já tem cadastro? Clique aqui!</p>
                    </Link>
                </form>
            </section>
        </div>
    )
}