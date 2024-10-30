import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';

const SEQUENCE = {
  EMAIL: 0,
  CODE: 1,
  PWD: 2
}

const SignUp = () => {
  const [seq, setSeq] = useState(SEQUENCE.EMAIL);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState(new Array(6).fill(''));
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [isConfirmPwdValid, setIsConfirmPwdValid] = useState(false);  

  const [pwdType, setPwdType] = useState('password');
  const [confirmPwdType, setConfirmPwdType] = useState('password');

  const navigate = useNavigate();

  const emailValidation = (e) => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    pattern.test(e.target.value) ? setIsEmailValid(false) : setIsEmailValid(true);
  }

  const codeValidation = (e, idx) => {
    let value = e.target.value;
    if (value.length >= 2) return;
    code[idx] = value.replace(/[^0-9]/g, '');
    setCode([...code]);
  }

  const pwdValidation = (e) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    pattern.test(e.target.value) ? setIsPwdValid(false) : setIsPwdValid(true);
  }

  const confirmPwdValidation = (e) => {
    (e.target.value === pwd) ? setIsConfirmPwdValid(false) : setIsConfirmPwdValid(true);
  }

  // const mailSendRequest = async () => {
  //   await axios
  //     .post(
  //       "http://localhost:3001/mailsend",
  //       {address: email}
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch(console.error)
  // }
  
  // const joinRequest = async () => {
  //   await axios
  //     .post(
  //       "http://localhost:3001/join",
  //       {email: email, password: pwd},
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch(console.error);
  // }

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center
      bg-stickyNote bg-black bg-opacity-10 bg-contain bg-no-repeat bg-center'
    >
      <div
        className='shadow-2xl shadow-blue-500 w-fit h-fit bg-white
        flex justify-center flex-col items-center'
      >
        <div className='mx-5 my-5 font-bold text-3xl'>Simple Kanban</div>
        <div className='mx-5 my-3 font-bold text-base'>
          {seq === SEQUENCE.EMAIL && ("회원 가입을 진행해주세요.")}
          {seq === SEQUENCE.CODE && ("받은 메일함을 확인해 코드를 입력하세요.")}
          {seq === SEQUENCE.PWD && ("비밀번호를 입력하세요.")}
        </div>
        <div
          className='mx-5 my-0
          min-w-80 min-h-20
          flex flex-col items-center justify-evenly'
        >
        {seq === SEQUENCE.EMAIL && (
          <div className='mt-4'>
            <label>
              <span className='inline-block w-20'>Email</span>
              <input
                className='outline-none border-b-2'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={emailValidation}
              />
            </label>
            {isEmailValid && (
              <div className='mt-1 text-red-600 text-sm text-center'>※ 이메일 주소를 정확히 입력해주세요.</div>
            )}
          </div>
        )}
        {seq === SEQUENCE.CODE && (
          <div className='mt-4'>
            <span className='inline-block w-24'>인증 코드</span>
            <div className='flex justify-center'>
              {code.map((number, idx) => (
                <input
                  key={idx}
                  className='outline-none w-10 h-10 mx-1 border-solid border-2 border-gray-300
                  focus:border-4 focus:border-blue-200 text-center'
                  value={number}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value.length >= 2) return;
                    code[idx] = value.replace(/[^0-9]/g, '');
                    setCode([...code]);
                  }}
                />
              ))}
            </div>
            <button
              className='mt-1 text-xs underline underline-offset-4 text-slate-400
              text-center w-full'
            >
              인증 코드 재전송
            </button>
          </div>
        )}
        {seq === SEQUENCE.PWD && (
          <>
            <div className='mt-4'>
              <label>
                <span className='inline-block w-24'>Email</span>
                <input
                  disabled={true}
                  className='outline-none bg-gray-200'
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className='mt-4'>  
              <label className='relative'>
                <span className='inline-block w-24'>비밀번호</span>
                <input
                  className='outline-none border-b-2'
                  type={pwdType}
                  placeholder="Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onBlur={pwdValidation}
                  />
                {
                  (pwdType === 'password')
                  ? <button
                    className='absolute right-0'
                    onClick={() => {setPwdType('text')}}
                  >
                    <EyeIcon/>
                  </button>
                  : <button
                    className='absolute right-0'
                    onClick={() => {setPwdType('password')}}
                  >
                    <EyeSlashIcon/>
                  </button>
                }
              </label>
              {isPwdValid && (
                <div className='mt-1 text-red-600 text-sm text-center'>※ 8~20자의 영문, 숫자, 특수문자를 포함한 <br/> 비밀번호를 입력해주세요.</div>
              )}
            </div>
            
            <div className='mt-4'>
              <label className='relative'>
                <span className='inline-block w-24'>비밀번호 확인</span>
                <input
                  className='outline-none border-b-2'
                  type={confirmPwdType}
                  placeholder="Password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  onBlur={confirmPwdValidation}
                />
                {
                  (confirmPwdType === 'password')
                  ? <button
                    className='absolute right-0'
                    onClick={() => {setConfirmPwdType('text')}}
                  >
                    <EyeIcon/>
                  </button>
                  : <button
                    className='absolute right-0'
                    onClick={() => {setConfirmPwdType('password')}}
                  >
                    <EyeSlashIcon/>
                  </button>
                }
              </label>
              {isConfirmPwdValid && (
                <div className='mt-1 text-red-600 text-sm text-center'>※ 비밀번호가 불일치합니다.</div>
              )}
            </div>
          </>
        )}
        </div>
        <div className='m-auto mx-5 my-5 flex flex-col items-center'>
          {seq === SEQUENCE.EMAIL && (
            <button
              onClick={() => {setSeq(SEQUENCE.CODE)}}
              disabled={false}
              className='bg-blue-500 rounded-md h-10 w-40 text-white font-bold text-base'
            >
              가입
            </button>
          )}
          {seq === SEQUENCE.CODE && (
            <button
              onClick={() => {setSeq(SEQUENCE.PWD)}}
              disabled={false}
              className='bg-blue-500 rounded-md h-10 w-40 text-white font-bold text-lg'
            >
              확인
            </button>
          )}
          {seq === SEQUENCE.PWD && (
            <button
              onClick={() => {setSeq(SEQUENCE.EMAIL)}}
              disabled={false}
              className='bg-blue-500 rounded-md h-10 w-40 text-white font-bold text-lg'
            >
              가입
            </button>
          )}
          <button onClick={() => {navigate('/')}} className='mt-1 text-xs underline underline-offset-4 text-slate-400'>
            로그인하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp