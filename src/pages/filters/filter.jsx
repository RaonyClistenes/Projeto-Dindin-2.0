import './style.css'
import plus from './assets/plus.png'
import xis from './assets/xis.png'
import { useEffect, useState, useRef } from 'react'

export default function Filters({ valueApi, token, verify, setVerifyFilters, settransationsFiltereds, transationsFiltereds }) {
    const [arrayCategorys, setArraycategorys] = useState([])
    const filterRef = useRef(null)
    async function getCategorys() {
        try {
            const response = await valueApi.get('/categoria', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setArraycategorys(response.data)

        } catch (error) {
            console.log(error.message)
        }
    }

    function selection(e) {
        const categoryArray = transationsFiltereds[0] ? transationsFiltereds[0].split("&") : []
        if (categoryArray.includes(`filtro[]=${e.currentTarget.innerText}`)) {
            e.currentTarget.style.backgroundColor = '#ffffff'
            e.currentTarget.style.color = '#000000'
            e.currentTarget.children[1].src = plus
            let categorysClickFirst = [...categoryArray]
            categorysClickFirst = categorysClickFirst.filter(item => item !== `filtro[]=${e.currentTarget.innerText}`)
            const arrayCategorysDone = categorysClickFirst.join().replace(/,/g, '&').concat().replace(/\s/g, '')
            settransationsFiltereds([arrayCategorysDone])
            return
        }
        e.currentTarget.style.backgroundColor = '#7978D9'
        e.currentTarget.style.color = '#ffffff'
        e.currentTarget.children[1].src = xis
        const categorysClick = [...transationsFiltereds]
        categorysClick.push(`filtro[]=${e.currentTarget.innerText}`)
        const arrayCategorysDone = categorysClick.join().replace(/,/g, '&').concat().replace(/\s/g, '')
        settransationsFiltereds([arrayCategorysDone])
    }
    function resetFilters() {
        setVerifyFilters(false)
        settransationsFiltereds([])

        const arrayRefs = Object.values(filterRef)
        arrayRefs.map(item=>{
            item.style.backgroundColor = '#ffffff'
            item.style.color = '#000000'
            item.children[1].src = plus
        })
    }

    useEffect(() => {
        getCategorys()
    }, [token])

    return (
        <div className={verify ? 'container_filters' : 'hide'}>
            <h3 className='title_filter'>Categoria</h3>
            <div className='values_filters'>
                {arrayCategorys.map((value, index) =>
                    <div ref={(e) => filterRef[index] = e} className='filter' onClick={(e) => selection(e)} key={value.id}>
                        <p value={value.id} className='filter_name'>{value.descricao}</p>
                        <img src={plus} alt="" />
                    </div>
                )}
            </div>
            <div className='set_filters_buttons'>
                <button onClick={resetFilters} className='cleaner'>Limpar Filtros</button>
                <button onClick={() => setVerifyFilters(true)} className='set_filters'>Aplicar Filtros</button>

            </div>
        </div>
    )
}