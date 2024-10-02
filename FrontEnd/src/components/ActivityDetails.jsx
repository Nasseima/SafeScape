import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast,  Bounce } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

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
          toast.error("Error fetching Hotels:");
      } finally {
          setIsLoading(false);
      }
  };

  if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="animate-bounce text-white text-4xl font-bold">Loading...</div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light" 
        transition={Bounce} 
      />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-12 shadow-text">
          Exciting Activities 
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Activitys.map((Activity) => (
            <div key={Activity.address} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-white shadow-text">{Activity.type}</h3>
                <p className="text-gray-200 flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {Activity.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivityDetails
