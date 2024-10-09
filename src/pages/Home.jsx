import React from 'react';
import Input from '../components/Input';

const Home = () => {
  return (
    <div id='home'>
      <div id='header'>Simple Kanban</div>
      <div id='container'>
        <button>시작하기</button>
        <div>
          <Input placeholder="EMAIL" />
          <Input placeholder="PASSWORD" />
        </div>
      </div>
    </div>
  )
}

export default Home