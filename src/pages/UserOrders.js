import { TextField ,Button} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function UserOrders() {
  const [phoneNo,setPhoneNo] = useState("")
  const navigate = useNavigate();
  const handleOnClick = ()=> {
    navigate("/myOrders",{state:{phoneNo}})
  }
  return (
    <div style={
      {
        width:"100vw",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }
      
      } className='container'>
        <div style={
          {
            display:"flex",
            flexDirection:"column",
            backgroundColor:"white",
            width:"40vw",
            height:"50vh",
            boxShadow:"0px 4px 16px rgba(0, 0, 0, 0.13)"
          
          }
          } className="user-phone-card">
            <h4 style={{marginTop:"60px",marginLeft:"9vw"}}>Enter your Phone no.</h4>
            <TextField value={phoneNo} onChange={e => setPhoneNo(e.target.value)} style={{marginLeft:"9vw",width:"20vw"}} variant='outlined' placeholder='Phone No.'/>
            <Button onClick={handleOnClick} style={{width:"10vw",marginLeft:"9vw",marginTop:"30px"}} variant={"contained"} >Login</Button>
        </div>
    </div>
  )
}
