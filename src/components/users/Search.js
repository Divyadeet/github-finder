import React, {useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Search = () => {
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('')

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === '') {
            githubContext.showAlert('Please enter something...', 'light');
        }else{
            githubContext.searchUsers(text);
            setText('');
        }
    }
    return (
            <div>
                <form onSubmit={onSubmit} className='form'>
                    <input onChange={onChange} type='text' name='text' placeholder='Search users...' />
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
                {githubContext.users.length>0 && <button onClick={githubContext.clearUsers } className='btn btn-light btn-block'>Clear</button>}
            </div>
        );
}


export default Search;