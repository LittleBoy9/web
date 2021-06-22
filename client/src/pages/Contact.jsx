import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const Contact = () => {
  const history = useHistory();
  const [showContact, setShowContact] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const getContactData = async () => {
    try {
      const res = await fetch('/getuserdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json();

      if (res.status === 200) {
        setUserData({
          ...userData, name: data.name, email: data.email
        });
      }
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
    setShowContact(true);
  }

  useEffect(() => {
    getContactData();
  }, [])

  const handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData, [name]: value
    })
  }

  const contactForm = async (e) => {
    console.log("-------");
    e.preventDefault();
    const { name, email, message } = userData;

    console.log(name);
    console.log(email);
    console.log(message);

    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, message
      })
    });

    const data = await res.json();
    console.log(data);
    if (!data) {
      window.alert("Messsage Not Sent...");
    }
    else {
      window.alert("Messsage Sent");
      setUserData({
        ...userData, message: ""
      })
    }
  }

  return (
    <>
      { 
        showContact ?
          <div className="container d-flex justify-content-center">
            <div className="card shadow">
              <form method="POST">
                <div className="mt-3">
                  <label htmlFor="uName" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uName"
                    name="name"
                    value={userData.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="uEmail" className="form-label">Your Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uEmail"
                    name="email"
                    value={userData.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="uMsg" className="form-label">Message</label>
                  <textarea
                    rows="6"
                    className="form-control"
                    id="uMsg"
                    name="message"
                    value={userData.message}
                    onChange={handleInput}
                  />
                </div>
                <div className="m-3 text-center">
                  <Button
                    type="submit"
                    onClick={contactForm}
                  >
                    Send
                </Button>
                </div>
              </form>
            </div>
          </div>
        : <> </>
    }
    </>
  )
}
export default Contact;
