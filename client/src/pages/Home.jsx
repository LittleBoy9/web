import React, { useState, useEffect } from 'react';

const Home = () => {
  const [userName, setUserName] = useState(null);
  const [showHome, setShowHome] = useState(false);

  const getHomeData = async () => {
    try{
       const res = await fetch('/getuserdata',{
          method: "GET",
          headers: {
             "Content-Type": "application/json"
          }
       })

      // console.log(res);
      // console.log(res.status);
       const data = await res.json();
       //console.log(data);
    
       if(res.status === 200){
        setUserName(data.name.split(" ")[0].toUpperCase());
       }
    }catch(err){
       console.log(err);
    }
    setShowHome(true);
  }

  useEffect(() => {
    getHomeData();
  }, [])

  return (
    <>{
      showHome ? 
        <div className="bg-light row h-100 justify-content-center align-items-center">     
          {
            userName == null ? 
            <h1 className="text-center text-secondary">
              <span className="m">M</span>
              <span className="e">E</span>
              <span className="r">R</span>
              <span className="n">N</span>
              <span className="m-3">Stack</span>
            </h1> : 
              <h1 className="text-center text-secondary"><span className="welcome">Welcome</span><span className="text-primary username">{userName}</span></h1>
          }        
        </div>
        : <></>
      }
    </>
  )
}
export default Home