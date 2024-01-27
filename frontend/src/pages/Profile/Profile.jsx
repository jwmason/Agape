import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

// Styled components for better styling
const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 40px;
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

  // Sample user data (replace with actual data fetching logic)
  const sampleUserData = {
    id: 1,
    username: 'john_doe',
    email: 'john.doe@example.com',
    // Add more user details as needed
  };

  // Use useParams to get the profile ID from the URL
  const { id } = useParams();

  // Sample metrics data (replace with actual data fetching logic)
  const sampleMetricsData = {
    followers: 1500,
    posts: 30,
    likes: 500,
  };

  // Sample graph data (replace with actual data fetching logic)
  const sampleGraphData = {
    data: [10, 20, 30, 40, 50], // Example data for the graph
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Example labels for the graph
  };

  // State to store user data
  const [userData, setUserData] = useState(null);

  // useEffect to simulate fetching user data based on the profile ID
  useEffect(() => {
    // Replace this with actual data fetching logic (e.g., API call)
    // For now, using the sampleUserData with the provided ID
    setUserData(sampleUserData);
  }, [id]);

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
            labels: sampleGraphData.labels,
            datasets: [
              {
                label: 'Followers',
                data: sampleGraphData.data,
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
            labels: sampleGraphData.labels,
            datasets: [
              {
                label: 'Posts',
                data: sampleGraphData.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
        });
      }
    }, [userData, sampleGraphData]);

  const handleBack = () => {
    history(-1);
  };

  return (
    <ProfileContainer>
      <BackButton onClick={handleBack}>Back</BackButton>
      {userData ? (
        <>
          <ProfileHeader>{userData.username}'s Profile</ProfileHeader>
          <UserData>ID: {userData.id}</UserData>
          <UserData>Email: {userData.email}</UserData>
          {/* Add more user details as needed */}

          {/* Metrics */}
          <MetricsContainer>
            <MetricBox>
              <MetricTitle>Followers</MetricTitle>
              <MetricValue>{sampleMetricsData.followers}</MetricValue>
            </MetricBox>
            <MetricBox>
              <MetricTitle>Posts</MetricTitle>
              <MetricValue>{sampleMetricsData.posts}</MetricValue>
            </MetricBox>
            <MetricBox>
              <MetricTitle>Likes</MetricTitle>
              <MetricValue>{sampleMetricsData.likes}</MetricValue>
            </MetricBox>
          </MetricsContainer>

          {/* Graphs */}
          <GraphContainer>
            <GraphBox>
              <GraphTitle>Followers Over Time</GraphTitle>
              <canvas id="followersChart"></canvas>
            </GraphBox>
            <GraphBox>
              <GraphTitle>Posts Over Time</GraphTitle>
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
