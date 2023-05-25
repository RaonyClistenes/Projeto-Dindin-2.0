import { useEffect, useState } from 'react'
import closeButton from '../assets/+.png'
export default function PerfilEdiction({ valueApi, verifyModalPerfil, setVerifyPerfil, token }) {
    const [confirmPassword, setConfirmpassword] = useState('')
    const [messageSpan, setMessageSpan] = useState('"As senhas não correspodem"')
    const [passwordVerification, setPassordVerification] = useState(false)
    const [bodyEditionPerfil, setBodyPerfil] = useState({
        nome: '',
        email: '',
        senha: '',
    })

    async function editionPerfil() {
        try {
            if (confirmPassword !== bodyEditionPerfil.senha) {
                setPassordVerification(true)
                return
            }
            const response = await valueApi.put('/usuario', bodyEditionPerfil, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setConfirmpassword(false)
        } catch (error) {
        }
    }

    async function getValueUser() {
        try {
            const response = await valueApi.get('/usuario', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setBodyPerfil({ ...bodyEditionPerfil, nome: response.data.nome, email: response.data.email })

        } catch (error) {

        }
    }
    function handleChangeValue(e) {
        setBodyPerfil({ ...bodyEditionPerfil, [e.target.name]: e.target.value })

    }
    function formSubmit(e) {
        e.preventDefault()

    }
    function closeModal() {
        setVerifyPerfil(false)
    }
    
    useEffect(() => {
        getValueUser()
    }, [token])
    return (
        <div className={verifyModalPerfil ? 'fade' : 'hide'}>
            <div className="modal_add">
                <div className='header_modal'>
                    <p className="title_modal">Editar perfil</p>
                    <img onClick={closeModal} className="button_closed" src={closeButton} alt="" />
                </div>
                <form onSubmit={formSubmit} className='form_add'>
                    <label className='label_modal' htmlFor="valueAdd">Nome
                        <input value={bodyEditionPerfil.nome} name='nome' onChange={handleChangeValue} className='input_modal' id="valueAdd" type="text" />
                    </label>
                    <label className='label_modal' htmlFor="email_modal">E-mail
                        <input name='email' value={bodyEditionPerfil.email} onChange={handleChangeValue} className="input_modal" id="email_modal" type="email" />
                    </label>
                    <label className='label_modal' htmlFor="date_add">Senha
                        <input name='senha' value={bodyEditionPerfil.senha} className='input_modal' onChange={handleChangeValue} id="date_add" type="password" />
                    </label>
                    <label className='label_modal' htmlFor="dconfirm_password_modal">Confirmação de senha
                        <input value={confirmPassword} onChange={(e) => setConfirmpassword(e.target.value)} className='input_modal' id="confirm_password_modal" type="password" />
                    </label>
                    <span className={passwordVerification?'alert_password': 'hide'}>{messageSpan}</span>
                    <button onClick={editionPerfil} className='confirm_add'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}