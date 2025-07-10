const UserMeetComponent = (props) => {
    if (props.userAge > 20) {
        return (
            <>Пользователь &nbsp;
                <b className='adult'>
                    {props.userName} {props.userSurname}
                </b>
            &nbsp; прошёл верификацию 
            </>
        )
    } else {
        return (
            <> Малыха <b className='adult'> {props.userName} </b>, подожди ещё {21 - props.userAge} годика</>
        )
    }
}

export default UserMeetComponent;