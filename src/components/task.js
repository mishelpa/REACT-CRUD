import React, { useEffect, useState } from 'react';
import firebase from '../conexion/firebase';
import {Item} from './item';

export const Task = () => {

  const [data, setData] = useState([]);
  const [tarea, setTarea] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')

  useEffect(()=> {
    firebase.
      firestore()
      .collection('tareas')
      .onSnapshot(onSnapshot => {
        const newObj= onSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))
        setData(newObj)
      })
  }, [])

  const addTask = (e) => {
    e.preventDefault();
    // trim ayudara a ver si el campo es vacio
    if(!tarea.trim()){
      console.log('sin texto')
      return
    }
    const nuevaTarea = {
      name: tarea,
      fecha: "Date.now()"
    }

    firebase.
    firestore()
    .collection('tareas')
    .add(nuevaTarea)
    setTarea('')
  }

  const deleteTask = (id) => {
    firebase
    .firestore()
    .collection('tareas')
    .doc(id)
    .delete()
  }

  const changeEdit = (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editTask = (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('vacio')
      return
    }
    firebase
    .firestore()
    .collection('tareas')
    .doc(id)
    .update({
      name:tarea
    })
    setModoEdicion(false)
    setId('')
    setTarea('')
  }



  return (
    <div className="container mb-2">
    <div className="row">
        <div className="col-md-6">
            <h3>Lista de Tareas</h3>
            <ul className="list-group">
            {
                data.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.name}</span>
                    <button 
                        onClick={() => deleteTask(item.id)}
                        className="btn btn-danger btn-sm float-right"
                    >
                        Eliminar
                    </button>
                    <button 
                        onClick={() => changeEdit(item)}
                        className="btn btn-warning btn-sm float-right mr-2"
                    >
                        Editar
                    </button>
                </li>
                ))
            }
            </ul>
        </div>
        <div className="col-md-6">
          <h3>
            {modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}
          </h3>
            <form onSubmit={modoEdicion ? editTask : addTask}>
                <input 
                    type="text" 
                    className="form-control mb-2"
                    placeholder='Ingrese Tarea'
                    value={tarea}
                    onChange={e => setTarea(e.target.value)}
                />
                <button 
                    type='submit'
                    className=
                    {modoEdicion ? "btn btn-warning btn-block btn-sm" : "btn btn-dark btn-block btn-sm"}
                >
                    {modoEdicion ? 'Editar' : 'Agregar'}
                </button>
            </form>
        </div>
    </div>
</div>
  )
}