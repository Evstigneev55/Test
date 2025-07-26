import { useState } from "react";

const LoginPage = () => {
  const [objUserInput, changeUserInputText] = useState({ login: '', password: ''});
  // const [passwordInputText, changePasswordInputText] = useState('');

  const onChangeInputLogin = (event) => {
    changeUserInputText((objUser) => ({
      ...objUser,
      login: event.target.value
    }));
    // changeLoginInputText(event.target.value)
  };
  const onChangeInputPassword = (event) => {
    changeUserInputText( (objUser) => ({
      ...objUser, 
      password: event.target.value
    }));
  };
  return (
    <div>
      <input type="text" placeholder="Впишите ваш логин" onChange={onChangeInputLogin} />
      <input type="password" placeholder="парол" onChange={onChangeInputPassword}/>

      <h2 key={'loginShowElement'}>Login: {objUserInput.login}</h2>
      <h3 key={'passwordShowElement'}>Password: {objUserInput.password}</h3>
    </div>
  );
};

export default LoginPage;