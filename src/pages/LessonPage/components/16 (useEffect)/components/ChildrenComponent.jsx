import { useState ,useEffect } from "react"


const ChildrenComponent = ({count}) => {
    const [isAvailableSale, setStateSale] = useState(false);


    // Здесь, в React.useEffect() Реакт следит за отрисовкой и удалением компонента, т.к. [] пустые
    useEffect(() => {
        console.log('Тарас породил <div> елемент')

        return (() => {console.log('Он его и уничтожит!')})
    }, [])

    // FIXME: здесь можно сделать запрос на сервер по поводу скидки через .fetch 
    useEffect(() => {
        console.log('Изменилось состояние переменной счётчика')

        count > 9 ? setStateSale((curState) => true) : setStateSale((curState) => false)
    }, [count]);
    
    return (
        <>
            <div>Я родился {count}_- </div>
            
            {isAvailableSale && (<h3>
                Поздравляем, Вы набрали {count} товаров в корзину и теперь Вам доступна скидка FIXME(19 строка)%
                </h3>)
            }
        </>
    )
}

export default ChildrenComponent