import React,{ useState, useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';

import { userContext } from '../App';
import { useAlert } from 'react-alert';

const Login = () => {
  const {state, dispatch} = useContext(userContext);
  const alert = useAlert();

  const history = useHistory();

  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, pass
      })
    })

    const data = await res.json();

    console.log(data);

    if(res.status === 400 || !data){
      window.alert("Invalid ")
    }
    else{
      dispatch({
        type: 'USER',
        payload: true
      })
      //window.alert("Login done")
      alert.show('Login Successfull')
      history.push("/")
    }
  } 
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="card shadow border-0">
          <form method="POST">
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="inputEmail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPass" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="inputPass" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="btn btn-primary"
              onClick={ loginUser }
            >
              Login
            </Button>
          </form>
          <p className="mt-3">Don't have Account? <NavLink to='/registration'>Register Now</NavLink></p>
        </div>
      </div>
    </>
  )
}

export default Login
