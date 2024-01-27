import React, { useEffect, useState } from 'react';
import { Form, Image, Input, Button, Typography, Alert, Spin, Space } from 'antd';
import styles from './Home.module.css';
import './Home.css';
import logo from './logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export default function Home() {
  const [likeVisible, setLikeVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function exitPage() {
     navigate('/');
  }
  
  function refreshPage() {
    window.location.reload();
  }

  return (<>

  <div className={styles.home}>
    <div className='centerText'>
      <p className='subtleText'>TITLE</p>
    </div>
    <Button className={styles.exit} onClick={exitPage}>Exit</Button>
  </div>
    
  </>
  )
};
