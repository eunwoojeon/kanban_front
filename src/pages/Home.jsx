import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import JoinForm from '../components/JoinForm';

const Home = () => {
  const [isJoinForm, setIsJoinForm] = useState(false);
  const showJoinForm = () => setIsJoinForm(!isJoinForm);

  // const [isLogin, setIsLogin] = useState(false);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isLogin) navigate('/kanban');
  // }, [isLogin])

  // axios.interceptors.response.use(
  //   response => response,
  //   error => {
  //     if (error.response && error.response.status === 403) {
  //       console.log("Access to the resource is prohibited");
  //     } else {
  //       console.log("unknown status");
  //     }
  //     navigate('/');
  //     return Promise.reject(error);
  //   }
  // )

  // const checkLogin = async () => {
  //   await axios
  //     .get(
  //       "http://localhost:3001/authorization",
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
    </div>
  )
}

export default Home