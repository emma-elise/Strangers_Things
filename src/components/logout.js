import { Link } from "react-router-dom";

// TODO: Route back to home page when logout button pushed; fix how userLoggedIn is... broken

const Logout = (props) => {
  const logoutUser = () => {
    if (localStorage.getItem("token") === null) return;
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    console.log("logout clicked");
    setUserLoggedIn(false)
  };

  return (
    <section className="login">
      {
        <Link
          to="/"
          className="btn btn-primary"
          onClick={() => {
            logoutUser();
            window.location.href = "/";
          }}
        >
          Log Out
        </Link>
        // <button type="submit" onClick={logoutUser}>
        //   Logout
        // </button>
      }
    </section>
  );
};

export default Logout;
