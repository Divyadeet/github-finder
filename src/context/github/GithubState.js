import React, { useReducer } from 'react';
import axios from 'axios';
import GithubReducer from './githubReducer';
import GithubContext from './githubContext';

import {
    SET_LOADING,
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_ALERT
} from '../Types';

let githubClientID;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else{
    githubClientID = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);


    //Search Users
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientID}&client_secret=${githubClientSecret}`);
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    };
   
    //Clear Users
    const clearUsers = () => {
        dispatch({
            type: CLEAR_USERS,
        })
      };

    //Get User
    const getUser = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientID}&client_secret=${githubClientSecret}`)
    dispatch({
        type: GET_USER,
        payload: res.data
    })
  }
    //GetUserRepos
    const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${githubClientID}&client_secret=${githubClientSecret}`)
    dispatch({
        type: GET_REPOS,
        payload: res.data
    })
  }
 
  //SetAlert
  const showAlert = (msg, type) => {
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            type
        }
    })
    setTimeout(() => dispatch({type: SET_ALERT, payload:null}), 5000);
  };

    //Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return (
    <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            alert:state.alert,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
            showAlert
        }} >
            {props.children}
        </GithubContext.Provider>
        )

}

export default GithubState;