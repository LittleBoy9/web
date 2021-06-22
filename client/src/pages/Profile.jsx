import React, { useEffect, useState } from 'react'
import profile from '../asets/images/profile.png';
import man from '../asets/images/man.png';
import india from '../asets/images/india.png';
import { Tab, Tabs } from 'react-bootstrap';
import { useHistory, NavLink } from 'react-router-dom';

const Profile = () => {
   const history = useHistory();
   const [showProfile, setShowProfile] = useState(false);
   const [userDetail, setUserDetail] = useState({});
   const [profileData, setProfileData] = useState({
      name:"",
      phone:"",
      email:""
   });

   const getProfileData = async () => {
      try{
         const res = await fetch('/getuserdata',{
            method: "GET",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json"
            },
            credentials: "include"
         })

         console.log(res);
         const data = await res.json();
       // console.log(data);
         

         // if(!res.status !== 200){
         //    const error = new Error(res.error);
         //    throw error;
         // }
         if(res.status === 200){
            setProfileData({
              ...profileData, name: data.name, phone: data.phone, email: data.email
            });
         }

         setUserDetail(data);


      }catch(err){
         console.log(err);
         history.push('/login');
      }
      setShowProfile(true);
   }

   useEffect(() => {
     getProfileData();
   }, [])

   const handleInput = (e) => {
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      setProfileData({
         ...profileData, [name]: value
      })
   }

   const updateData = async (e) => {
      e.preventDefault();
      const { name, email, phone } = profileData;
      const photo = photo;
      try{
         const res = await fetch('/updateprofile',{
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name, email, phone
            })
         })
         const data = await res.json();
         //setButtonLabel(data.image);
         if(res.status === 200){
            window.alert("Updated succesfull, please Login again");
            history.push('/logout')
         }
         else{
            window.alert("Updated not succesfull")
         }
      }catch(err){
         console.log(err);
      }
   }

   
   return (
      <>{
         showProfile ? 
            <div className="container p-3">
               <div className="profile-card shadow m-3 p-3 bg-light">
                  <div className="row">
                     <div className="col-md-4 col-12 text-center">
                        <img src={man} alt="profile" className="profile-img"/>                     
                     </div>
                     <div className="col-md-8 col-12">
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                           <Tab eventKey="home" title="Profile">
                              <span className="d-flex">
                                 <b className="m-3">NAME</b>
                                 <p className="m-3">{ userDetail.name }</p>
                              </span>
                              <span className="d-flex">
                                 <b className="m-3">EMAIL</b>
                                 <p className="m-3">{ userDetail.email }</p>
                              </span>
                              <span className="d-flex">
                                 <b className="m-3">PHONE</b>
                                 <p className="m-3">{ userDetail.phone }</p>
                              </span>
                              <span className="d-flex">
                                 <b className="m-3 mt-5 nationality">Indian
                                 <img src={india} alt="flag" className="flag"/> </b>
                              </span><br/>
                           </Tab>
                           <Tab eventKey="profile" title="Edit Profile">
                              <form method="POST">
                                 <div className="row">
                                    <div className="col-lg-6 col-md-5 col-12">
                                       <div className="mt-3">
                                          <label htmlFor="inputName" className="form-label">Name</label>
                                          <input 
                                             type="name" 
                                             className="form-control" 
                                             id="inputName" 
                                             name="name"
                                             value={ profileData.name }
                                             onChange={ handleInput }
                                          />
                                       </div>
                                    </div>  
                                    <div className="col-lg-6 col-md-6 col-12">
                                       <div className="mt-3">
                                          <label htmlFor="inputPhone" className="form-label" >Phone</label>
                                          <input 
                                             type="number" 
                                             className="form-control" 
                                             id="inputPhone" 
                                             name="phone"
                                             value={ profileData.phone }
                                             onChange={ handleInput }
                                          />
                                       </div>
                                    </div>                           
                                 </div>
                                                         
                                 <div className="row">
                                    <div className="col-lg-6 col-md-5 col-12">
                                       <div className="mt-3">
                                          <label htmlFor="email" className="form-label">Your Email</label>
                                          <input 
                                             type="email" 
                                             className="form-control" 
                                             id="email" 
                                             name="email"
                                             value={ profileData.email }
                                             onChange={ handleInput }
                                          />
                                       </div>
                                    </div>
                                    {/* <div className="col-lg-6 col-md-5 col-12">
                                       <div className="mt-3">
                                          <label htmlFor="photo" className="form-label">Change Photo</label>
                                          <input 
                                             type="file" 
                                             className="form-control" 
                                             id="photo" 
                                             name="photo"  
                                             accept="image/*"
                                             value={ photo }
                                             onChange= { handleInput }                                  
                                          />
                                       </div>
                                    </div>                                 */}
                                 </div>
         
                                 <button type="submit" className="btn btn-primary mt-5" onClick={ updateData }>
                                    Update
                                    </button>                                                       
                              </form>

                              <div className="mt-3">
                                 <NavLink to='/updatepass'>Change Password</NavLink>
                              </div>
                              
                           </Tab>
                        </Tabs>
                     </div>
                  </div>
               </div>
            </div>
         : <></>
         }
      </>
   )
}

export default Profile
