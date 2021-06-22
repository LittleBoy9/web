import React, { useState } from 'react'
import { NavLink , useHistory} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Registration = () => {
  const history = useHistory();
  const [user,setUser] = useState({
   name: "", email: "",phone: "",pass: ""
  })

  let name,value;
  const handleInputs =  (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value
    })
  }

  const postData = async (e) => {
    e.preventDefault();
    const {name, email, phone, pass} = user;

    const res = await fetch("/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, pass
      })
    });

    const data = await res.json();

    console.log(data);

    if(data.status === 422 || !data){
      window.alert("Invalid Registration")
    }
    else if(data === "Email already exist"){
      window.alert("You have an account on this Email, please login");
      history.push("/login");
    }
    else{
      window.alert("Registration Successful");
      history.push("/login");
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="card shadow border-0">
          <form method="POST">
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="inputName" 
                value={user.name} 
                name="name"
                onChange={handleInputs}
                autoComplete="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="inputEmail" 
                name="email"
                value={user.email} 
                onChange={handleInputs}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">Phone</label>
              <input 
                type="text" 
                className="form-control" 
                id="inputPhone"
                name="phone"
                maxLength="10"
                pattern="[0-9]"
                value={user.phone} 
                onChange={handleInputs}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPass" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="inputPass" 
                name="pass"
                value={user.pass} 
                onChange={handleInputs}
              />
            </div>
            <Button type="submit" className="btn btn-primary" onClick={ postData }>Register</Button>
          </form>
          <p>Allready have an Account? <NavLink to="/login">Login Now</NavLink></p>
        </div>
      </div>
    </>
  )
}

export default Registration
