import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Campaign from './Garbage';
import axios from 'axios';
import Swal from 'sweetalert2';
function Edit() {
    const [id,setId]=useState('')
    const [garbage,setGarbageName]=useState('')
    const [cteam,setCampaignTeam]=useState('')
    const [quantity,setQuantity]=useState('')
    const [status,setStatus]=useState()

    //api call to get particular campaign
    const params=useParams()
    console.log(id);
    const fetchGarbage=async()=>{
        const result = await axios.get('http://localhost:8000/getgarbage/'+params.id)
        const details=result.data.campaign;
        setId(details.id)
        setGarbageName(details.garbage)
        setCampaignTeam(details.cteam)
        setQuantity(details.quantity)
        setStatus(details.status)
    }


    useEffect(()=>{
        fetchGarbage()

        
    },[])

    var index = Campaign.map(item=>item.id).indexOf(id)
    console.log(index);
    let history=useNavigate()
    const handleUpdate=async(e)=>{
        e.preventDefault()//avoid refreshing
        if (!garbage || !cteam || !quantity || !status) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }
        const body={
            id,
            garbage,
            cteam,
            quantity,
            status
          }
          const result = await axios.post('http://localhost:8000/editgarbages',body)  
          alert(result.data.message)
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `Data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
        history('/')
    }
  return (
    <div className="text-center p-3">
    <h1 className='text-warning text-center'>Update Campaign Management System</h1>
    
        <Form className='border border-3 p-1 d-inline-block'>
        <Form.Group className="mb-2">
            <Form.Label>Campaign ID</Form.Label>
            <Form.Control type="text" placeholder="Enter your id" value={id} onChange={(e)=>setId(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Garbage Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter garbage name" value={garbage} onChange={(e)=>setGarbageName(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Campaign Team Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Campaign team Name" value={cteam} onChange={(e)=>setCampaignTeam(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Quantity (in Kg)</Form.Label>
            <Form.Control type="number" placeholder="Enter Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
  <Form.Label>Status</Form.Label>
  <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)} required>
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </Form.Control>
</Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=>handleUpdate(e)}>
            Update
        </Button>
    </Form>
        </div>
  )
}

export default Edit