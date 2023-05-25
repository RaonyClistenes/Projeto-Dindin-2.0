import './globalStyleModal.css'
import closeButton from '../assets/+.png'
import { useEffect, useState } from 'react'
export default function Addregister({ valueApi, openModal, closedModalbutton, token, updateDescrition, updateSummary, transations }) {

    const [bodyAddTransation, setbodyAddTransation] = useState({
        tipo: 'saida',
        descricao: '',
        valor: '',
        data: '',
        categoria_id: 1
    })
    const [dateTable, setDateTable] = useState([
        { id: '', descricao: '' }
    ])
    const [typeButton, setTypeButton] = useState('')

    async function addTransaction(e) {
        try {
            const response = await valueApi.post('/transacao', bodyAddTransation, {
                headers: { Authorization: `Bearer ${token}` }
            })

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

    function closedModal() {
        closedModalbutton(false)
    }
    function handleFormInput(e) {
        setbodyAddTransation({ ...bodyAddTransation, [e.target.name]: e.target.value })

    }
    function clickButtonSelected() {
        setTypeButton(bodyAddTransation.tipo)
    }
    function submitForm(e) {
        e.preventDefault()
        setbodyAddTransation({ ...bodyAddTransation, valor: '', data: '', descricao: '' })
        closedModal()
    }
   
  
    useEffect(() => {
        categoryApi()
    }, [token])

    useEffect(() => {
        updateDescrition()
        updateSummary()
    }, [transations])

    useEffect(() => {
        clickButtonSelected()
    },[])
    return (
        <div className={openModal ? 'fade' : 'hide'}>
            <div className="modal_add">
                <div className='header_modal'>
                    <p className="title_modal">Adicionar Registro</p>
                    <img className="button_closed" onClick={closedModal} src={closeButton} alt="" />
                </div>
                <div onClick={clickButtonSelected} className="button_select">
                    <button onClick={handleFormInput} name='tipo' value={'entrada'} className={typeButton == 'entrada' ? 'selected_enter' : 'selected_disable_enter'}>Entrada</button>
                    <button onClick={handleFormInput} name='tipo' value={'saida'} className={typeButton == 'saida' ? 'selected_out' : 'selected_disable_out'}>Saída</button>
                </div>
                <form onSubmit={submitForm} className='form_add'>
                    <label className='label_modal' htmlFor="valueAdd">Valor
                        <input placeholder='R$ 100' value={bodyAddTransation.valor} onChange={handleFormInput} name='valor' className='input_modal' id="valueAdd" type="text" />
                    </label>
                    <label className='label_modal' htmlFor="select_category">Categoria
                        <select value={bodyAddTransation.categoria_id} onChange={handleFormInput} className='select_modal' name="categoria_id" id="select_category">
                            {dateTable.map(category =>
                                <option key={category.id} value={category.id}>{category.descricao}</option>
                            )}
                        </select>
                    </label>
                    <label className='label_modal' htmlFor="date_add">Data
                        <input value={bodyAddTransation.data} onChange={handleFormInput} name='data' className='input_modal' id="date_add" type="date" />
                    </label>
                    <label className='label_modal' htmlFor="description_add">Descrição
                        <input value={bodyAddTransation.descricao} onChange={handleFormInput} name='descricao' className='input_modal' id="description_add" type="text" />
                    </label>
                    <button type='submit' onClick={() => addTransaction()} className='confirm_add'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}