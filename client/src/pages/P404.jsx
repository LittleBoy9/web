import React from 'react'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const P404 = () => {
  return (
    <div className="row h-100 bg-light justify-content-center align-items-center">
      <p className="text-center four-zero-four">404, Page Not Found<br></br>
      <NavLink to="/"><Button className="m-3" variant="outline-secondary">Back To HomePage</Button></NavLink>
      </p>       
    </div>
  )
}

export default P404
