import './style.css'
import logo from './assets/logo.png'
import avatar from './assets/avatar.png'
import logoutIMG from './assets/arrow-back.png'
import filter from './assets/filtro.png'
import pencil from './assets/pencil.png'
import trash from './assets/trash.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getItem, removeItem } from '../../storage/storage'
import api from '../../api/api'
import Addregister from './modals/addRegister'
import PerfilEdiction from './modals/perfilEdition'
import RegisterEdiction from './modals/registerEdition'
import ModalTrash from './modals/delete'
import { useRef } from 'react'
import Filters from '../filters/filter'


export default function Main() {
    const token = getItem('token')
    const [nameUser, setNameUser] = useState('')
    const [VerifyModalAdd, setVerifyModalAdd] = useState(false)
    const [VerifyModalPerfil, setVerifyModalPerfil] = useState(false)
    const [verifyModalEditionReg, setVerifyEditionReg] = useState(false)
    const [transations, setTransations] = useState([])
    const [resumeTransactions, setResumeTransactions] = useState({})
    const [idTransation, setIdTransation] = useState(null)
    const [verifyModalTrash, setVerifyModalTrash] = useState(false)
    const arrayDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const modalTrashRef = useRef(null)
    const [verifyFilter, setVerifyFilter] = useState(false)
    const [filterTransations, setFilterTransations] = useState(false)
    const [transationsFiltereds, setTransationsFiltereds] = useState([])

    async function dateUser() {
        try {
            const responseUser = await api.get(`/usuario`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setNameUser(responseUser.data.nome)
        } catch (error) {

        }
    }
    async function getTransaction() {
        try {
            if (!filterTransations) {
                const responseDefault = await api.get('/transacao', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTransations(responseDefault.data)
            } else {

                const responseFilters = await api.get(`/transacao?${transationsFiltereds.toString()}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTransations(responseFilters.data)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    async function ResumeTransactiosDate() {
        try {
            const response = await api.get('/transacao/extrato', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setResumeTransactions(response.data)
        } catch (error) {
        }
    }
    function logout() {
        removeItem('token')
    }
    function openModalAdd() {
        setVerifyModalAdd(true)
    }
    function openModalPerfil() {
        setVerifyModalPerfil(true)
    }
    function openModalEditionReg() {
        setVerifyEditionReg(true)
    }
    function getDayName(day) {
        return day.getDay()
    }
    function chooseFilters() {
        if (verifyFilter) {
            setVerifyFilter(false)
        } else {
            setVerifyFilter(true)
        }
    }
    function formatDate(value){
        const date = new Date(value)
        return `${date.getDate().toString().padStart(2,"0")}/${date.getMonth().toString().padStart(2,"0")}/ ${date.getFullYear()}`
    }
    useEffect(() => {
        dateUser()
        ResumeTransactiosDate()
        getTransaction()
    },[])

    useEffect(() => {
        getTransaction()
    }, [filterTransations])
    function openModalVerifyTrash(e) {
        setVerifyModalTrash(true)
        const valueXTrash = e.currentTarget.offsetTop
        const valueYTrash = e.currentTarget.offsetLeft
        modalTrashRef.current.style.top = `${valueXTrash + 30}px`
        modalTrashRef.current.style.left = `${valueYTrash - 40}px`
    }
    return (
        <div className='container_main'>
            <header className='header_main'>
                <div className='icon_logo'>
                    <img className='logo' src={logo} alt="logo" />
                    <h1 className='title'>Dindin</h1>
                </div>
                <div className='name_logout'>
                    <img className='avatar' onClick={openModalPerfil} src={avatar} alt="avatar" />
                    <span className='name_user'>{nameUser}</span>
                    <Link to={'/'}>
                        <img onClick={logout} className='logout' src={logoutIMG} alt="logout" />
                    </Link>
                </div>
            </header>
            <div className='container_filter'>
                <div onClick={chooseFilters} className='filter'>
                    <img className='icon_filter' src={filter} alt="filter" />
                    <h5 className='name_filter'>Filtrar</h5>
                </div>
            </div>
            <Filters valueApi={api} token={token} transationsFiltereds={transationsFiltereds} verify={verifyFilter} settransationsFiltereds={setTransationsFiltereds} setVerifyFilters={setFilterTransations} />
            <section className='section_main'>
                <div className='description'>
                    <table className='table_description'>
                        <thead>
                            <tr className='topic'>
                                <th>Data</th>
                                <th>Dia da semana</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Valor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transations.map((dateTransation, index) =>
                                <tr className='values_topics' onClick={() => setIdTransation(dateTransation.id)} key={dateTransation.id}>
                                    <td className='td_value'>{formatDate(dateTransation.data.slice(0, 10).replace(/-/g, '/'))}</td>
                                    <td className='td_value'>{arrayDays[getDayName(new Date(dateTransation.data.slice(0, 10).replace(/-/g, '/')))]}</td>
                                    <td className='td_value'>{dateTransation.descricao}</td>
                                    <td className='td_value'>{dateTransation.categoria_nome}</td>
                                    <td className={dateTransation.tipo === 'entrada' ? 'td_value positive' : 'td_value negative'}>{parseFloat(dateTransation.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}</td>
                                    <td className='icons_table'><img className='icon_pencil' onClick={openModalEditionReg} src={pencil} alt="pencil" /><img className='icon_trash' src={trash} onClick={(e) => openModalVerifyTrash(e)} alt="trash" /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='container_summary'>
                    <div className='summary'>
                        <h1 className='title_resume'>Resumo</h1>
                        <div className='container_inputs_outputs'>
                            <p className='input'>Entradas <span className='positive_value'>{parseInt(resumeTransactions.entrada).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}</span></p>
                            <p className='output'>Saídas <span className='negative_value'>{parseInt(resumeTransactions.saida).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}</span></p>
                        </div>
                        <div className='container_balance'><p className='balance'>Saldo <span className='value_balance'>{(+resumeTransactions.entrada - resumeTransactions.saida).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}</span></p></div>
                    </div>
                    <div>
                        <button className='button_add_reg' onClick={openModalAdd}>Adicionar registro</button>
                    </div>
                </div>
            </section>
            <Addregister valueApi={api} openModal={VerifyModalAdd} transations={transations} updateSummary={ResumeTransactiosDate} updateDescrition={getTransaction} closedModalbutton={setVerifyModalAdd} token={token} />
            <RegisterEdiction valueApi={api} token={token} updateSummary={ResumeTransactiosDate} updateDescrition={getTransaction} setVerifyEditionReg={setVerifyEditionReg} verifyModalEditionReg={verifyModalEditionReg} valuesTrasation={transations} idTransation={idTransation} />
            <PerfilEdiction valueApi={api} verifyModalPerfil={VerifyModalPerfil} setVerifyPerfil={setVerifyModalPerfil} token={token} />
            <ModalTrash token={token} update={getTransaction} updateSumary={ResumeTransactiosDate} useref={modalTrashRef} verify={verifyModalTrash} value={api} id={idTransation} setVerifyModalTrash={setVerifyModalTrash} />
        </div>
    )
}