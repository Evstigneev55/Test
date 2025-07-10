
// let USERS = [
//     {id: 1, name: 'Kon', surname: 'Kurosaki', age: 18},
//     {id: 2, name: 'Lina', surname: 'Maiden', age: 25},
//     {id: 3, name: 'io', surname: 'Ubutu', age: 210},
// ];


const Lesson_12 = () => {
    const onChangeInputElement = (event) => {
        console.log('On Change (Input) . value: ', event.target.value)
    }
    const onClickButtonElement = (event) => {
        alert(`ты посмел нажать на ${event.target}`)
    }
    const onSubmitFormElement = (event) => {
        event.preventDefault();
        console.log('khe khe, что-то не так?)', event)
    }
  return (
    <div>
      <form onSubmit={onSubmitFormElement}>
        testEvents
        <input
          placeholder="write here"
          onChange={onChangeInputElement}
        ></input>
        <button onClick={onClickButtonElement}>ЖМИ СКОРЕЕ!</button>
      </form>
    </div>
  );
};

export default Lesson_12;