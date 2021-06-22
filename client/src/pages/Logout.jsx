import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { userContext } from '../App';

const Logout = () => {
  const {state, dispatch} = useContext(userContext);

  const history = useHistory();
  useEffect(() => {
    fetch('/logout',{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then(res => {
        dispatch({
          type: 'USER',
          payload: false
        })
        history.push('/login',{ replace: true });
        if(res.status !== 200){
          const error = new Error(res.error);
        }
    }).catch(err => {
      console.log(err);
    })
  }, [])
  return (
    <>
      
    </>
  )
}

export default Logout;
