const Navbar = () => {
  return (
    <div id="navbar-container">
      <div id="navbar">
        <img src="src/assets/radix-logo-dark.png" alt="dev mode setup" />
      </div>
      <div>
        <img src="src/assets/banner.png" alt="banner" className="banner-image" />
      </div>
      <div id="connect-btn">
        <radix-connect-button />
      </div>
    </div>
  );
};

export default Navbar;
