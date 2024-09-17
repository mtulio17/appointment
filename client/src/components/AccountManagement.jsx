import React, { useState } from 'react';

const AccountManagement = () => {
  const [email, setEmail] = useState('tuliomoya17@gmail.com');
  const [language, setLanguage] = useState('English (Australia)');
  const [timeZone, setTimeZone] = useState('System Time (default) - hora estándar de Australia central');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleTimeZoneChange = (e) => setTimeZone(e.target.value);

  const handleSaveChanges = () => {
    
    alert('Changes saved!');
  };

  const handlePasswordChange = () => {
    
    alert('Redirecting to change password...');
  };

  const handleDeactivateAccount = () => {
    
    alert('Account deactivated!');
  };

  return (
    <div className="max-w-2xl p-6 bg-white rounded-lg shadow mt-20">
      <h1 className="text-2xl font-bold mb-8">Account management</h1>   
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      
     
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Language</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="English (Australia)">English (Australia)</option>
          <option value="Spanish (Spain)">Spanish (Spain)</option>
          
        </select>
      </div>
      
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Primary time zone</label>
        <select
          value={timeZone}
          onChange={handleTimeZoneChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="System Time (default) - hora estándar de Australia central">
            System Time (default) - hora estándar de Australia central
          </option>
        
        </select>
        <p className="text-sm text-gray-500 mt-2">
          Your choice will influence how event times are displayed. If you want the time zone to be determined by your location, select “System time (default)”
        </p>
      </div>
      
      
      <button
        onClick={handleSaveChanges}
        className="bg-pink-500 text-white px-4 py-2 rounded-md mb-10"
      >
        Save Changes
      </button>

      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Change your password</h2>
        <p className="text-sm text-gray-500 mb-4">
          When you change your password, you will be automatically signed out from your other sessions.
        </p>
        <button
          onClick={handlePasswordChange}
          className="border border-gray-300 px-4 py-2 rounded-md text-blue-500"
        >
          Change password
        </button>
      </div>

      
      <div>
        <h2 className="text-lg font-bold mb-2">Deactivate your account</h2>
        <p className="text-sm text-gray-500 mb-4">
          If you decide to use this platform again, you’ll need to create a new account.
        </p>
        <button
          onClick={handleDeactivateAccount}
          className="border border-gray-300 px-4 py-2 rounded-md text-red-500"
        >
          Deactivate account
        </button>
      </div>
    </div>
  );
};

export default AccountManagement;
