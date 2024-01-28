import React, { useEffect, useState } from 'react';
import { Form, Image, Input, Button, Typography, Alert, Spin, Space, Table } from 'antd';
import styles from './Home.module.css';
import './Home.css';
import logo from './logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useBackend } from '../../contexts/BackendContext';

export default function Home() {
  const { backend } = useBackend();
  const [likeVisible, setLikeVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const profile_data = await backend.get('/profile/ijjcnB1xtxXmwKuPmQT9wNXFgrD3');
        console.log(profile_data.data);
        
      } catch (error) {
        console.log(error);
        console.error('Error fetching data:', error);
      }
    };
    getData();

  }, []);

  function exitPage() {
     navigate('/');
  }
  
  function refreshPage() {
    window.location.reload();
  }

  
const dataSource = [
  {
    key: '1',
    name: 'Kainoa Nishida',
    mood: 25,
    lastOnline: '123 Main St',
  },
  {
    key: '2',
    name: 'Mason',
    mood: 30,
    lastOnline: '456 Oak St',
  },
  {
    key: '3',
    name: 'Austin',
    mood: 30,
    lastOnline: '456 Oak St',
  },
  {
    key: '4',
    name: 'Josh',
    mood: 30,
    lastOnline: '456 Oak St',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`/profile/${record.key}`}>{text}</Link>,
  },
  {
    title: 'Mood',
    dataIndex: 'mood',
    key: 'mood',
  },
  {
    title: 'Last Online',
    dataIndex: 'lastOnline',
    key: 'lastOnline',
  },
];

const MyTable = () => {
  return <Table dataSource={dataSource} columns={columns} onRow={(record) => ({ onClick: () => handleUserClick(record.key) })} />;
};

const handleUserClick = (userId) => {
  navigate(`/profile/${userId}`);
};

  return (<>

  <div className={styles.home}>
    <div className='centerText'>
      <p className='subtleText'>AGAPE</p>
    </div>
    <MyTable> </MyTable>
    <Button className={styles.exit} onClick={exitPage}>Exit</Button>
  </div>
    
  </>
  )
};