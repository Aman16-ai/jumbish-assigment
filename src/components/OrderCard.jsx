import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function OrderCard(props) {
    const { title, price, created_at,idx,addProduct,removeProduct } = props
    const [isAdd,setIsAdd] = useState(false)
    const ref = useRef()
    const handleAddBtn = () => {
        setIsAdd(prev => !prev)
    }
    useEffect(()=> {
        console.log("called")
        if(isAdd == true) {
            ref.current.style.border = "2px solid Red"
            ref.current.style.backgroundColor = "white"
            ref.current.style.color = "Red"
            ref.current.innerText = "Remove"
            addProduct(idx)
        }
        else {
            ref.current.style.border = "none"
            ref.current.style.backgroundColor = "blue"
            ref.current.style.color = "white"
            ref.current.innerText = "ADD"
            removeProduct(idx)
        }
    },[isAdd])
    return (
        <div style={
            {
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                width: "30vw",
                height: "30vh",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.13)",
                margin:"10px"
            }
        } className="container">
            <h3 style={{marginLeft:"5vw",marginBottom:"2px"}}>{title}</h3>
            <p style={{marginLeft:"5vw",marginTop:"5px",marginBottom:"2px"}}>Price : {price}</p>
            <p style={{marginLeft:"5vw",marginTop:"5px"}}>{created_at}</p>
            <Button onClick={handleAddBtn} ref={ref} variant='contained' style={{alignSelf:"flex-end",marginRight:"5vw",width:"8vw"}}>Add</Button>
        </div>
    )
}
