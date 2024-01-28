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
  <div className="the-box">
    <div className='main-box'>
      <div className={styles.home}> 
        <div className='centerText'>
          <p className='subtleText'>AGAPE</p>
        </div>
        <MyTable> </MyTable>
        <Button className={styles.exit} onClick={exitPage}>Exit</Button>
      </div>
    </div>
    
    <div className='right-bar'>
      <p className='right-title'>Mental Health Resources</p>
      <ul>
          <li><a href="https://988lifeline.org" target="_blank" >Suicide and Crisis Lifeline</a></li>
          <li><a href="https://www.orangecountygov.com/1796/Crisis-Call-Center#:~:text=The%20Orange%20County%20Crisis%20Call%20Center%20is%20co%2Dlocated%20with,texting%20845%2D391%2D1000." target="_blank">Orange County Crisis Call Center</a></li>
          <li><a href="https://focus.senate.ca.gov/mentalhealth/suicide" target="_blank">National Sucidie Prevention Lifeline</a></li>
          <li><a href="https://www.cityofirvine.org/seek-assistance/mental-health-resources" target="_blank">Resources</a></li>
      </ul>
    </div>
    {/* Footer */}
    <footer className={styles.footer}>
        Made with Love by Students
      </footer>
  </div>
  
    
  </>
  )
};