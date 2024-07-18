import React, { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000" 
  const notesInitial=[]
  const [notes, setnotes] = useState(notesInitial);

  const getAllNotes=async()=>{
     //API CALL

     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",    
         headers: {
          "Content-Type": "application/json",
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ODgxMWVlZjQ3NDA3ODU1NjYwZWM4In0sImlhdCI6MTcyMTI3MDU1OH0.TE45NO6i_Qsd93AYHO7s6tEXLMSvMmPF9Ca2BdjlRK8'
         },  
             });
    const json = await response.json();   
    console.log(json);
    setnotes(json);

  }
  const addNote=async(title,description,tag)=>{
     //API CALL

     const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",    
         headers: {
          "Content-Type": "application/json",
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ODgxMWVlZjQ3NDA3ODU1NjYwZWM4In0sImlhdCI6MTcyMTI3MDU1OH0.TE45NO6i_Qsd93AYHO7s6tEXLMSvMmPF9Ca2BdjlRK8'
         },
             body: JSON.stringify({title,description,tag}),  
             });
    const json = await response.json();   
    console.log(json)
    setnotes(notes.concat(json));

  }
  const editNote=async(id,title,description,tag)=>{
     //API CALL

     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",    
         headers: {
          "Content-Type": "application/json",
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ODgxMWVlZjQ3NDA3ODU1NjYwZWM4In0sImlhdCI6MTcyMTI3MDU1OH0.TE45NO6i_Qsd93AYHO7s6tEXLMSvMmPF9Ca2BdjlRK8'
         },
             body: JSON.stringify({title,description,tag}),  
             });
    const json = await response.json();   
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes));
    for(let index = 0; index<newNotes.length; index++){
      const element = newNotes[index]
      if(element._id === id){
        newNotes[index].title = title; 
        newNotes[index].description = description; 
        newNotes[index].tag = tag; 
        break;
      }
    }
    setnotes(newNotes)
  }
  const deleteNote=async(id)=>{
     //API CALL

     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",    
         headers: {
          "Content-Type": "application/json",
        "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ODgxMWVlZjQ3NDA3ODU1NjYwZWM4In0sImlhdCI6MTcyMTI3MDU1OH0.TE45NO6i_Qsd93AYHO7s6tEXLMSvMmPF9Ca2BdjlRK8'
         }, 
             });
    const json = await response.json();   
    console.log(json)

    const deleted = notes.filter((note)=>{return note._id!==id})
    setnotes(deleted)

  } 
  return (
    <noteContext.Provider value={{notes,getAllNotes,addNote,editNote,deleteNote}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState