import Axios from "axios";
import React,{useState} from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [formValue,setFormValue] = useState({})
  const onSubmit = async(event)=> {
    event.preventDefault()
    Axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/login`, formValue).then(() => {
      console.log('login sukses');
    }).catch(() => {
      console.log('invalid credential');
    })
  }

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormValue({
      ...formValue,
      [name]:value
    })
  }

  return (
    <div className="login-form">
      <form  noValidate onSubmit={onSubmit}>
        <label htmlFor="inputEmail">E-mail</label>
        <input
          type="email"
          id="inputEmail"
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
