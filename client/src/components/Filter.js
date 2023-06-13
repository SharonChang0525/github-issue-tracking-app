import React from 'react'
import { useDispatch } from 'react-redux';
import {setAll, setOpen, setInProgress, setDone, setSearch} from '../actions/filter';

function Filter() {
  const dispatch = useDispatch();

  return (
    <div>
        <form class="d-flex justify-content-center mt-5">
            <div class="mx-2">
            <input
                class="form-control "
                type="text" 
                placeholder="Search Task"
                onChange={(e) => {dispatch(setSearch(e.target.value))}} /> 
            </div>
            
        </form>
        <div class="btn-group my-4" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-dark btn-sm" onClick={() => {dispatch(setAll())}} >All</button>
            <button type="button" class="btn btn-outline-dark btn-sm" onClick={() => {dispatch(setOpen())}}>Open</button>
            <button type="button" class="btn btn-outline-dark btn-sm" onClick={() => {dispatch(setInProgress())}}>In Progress</button>
            <button type="button" class="btn btn-outline-dark btn-sm" onClick={() => {dispatch(setDone())}}>Done</button>
        </div>
        
    </div>
  )
}

export default Filter