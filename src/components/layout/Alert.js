import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Alert = () =>  {
    //console.log(type, msg);
    const githubContext = useContext(GithubContext);
    const {alert} = githubContext;
    //const alert = {msg: 'Unable to find', type: 'light'};
    return (
        alert !== null && 
        <div className={`alert alert-${alert.type}`}>
            <i className='fas fa-info-circle' /> {alert.msg}
        </div>     
    );
}

export default Alert;