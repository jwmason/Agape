import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { useBackend } from '../../contexts/BackendContext';

// Styled components for better styling
const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 5px;
`;

const ProfileHeader = styled.h2`
  color: #333;
`;

const UserData = styled.p`
  font-size: 1.2em;
  margin: 12px 0;
  color: #555;
`;

const LoadingText = styled.p`
  font-size: 1.2em;
  color: #888;
`;

// Styled components for metrics
const MetricsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const MetricBox = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #f8f8f8;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
`;

const MetricTitle = styled.h3`
  color: #555;
`;

const MetricValue = styled.p`
  font-size: 1.4em;
  color: #333;
`;

// Styled components for graphs
const GraphContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const GraphBox = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #f8f8f8;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const GraphTitle = styled.h3`
  color: #555;
`;

// Back button styling
const BackButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
`;

const Profile = () => {
  const history = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [basicInfo, setBasicInfo] = useState(null);
  const [metricData, setMetricData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const userId = location.state && location.state.UID;
  const { backend } = useBackend();
  const [wordGraphData, setWordGraphData] = useState(null);

  
  // Sample user data (replace with actual data fetching logic)
  
  // Use useParams to get the profile ID from the URL
  const { id } = useParams();

  function convertDateFormat(inputDate) {
    const dateObject = new Date(inputDate);
    
    // Extracting components of the date
    const year = dateObject.getFullYear().toString().slice(-2); // Extracting last two digits of the year
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if needed
    const day = dateObject.getDate().toString().padStart(2, '0'); // Adding leading zero if needed
  
    // Combining components in MM/DD/YY format
    const formattedDate = `${month}/${day}/${year}`;
  
    return formattedDate;
  }

  // Sample metrics data (replace with actual data fetching logic)
  const sampleMetricsData = {
    score: 67,
    posts: 31,
    likes: "1/27/2024",
  };

  // Sample graph data (replace with actual data fetching logic)
  const sampleGraphData = {
    data: [10, 20, 30, 40, 50], // Example data for the graph
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Example labels for the graph
  };

  // useEffect to simulate fetching user data based on the profile ID
  useEffect(() => {
    const getData = async () => {
      try {
        const profileData = await backend.get(`/profile/profile/${userId}`);
        setUserData(profileData.data[0]);

        const x = {
          id: profileData.data[0]['id'],
          name: profileData.data[0]['name'],
        };
        setBasicInfo(x);

        const jsonArrayString = '[' + profileData.data[0]['date_score_info'].slice(1, -1) + ']';
        const jsonArrayStringWithArrays = jsonArrayString.replace(/\("\d{4}-\d{2}-\d{2}",\d{2}"\)/g, match => `[${match.slice(1, -1)}]`);
        const iterableObject = JSON.parse(jsonArrayStringWithArrays);
        
        const convertStringToTuple = (str) => {
          const [date, value] = str
            .replace('(', '')
            .replace(')', '')
            .split(',');
      
          return [String(date), parseInt(value)];
        };
      
        const tupleList = iterableObject.map((str) => convertStringToTuple(str));
        const y = {
          score: tupleList[0][1],
          sad_words: 0, // hard coded for now. will need to do some machine learning or smth or categorize words
          last_check_in: tupleList[0][0],
        };
        console.log(profileData.data[0]);
        setMetricData(y);

        const labels = tupleList.map(item => convertDateFormat(item[0]));
        const data = tupleList.map(item => item[1]);

        setGraphData({
          data: data,
          labels: labels
        });

      } catch (err) {
        console.error(err);
      }
    };
      getData();
  }, []);

  // useEffect to create graphs once the component is mounted
  useEffect(() => {
    // Ensure userData is not null before creating charts
      if (userData) {
        // Check if charts already exist, and delete them if they do
        const existingFollowersChart = Chart.getChart("followersChart");
        const existingPostsChart = Chart.getChart("postsChart");

        if (existingFollowersChart) {
          existingFollowersChart.destroy();
          history(-1);
        }

        if (existingPostsChart) {
          existingPostsChart.destroy();
        }
        // Sample code to create a line chart using Chart.js
        const ctx1 = document.getElementById('followersChart');
        const followersChart = new Chart(ctx1, {
          type: 'line',
          data: {
            labels: graphData.labels,
            datasets: [
              {
                label: 'Mood Score',
                data: graphData.data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
              },
            ],
          },
        });

        const ctx2 = document.getElementById('postsChart');
        const postsChart = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: graphData.labels,
            datasets: [
              {
                label: 'Depressive Words',
                data: graphData.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
        });
      }
    }, [metricData, setGraphData]);

  const handleBack = () => {
    history(-1);
  };

  return (
    <ProfileContainer>
      <BackButton onClick={handleBack}>Back</BackButton>
      {userData? (
        <>
          <ProfileHeader>{userData.name}'s Profile</ProfileHeader>
          <UserData>ID: {userData.id}</UserData>
          {/* Add more user details as needed */}

          {/* Metrics */}
          <MetricsContainer>
            <MetricBox>
              <MetricTitle>Current Mood Score</MetricTitle>
              <MetricValue>{metricData.score}</MetricValue>
            </MetricBox>
            <MetricBox>
              <MetricTitle>Depressive Words</MetricTitle>
              <MetricValue>{metricData.sad_words}</MetricValue>
            </MetricBox>
            <MetricBox>
              <MetricTitle>Most Recent Check-in</MetricTitle>
              <MetricValue>{metricData.last_check_in}</MetricValue>
            </MetricBox>
            {/* Fourth Box */}
            <MetricBox>
              <MetricTitle>Possible Illnesses</MetricTitle>
              <MetricValue>Depression</MetricValue>
            </MetricBox>
          </MetricsContainer>

          {/* Graphs */}
          <GraphContainer>
            <GraphBox>
              <GraphTitle>Mood Score</GraphTitle>
              <canvas id="followersChart"></canvas>
            </GraphBox>
            <GraphBox>
              <GraphTitle>Depressive Word Count</GraphTitle>
              <canvas id="postsChart"></canvas>
            </GraphBox>
          </GraphContainer>
        </>
      ) : (
        <LoadingText>Loading...</LoadingText>
      )}
    </ProfileContainer>
  );
};

export default Profile;