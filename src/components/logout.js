const Logout = (props) => {
  const { userLoggedIn } = props;
  const logoutUser = () => {
    if (localStorage.getItem("token") === null) return;
    if (localStorage.getItem("token") !== null) !userLoggedIn;
    localStorage.removeItem("token");
    console.log("logout clicked");
  };

  return (
    <section className="login">
      <button type="submit" onClick={logoutUser}>
        Logout
      </button>
    </section>
  );
};

export default Logout;
