import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ActivityDetails() {
  const [Activitys, setActivitys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ActivitysId } = useParams();
  console.log(ActivitysId)
  useEffect(() => {
      fetchActivity();
  }, [ActivitysId]); 

  const fetchActivity = async () => {
      try {
        console.log(ActivitysId)
          const response = await fetch(`http://localhost:8081/activities/${ActivitysId}/activities`);
          if (!response.ok) {
              throw new Error('Failed to fetch Activity');
          }
          const data = await response.json();
          setActivitys(data);
          console.log(data);
      } catch (error) {
          console.error('Error fetching Hotels:', error);
      } finally {
          setIsLoading(false);
      }
  };

  if (isLoading) {
      return <div>Loading...</div>; 
  }
  return (
    <div>
            {Activitys.map((Activity) => (
                <div key={Activity.address} className="p-4 border border-gray-300 rounded-lg mb-4 w-80 m-10 shadow-lg">
                    <h3 className="text-xl font-semibold">{Activity.type}</h3>
                    <p className="text-gray-600">Location: {Activity.address}</p>
                </div>
            ))}
        </div>
  )
}

export default ActivityDetails