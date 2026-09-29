import { useEffect, useState } from 'react';
import { Button } from '../../components/common/Button';
import { userService } from '../../services/userService';

export function ProfilePage() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('alex');

  useEffect(() => {
    userService.getProfiles().then((items) => {
      setProfiles(items);
      if (items.length) setSelectedProfile(items[0].id);
    });
  }, []);

  return (
    <div className="container page-stack">
      <h1 className="page-title">Who’s watching?</h1>
      <div className="profile-grid">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            type="button"
            className={`profile-card ${selectedProfile === profile.id ? 'selected' : ''}`}
            onClick={() => setSelectedProfile(profile.id)}
          >
            <span className="profile-avatar">{profile.avatar}</span>
            <span>{profile.name}</span>
          </button>
        ))}
        <button type="button" className="profile-card add-profile">+ Add Profile</button>
      </div>

      <div className="settings-panel">
        <h3>Profile Settings</h3>
        <label className="field">
          <span className="field-label">Name</span>
          <input className="input" defaultValue={profiles[0]?.name || 'Alex'} />
        </label>
        <label className="field">
          <span className="field-label">Language</span>
          <input className="input" defaultValue="English" />
        </label>
        <label className="field">
          <span className="field-label">Maturity</span>
          <input className="input" defaultValue="PG-13" />
        </label>
        <Button type="button">Save profile</Button>
      </div>
    </div>
  );
}
