import React, { useEffect, useState } from 'react';
import { Form, Image, Input, Button, Typography, Alert, Spin, Space, Table } from 'antd';
import styles from './Home.module.css';
import './Home.css';
import logo from './logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

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
      <p className='subtleText'>TITLE</p>
    </div>
    <MyTable> </MyTable>
    <Button className={styles.exit} onClick={exitPage}>Exit</Button>
  </div>
    
  </>
  )
};
