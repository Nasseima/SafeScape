import React, { useState } from 'react';

const SafetyTipsPage = () => {
  const [activeTab, setActiveTab] = useState('before');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [checkedDocuments, setCheckedDocuments] = useState([]);

  const tips = {
    before: [
      "Research your destination's local laws and customs",
      "Get travel insurance that covers medical emergencies",
      "Make copies of important documents (passport, visa, etc.)",
      "Learn basic phrases in the local language",
      "Check for any required vaccinations",
    ],
    during: [
      "Stay aware of your surroundings at all times",
      "Keep valuables in the hotel safe",
      "Use reputable transportation services",
      "Avoid displaying expensive items or large amounts of cash",
      "Trust your instincts - if something feels off, leave the area",
    ],
    emergency: [
      "Know the local emergency numbers",
      "Keep emergency contacts easily accessible",
      "Locate the nearest embassy or consulate",
      "Have a basic first-aid kit on hand",
      "Learn the word for 'help' in the local language",
    ],
  };

  const emergencyContacts = {
    'Police': '911',
    'Fire': '911',
    'Ambulance': '911',
    'Global Emergency': '112',
  };

  const travelDocuments = [
    "Passport",
    "Visa",
    "Flight tickets",
    "Hotel reservations",
    "Travel insurance policy",
    "Driver's license",
    "Vaccination records",
    "Credit cards",
    "Cash",
    "Emergency contact list",
  ];

  const handleEmergency = (type) => {
    setEmergencyType(type);
    setShowEmergencyModal(true);
  };

  const handleCheckDocument = (document) => {
    setCheckedDocuments(prev => 
      prev.includes(document) 
        ? prev.filter(d => d !== document)
        : [...prev, document]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">Travel Safety Compass</h1>
          
          <div className="flex mb-8">
            {['before', 'during', 'emergency'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 text-lg font-semibold transition-colors duration-300 ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-purple-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">
              {activeTab === 'before' && 'Before You Travel'}
              {activeTab === 'during' && 'During Your Trip'}
              {activeTab === 'emergency' && 'Emergency Preparedness'}
            </h2>
            <ul className="space-y-4">
              {tips[activeTab].map((tip, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-6 bg-blue-100 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Travel Documents Checklist</h2>
            <p className="mb-4">Ensure you have all necessary documents for your trip:</p>
            <div className="grid grid-cols-2 gap-2">
              {travelDocuments.map((document, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`document-${index}`}
                    checked={checkedDocuments.includes(document)}
                    onChange={() => handleCheckDocument(document)}
                    className="mr-2"
                  />
                  <label htmlFor={`document-${index}`}>{document}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Emergency Assistance</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(emergencyContacts).map((type) => (
                <button
                  key={type}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
                  onClick={() => handleEmergency(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{emergencyType}</h2>
            <p className="mb-4">
              For {emergencyType.toLowerCase()} emergencies, use this universal number:
            </p>
            <p className="text-2xl font-bold text-red-600 mb-6">{emergencyContacts[emergencyType]}</p>
            <p className="mb-4 text-sm text-gray-600">
              Note: 911 is for USA and Canada. 112 works in many countries worldwide and will redirect to the local emergency number.
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowEmergencyModal(false)}
              >
                Close
              </button>
              <a
                href={`tel:${emergencyContacts[emergencyType]}`}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyTipsPage;