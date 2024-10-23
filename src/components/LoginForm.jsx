import React, { useState } from 'react';

const LoginForm = ({showJoinForm}) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  
  const loginRequest = async () => {
    await axios
      .post(
        "http://localhost:3001/login",
        {email: email, password: pwd},
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  };

  return (
    <div
      className='shadow-2xl shadow-blue-500 w-fit h-fit bg-white
      flex justify-center flex-col items-center'
    >
      <div className='mx-5 my-5 font-bold text-3xl'>Simple Kanban</div>
      <div className='mx-5 my-0'>
        <div className='mt-4'>
          <span className='inline-block w-20'>Email</span>
          <input
            className='outline-none border-b-2'
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mt-4'>  
          <span className='inline-block w-20'>비밀번호</span>
          <input
            className='outline-none border-b-2'
            type="text"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
      </div>
      <div className='m-auto mx-5 my-5 flex flex-col items-center'>
        <button className='bg-blue-500 rounded-md h-10 w-40 text-white font-bold text-lg'>
          로그인
        </button>
        <button onClick={showJoinForm} className='mt-1 text-xs underline underline-offset-4 text-slate-400'>
          이메일로 회원가입하기
        </button>
      </div>
    </div>
  )
}

export default LoginForm