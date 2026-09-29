import { Button } from '../../components/common/Button';

export function SettingsPage() {
  return (
    <div className="container page-stack">
      <h1 className="page-title">Settings</h1>

      <div className="settings-stack">
        <section className="settings-panel">
          <h3>Account</h3>
          <div className="setting-row"><span>Profile</span><button type="button" className="btn btn-ghost">Edit</button></div>
          <div className="setting-row"><span>Password</span><button type="button" className="btn btn-ghost">Change</button></div>
          <div className="setting-row"><span>Email</span><button type="button" className="btn btn-ghost">Manage</button></div>
        </section>

        <section className="settings-panel">
          <h3>Playback Settings</h3>
          <div className="setting-row"><span>Autoplay</span><input type="checkbox" defaultChecked /></div>
          <div className="setting-row"><span>Video Quality</span><select className="genre-select"><option>Auto</option><option>1080p</option><option>720p</option></select></div>
          <div className="setting-row"><span>Subtitles</span><input type="checkbox" defaultChecked /></div>
        </section>

        <section className="settings-panel">
          <h3>Appearance</h3>
          <div className="setting-row"><span>Theme</span><select className="genre-select"><option>Dark</option><option>Light</option></select></div>
        </section>

        <section className="settings-panel">
          <h3>Privacy</h3>
          <div className="setting-row"><span>Profile visibility</span><button type="button" className="btn btn-ghost">Adjust</button></div>
        </section>

        <Button type="button" variant="danger">Logout</Button>
      </div>
    </div>
  );
}
