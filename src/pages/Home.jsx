import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import JoinForm from '../components/JoinForm';

const Home = () => {
  const [isJoinForm, setIsJoinForm] = useState(false);
  const showJoinForm = () => setIsJoinForm(!isJoinForm);

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center
      bg-stickyNote bg-black bg-opacity-10 bg-contain bg-no-repeat bg-center'
    >
      {
        isJoinForm === true
        ? <JoinForm showJoinForm={showJoinForm}/>
        : <LoginForm showJoinForm={showJoinForm}/>
      }
    </div>
  )
}

export default Home