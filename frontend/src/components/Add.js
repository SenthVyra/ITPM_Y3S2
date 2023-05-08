import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Garbage from './Garbage';
import uuid from 'react-uuid';
import axios from 'axios';
import Swal from 'sweetalert2';

function Add() {
  const [id,setId]=useState('')
    const [garbage,setGarbageName]=useState('')
    const [cteam,setCampaignTeam]=useState('')
    const [quantity,setQuantity]=useState('')
    const [status,setStatus]=useState()

    useEffect(()=>{
      setId(uuid().slice(0,8))

    },[])
    const history=useNavigate()
    const handleAdd=async(e)=>{
      e.preventDefault()  
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
      const result = await axios.post('http://localhost:8000/addgarbages',body)
      console.log(result);
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Data has been Added.`,
        showConfirmButton: false,
        timer: 1500
    });
      history('/')
      }
  return (
    <div className="text-center p-3">
      <h1 className='text-warning'>Add Campaign details</h1>
      <Form className='border border-3 p-1 d-inline-block'>
        <Form.Group className="mb-2">
            <Form.Label>Garbage Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter garbage name" 
            onChange={(e)=>setGarbageName(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Campaign Team Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Campaign Team Name" 
            onChange={(e)=>setCampaignTeam(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Quantity (in Kg)</Form.Label>
            <Form.Control type="number" placeholder="Enter Quantity" 
            onChange={(e)=>setQuantity(e.target.value)} required/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=>handleAdd(e)}>
            Add
        </Button>
      </Form>
    </div>
  )
}

export default Add
