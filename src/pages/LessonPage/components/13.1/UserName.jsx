const UserName = (props) => {
    const onClick = () => {
        props.changeName(props.userId, 'Admin');
    };
    console.log(props);
    return (
        props.userAge > 20 ? (
            <p className='hfueiqfheq'>
                {props.userName}&nbsp;
                <button onClick={onClick}>
                    Изменить имя
                </button>

                {/* <button onClick={props.changeName(props.userId, 'Admin')}>
                    Изменить имя
                </button> */}
            </p>
        ): (
            <p className='hfueiqfheq'>{props.userName} {props.userSurname}</p>
        )
    );
};

export default UserName;