import { useState } from 'react';
import tracker from '../api/tracker';

export default () => {
  const [detailsResult, setDetailsResult] = useState([]);

  const fetchDetailsResult = async (token, toggleDataFetched, toggleLock) => {
    try {
      const detailsResultResponse = await tracker.get("/tracks", {headers: { 
        'Authorization': `Bearer ${token}`, 'content-type': 'application/json'
      }});
      
      setDetailsResult(detailsResultResponse.data);
      toggleDataFetched(true);
      toggleLock(detailsResultResponse.data[0].status);
    } catch (error) {
      console.log(error.message)
    }
  }; 
  return [detailsResult, fetchDetailsResult];
};