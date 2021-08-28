// TODO: Route back to home page when logout button pushed; fix how userLoggedIn is... broken

const Logout = (props) => {
  const { userLoggedIn, setUserLoggedIn } = props;

  const logoutUser = () => {
    if (localStorage.getItem("token") === null) return;
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    console.log("logout clicked");
  };

  return (
    <section className="login">
      {!userLoggedIn && (
        <button type="submit" onClick={logoutUser}>
          Logout
        </button>
      )}
    </section>
  );
};

export default Logout;
