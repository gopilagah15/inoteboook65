import React, { useContext, useEffect } from 'react'
import AddNote from './AddNote'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes,getAllNotes} = context;
    useEffect(()=>{
        getAllNotes();
        // eslint-disable-next-line
    },[])
  return (
    <div>
        <AddNote/>
        {notes.map((note)=>{
            return <Noteitem note={note}/>
        })}
    </div>
  )
}

export default Notes