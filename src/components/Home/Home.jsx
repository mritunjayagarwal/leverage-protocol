import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
        <div className='text-center'>
        <h1>Hi! Welcome to Leverage Protocol</h1>
        <Link to = "/swap" className='btn btn-primary py-2 px-5'>Go to Swap</Link>
        </div>
    </>
  )
}

export default Home