import React from 'react';
import UserName from './UserName';

let USERS = [
    { id: 1, name: 'Alex', surname: 'test1', age: 20, passportId: 123 },
    { id: 2, name: 'Alex', surname: 'test2', age: 20, passportId: 66 },
    { id: 3, name: 'John', surname: 'test3', age: 56, passportId: 123 },
    { id: 4, name: 'Bob', surname: 'test4', age: 10, passportId: 50 },
];

const App = () => {
    const [_, forceUpdate] = React.useReducer(x => x + 1, 0);

    const changeName = (id, newName) => {
        console.log('id, newName в changeName: ', id, newName);
        USERS = USERS.map( user => user.id === id ? {...user, name: newName} : user ) 
        /* Выше более короткая запись этого: (user) => {
            if(user.id === id) {
              return {...user, name: newName}
            }
              return user    
        }
        */
        console.log(USERS);
        forceUpdate();
    };

    const newReactArray = [];
    USERS.forEach((user) => {
        const CustomKey = generateKey(user);

        newReactArray.push(
            <div key={CustomKey}>
                <UserName
                    userId={user.id}
                    userName={user.name}
                    userSurname={user.surname}
                    userAge={user.age}
                    changeName={changeName}
                />
            </div>
        );
    })

    return (
        <div>
            {newReactArray}
        </div>
    );
};

function generateKey(user) {
    return `${user.name}_${user.surname}_${user.age}_${user.passportId}`;
}

export default App;