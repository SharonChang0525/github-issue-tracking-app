import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sign_in, sign_out } from '../actions/isLogged';
import {getAllTasks} from '../actions/tasks'

const CLIENT_ID = "2ee1d51c0df64995be14";

function Navbar() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    // get accessToken //
    if(codeParam && (!isLogged)) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET"
        }).then((response) => {
          return response.json();
        }).then((data) => {
          if(data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setRerender(!rerender);
          }
        });
        getUserData();
        dispatch(sign_in());
        initialTask();
      }
      getAccessToken();
    }
  }, []);

  function loginWithGithub() {
    const scopes = [
      'user',
      'repo',
    ];
    const scope = scopes.join(',');
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=" + scope);    

  }

  async function initialTask() {
    fetch("http://localhost:4000/getAllTasks", {
      method: "GET", 
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
        dispatch(getAllTasks(data));
    }) 
  }

  async function getUserData() {

    fetch("http://localhost:4000/getUserData", {
      method: "GET", 
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
        setUserData(data);
      })

  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between" >
          {isLogged ?
          <>
            <div class="mx-3">Hi, {userData.login}</div>
            <button 
            class="btn btn-sm btn-light mx-3"
            onClick={() => {dispatch(sign_out());}}
            >
              Logout
            </button>
          </>
          :
          <>
            <div class="mx-3">Welcome</div>
            <button 
              class="btn btn-sm btn-light mx-3"
              onClick={loginWithGithub}
            >
              Login
            </button>
          </>     
          }
      </nav>
    </div>
  )
}

export default Navbar