export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>Questions? Contact us.</p>
        <div className="footer-grid">
          <a href="#">FAQ</a>
          <a href="#">Help Center</a>
          <a href="#">Account</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Corporate Information</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} StreamFlix</p>
      </div>
    </footer>
  );
}
