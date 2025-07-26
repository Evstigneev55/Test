import UserMeetComponent from './UserName';

const USERS = [
  {id: 1, name: 'Kon', surname: 'Kurosaki', age: 18},
  {id: 2, name: 'Lina', surname: 'Maiden', age: 25},
  {id: 3, name: 'io', surname: 'Ubutu', age: 210},
];


const Lesson_11 = () => {
  const changeName = (arrUsers, id, newName) => {
    return arrUsers.map( (user) => {
      if (user.id === id) {
        return {
          ...user,
          name: newName
        };
      } return user;
    });};

  const changeArrUserName = (changeArr, id, newName) => {
    changeArr.forEach( (user) => {
      if (user.id === id) {
        user.name = newName;
      }
    });
  };
    
  changeName(USERS, 2, 'Cry'); // меняю имя по АйДиДи

  const arrReactMeeting = [];
    
  USERS.forEach( (user) => {
    const Unic_key = generateCustomKey(user);
        
    arrReactMeeting.push(
      <div key={Unic_key}>
        <UserMeetComponent 
          changeArrUserName={changeArrUserName}
          userName={user.name}
          userSurname={user.surname}
          userAge={user.age}
        />
      </div>
    );
  });
    
  return arrReactMeeting;
};

function generateCustomKey(objUser) {
  return `${objUser.name}_${objUser.surname}_${objUser.age}`;
}

export default Lesson_11;