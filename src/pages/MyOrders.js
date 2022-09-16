import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Orders from "../data/Orders.json"
import Slot from "../data/Slot.json"
import { useLocation } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useRef } from 'react';
export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [slots, setSlots] = useState([])
  const [userSeletedTime,setUserSelectedTime] = useState("")
  const [selectedOrders, setSelectedOrders] = useState([])
  const [tip,setTip] = useState(0)
  const [userAddress,setUserAddress] = useState({
    houseNo:"",
    city:"",
    state:"",
  })
  const [checked,setChecked] = useState(false)
  const tipRef = useRef()
  let location = useLocation();
  function order_sort_fun(a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }

  const fetchUserOrders = () => {
    let userPhoneNo = location.state.phoneNo
    let odr = Orders.filter(order => order.user_phone_no.toString() === userPhoneNo)
    odr.sort(order_sort_fun)
    setOrders(odr)
  }

  const addProduct = (idx) => {
    for (let i = 0; i < orders.length; i++) {
      if (i == idx) {
        setSelectedOrders([...selectedOrders, orders[i]]);
      }
    }
  }
  const removeProduct = (idx) => {
    setSelectedOrders(selectedOrders.filter((e, i) => {
      if (i !== idx) {
        return e;
      }
    }))
  }

  const handleAddress = (e) => {
    setUserAddress({...userAddress,[e.target.name]:e.target.value})
  }
  useEffect(()=> {
    if(checked === true) {
      tipRef.current.style.display="block"
    }
  },[checked])

  useEffect(() => {
    console.log(selectedOrders)
  }, [selectedOrders])

  const fetchSlots = () => {
    setSlots(Slot.filter(e => e.booked !== true))
  }
  useEffect(() => {
    fetchUserOrders();
    fetchSlots();
  }, [])

  const handleConfirm = () => {
    const deliveryData = {
      orders:selectedOrders,
      timeSlot : userSeletedTime,
      address : userAddress,
      tip : tip
    }

    
    alert("Confirmed your home delivery")
  }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "50%" }} className="orders-container">
        <h2 style={{ marginLeft:"10vw", alignSelf:"flex-start"}}>Your Orders</h2>
        {
          orders.map((e, i) => {
            return <OrderCard key={i} idx={i} removeProduct={removeProduct} addProduct={addProduct} title={e.title} price={e.price} created_at={e.created_at} />
          })
        }
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",

        }} className="address-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40vw",
            height: "48vh",
            backgroundColor: "white",
            marginTop: "30px",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.13)"
          }} className="address-bar">
          <h3 style={{ marginLeft: "5vw" }}>Your Address</h3>
          <TextField onChange={handleAddress} value={userAddress.houseNo} style={{ width: "20vw", marginLeft: "5vw" }} variant={"outlined"} name={"houseNo"} placeholder={"H.no"} />
          <TextField  onChange={handleAddress} value={userAddress.city} style={{ width: "20vw", marginLeft: "5vw", marginTop: "10px" }} variant={"outlined"} name={"city"} placeholder={"City"} />
          <TextField  onChange={handleAddress} value={userAddress.state} style={{ width: "20vw", marginLeft: "5vw", marginTop: "10px", marginBottom: "10px" }} variant={"outlined"} name={"state"} placeholder={"State"} />
          <Button variant='contained' style={{ width: "12vw", maginTop: "15px", marginLeft: "5vw" }} >Save address</Button>
        </div>
      <div style={{display:"flex"}} className="time-slots-container">
        <h4>Time Slots</h4>
        {
          slots.map((e)=> {
            return <SlotCard setUserSelectedTime={setUserSelectedTime} time={e.time}/>
          })
        }
      </div>
      <div className="tip-container">
        <FormGroup>
          <FormControlLabel label={"Would like to give tip"} control={ <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)}/>} />
        </FormGroup>
          <TextField ref={tipRef} onChange={e => setTip(parseInt(e.target.value))} variant='outlined' placeholder={"Tip amount"} style={{display:"none",width:"20vw"}}/>
        
      </div>
      <Button onClick={handleConfirm} style={{marginTop:"35px"}} variant='contained'>Confirm Home Delivery</Button>
      </div>
    </div>
  )
}

function SlotCard(props) {
  const {setUserSelectedTime} = props
  const ref = useRef()

  const handleCardClick = ()=> {
    ref.current.style.border = "2px solid blue"
    ref.current.style.color = "blue"
    setUserSelectedTime(props.time)
  }
  return (
    <div ref={ref} onClick={handleCardClick} style={{
      width: "8vw",
      height: "8vh",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.13)",
      margin: "10px"
      
    }}>
      <p style={{fontSize:"1rem",textAlign:"center"}}>{props.time}</p>
    </div>
  );
}