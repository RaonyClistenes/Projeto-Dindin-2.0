import { useEffect } from 'react'
import './globalStyleModal.css'

export default function ModalTrash({ value, id, verify, setVerifyModalTrash, useref, token, update,updateSumary }) {
    function closeModalQuestion() {
        setVerifyModalTrash(false)
    }
   async function deleteItem() {
        try {
            const response = await value.delete(`/transacao/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            closeModalQuestion()
        } catch (error) {
            
        }
    }
    useEffect(() => {
        update()
        updateSumary()
    }, [!verify])
    return (
        <div ref={useref} className={verify ? 'container_question_delete' : 'hide'}>
            <p className='delete_item'>Apagar item?</p>
            <div className='select_reply'>
                <button onClick={deleteItem} className='yes'>Sim</button>
                <button onClick={closeModalQuestion} className='no'>Não</button>
            </div>
        </div>
    )
}
