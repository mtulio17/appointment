import React, { useState } from 'react';
import InputField from './InputField';
import TextareaField from './TextareaField';
import ToggleSwitch from './ToggleSwitch';
import SettingsSidebar from './SettingsSidebar';

const EditProfile = () => {
  const [name, setName] = useState('Tulio Moya');
  const [location, setLocation] = useState('Adelaide, Australia');
  const [bio, setBio] = useState('');
  const [showMeetupGroups, setShowMeetupGroups] = useState(true);
  const [showInterests, setShowInterests] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Edit Profile');

  return (
    <div className="flex mt-20">
      <SettingsSidebar
        selectedSection={selectedSection}
        onSelect={setSelectedSection}
      />
      <div className="w-3/4 md:w-1/2 bg-white p-8">
        <h1 className="text-2xl font-bold mb-8">Editar Perfil</h1>
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-500 mr-4">
            T
          </div>
          <div>
            <button className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg mr-4">
             Cambiar Foto
            </button>
          </div>
        </div>
        <InputField
          label="Name (required)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ubicacion
          </label>
          <div className="flex items-center">
            <span className="text-gray-700">{location}</span>
            <button className="ml-4 text-blue-500 hover:underline">
              Editar
            </button>
          </div>
        </div>
        <TextareaField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        {/* <ToggleSwitch
          label="Show Meetup groups"
          enabled={showMeetupGroups}
          onToggle={() => setShowMeetupGroups(!showMeetupGroups)}
        /> */}
        <ToggleSwitch
          label="Show interests"
          enabled={showInterests}
          onToggle={() => setShowInterests(!showInterests)}
        />
      </div>
    </div>
  );
};

export default EditProfile;
