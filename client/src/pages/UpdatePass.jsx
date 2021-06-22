import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';

const UpdatePass = () => {
  const history = useHistory();
  const [disable, setDisable ] = useState(true);
  const [password, setPassword ] = useState('');
  const [newPass, setNewPass] = useState('');

  const getData = async () => {
    try{
      const res = await fetch('/getuserdata',{
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         }
      })

      const data = await res.json();
      console.log(data);
   
      if(res.status === 200){
        const dbPass = data.pass;
      }
   }catch(err){
      console.log(err);
   }
  }
  useEffect(() => {
    getData();
  }, [])

  const checkPass = async () => {
      console.log(password);
      try{
        const response = await fetch('/checkpass',{
           method: "POST",
           headers: {
              "Content-Type": "application/json"
           },
           body: JSON.stringify({
            password
           })
        })
  
        const responseData = await response.json();
        console.log(responseData);
     
        if(response.status === 201){
          setPassword('');
          setDisable(false);
        }
        else{
          window.alert("password not matched")
        }
     }catch(err){
        console.log(err);
     }
  }

  const updatePassword = async () => {
    console.log(newPass);
    try{
      const response = await fetch('/updatepass',{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newPass
        })
      })

      const resdata = await response.json();

      if(response.status === 200){
        window.alert("Password updated, please login again");
        history.push('/login');
      }
    }catch(err){
      console.log(err);
    }


  }

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="card shadow border-0">
          { disable ?

            <form method="POST">
              <label htmlFor="inputEmail" className="form-label">Current Password</label>
              <div className="input-group mb-3">   
                  <input 
                    type="password" 
                    className="form-control" 
                    aria-describedby="check" 
                    disabled={ !disable }
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                    <button 
                      className="btn btn-secondary" 
                      type="button" 
                      id="check"
                      onClick={ checkPass }>Check
                    </button>             
              </div>
            </form> : <></>
          }
            <form >
              <div className="mb-3">
                <label htmlFor="inputPass" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPass"
                  disabled={ disable }
                  onChange={(e)=> setNewPass(e.target.value)}
                />
              </div>
              <Button type="button" className="btn btn-primary" onClick={ updatePassword }>Update</Button>
            </form>
        </div>
        </div>
      
    </>
  )
}
export default UpdatePass
