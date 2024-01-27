import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenAIDataFetcher = () => {
  const API_KEY = "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";
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("calling open ai");

      const APIBody = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Say Kainoa Nishida "}],
        "temperature": 0,
        "max_tokens": 50,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify(APIBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        setData(data.choices[0]["message"].content);
        //data.choices[0].text.trim();
      });
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