import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenAIDataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual OpenAI API key
        const apiKey = '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';
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            prompt: 'Translate the following English text to French: ',
            max_tokens: 50,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`,
            },
          }
        );
        console.log(data);
        setData(response.data.choices[0].text);
      } catch (error) {
        console.error('Error fetching data from OpenAI API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>OpenAI Data:</h2>
      {data && <p>{data}</p>}
    </div>
  );
};

export default OpenAIDataFetcher;