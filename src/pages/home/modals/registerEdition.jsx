import { useState, useEffect } from 'react'
import closeButton from '../assets/+.png'

export default function RegisterEdiction({ valueApi, token, verifyModalEditionReg, setVerifyEditionReg, valuesTrasation, idTransation, updateSummary, updateDescrition }) {
    const [bodyAddTransation, setbodyAddTransation] = useState({
        tipo: 'entrada',
        descricao: '',
        valor: '',
        data: '',
        categoria_id: ''
    })
    const [dateTable, setDateTable] = useState([
        { id: '', descricao: '' }
    ])
    const [typeButton, setTypeButton] = useState('')
    
    async function editionTransaction() {
        try {
            const id = valuesTrasation.find(item => item.id === idTransation)
            const response = await valueApi.put(`/transacao/${id.id}`, bodyAddTransation, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (error) {

        }
    }
    async function getValuesTransation() {
        try {
            const id = valuesTrasation.find(item => item.id === idTransation)
            const response = await valueApi.get(`/transacao/${id.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await response.data
            setbodyAddTransation({ ...bodyAddTransation, descricao: data.descricao, categoria_id: data.categoria_id, valor: data.valor, data: data.data.slice(0, 10).replace(/-/g, '/'), tipo: data.tipo })
        } catch (error) {
            
        }
    }
    async function categoryApi() {
        try {
            const response = await valueApi.get('/categoria', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setDateTable(response.data)
        } catch (error) {
            
        }
    }

    function closedModalReg() {
        setVerifyEditionReg(false)
    }
    function handleFormInput(e) {
        setbodyAddTransation({ ...bodyAddTransation, [e.target.name]: e.target.value })
    }
    function clickButtonSelected() {
        setTypeButton(bodyAddTransation.tipo)       
    }
    function submitForm(e) {
        e.preventDefault()
        setbodyAddTransation({ ...bodyAddTransation, valor: '', categoria_id: '', data: '', descricao: '' })
        closedModalReg()
    }
    useEffect(() => {
        categoryApi()
    }, [token,bodyAddTransation.tipo])
    useEffect(() => {
        updateDescrition()
        updateSummary()
    }, [verifyModalEditionReg])
    useEffect(() => {
        getValuesTransation()
    }, [idTransation])
    useEffect(()=>{       
        clickButtonSelected()
    },[bodyAddTransation.tipo])
    return (
        <div className={verifyModalEditionReg ? 'fade' : 'hide'}>
            <div className="modal_add">
                <div className='header_modal'>
                    <p className="title_modal">Editar Registro</p>
                    <img className="button_closed" onClick={closedModalReg} src={closeButton} alt="" />
                </div>
                <div onClick={clickButtonSelected} className="button_select">
                    <button onClick={handleFormInput} name='tipo' value={'entrada'} className={typeButton == 'entrada' ? 'selected_enter' : 'selected_disable_enter'}>Entrada</button>
                    <button onClick={handleFormInput} name='tipo' value={'saida'} className={typeButton == 'saida' ? 'selected_out' : 'selected_disable_out'}>Saída</button>
                </div>
                <form onSubmit={submitForm} className='form_add'>
                    <label className='label_modal' htmlFor="valueAdd">Valor
                        <input placeholder='R$ 100' value={bodyAddTransation.valor} onChange={handleFormInput} name='valor' className='input_modal' id="valueAdd" type="number" />
                    </label>
                    <label className='label_modal' htmlFor="select_category">Categoria
                        <select value={bodyAddTransation.categoria_id} onChange={handleFormInput} className='select_modal' name="categoria_id" id="select_category">
                            {dateTable.map(category =>
                                <option key={category.id} value={category.id}>{category.descricao}</option>
                            )}
                        </select>
                    </label>
                    <label className='label_modal' htmlFor="date_add">Data
                        <input value={bodyAddTransation.data} onChange={handleFormInput} name='data' className='input_modal' id="date_add" type="text" />
                    </label>
                    <label className='label_modal' htmlFor="description_add">Descrição
                        <input value={bodyAddTransation.descricao} onChange={handleFormInput} name='descricao' className='input_modal' id="description_add" type="text" />
                    </label>
                    <button type='submit' onClick={() => editionTransaction()} className='confirm_add'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}