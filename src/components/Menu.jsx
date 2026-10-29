import React from "react";
import { Link, useLocation } from "react-router";

function Menu() {
  const location = useLocation();

  const [user, setUser] = React.useState(() =>
    JSON.parse(sessionStorage.getItem("user") || "null"),
  );
  const [phase, setPhase] = React.useState(() =>
    JSON.parse(localStorage.getItem("phase") || "null"),
  );

  React.useEffect(() => {
    function refreshData() {
      const sessionUser = JSON.parse(sessionStorage.getItem("user") || "null");

      const employees = JSON.parse(localStorage.getItem("employees") || "[]");

      const updatedUser = employees.find(
        (employee) => employee.id === sessionUser?.id,
      );

      if (updatedUser) {
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setPhase(JSON.parse(localStorage.getItem("phase") || "null"));
    }

    refreshData();

    window.addEventListener("employeesUpdated", refreshData);

    return () => {
      window.removeEventListener("employeesUpdated", refreshData);
    };
  }, [location.pathname]);

  if (!user || !phase) {
    return null;
  }

  function logOut() {
    sessionStorage.removeItem("user");
  }

  return (
    <>
      <nav className={"navbar"}>
        <div>
          <h1 className="session-login">{user.firstName}</h1>
          <h4 className="session-login-last-name">{user.lastName}</h4>
          <h5 className="session-role">{user.role}</h5>
        </div>

        <div className="permissions">
          <div className="permisions-divs">
            <h3 className="permisions-title">CURRENT PHASE</h3>
            <h3>{phase.phase}</h3>
          </div>
          <div className="permisions-divs">
            <h3 className="permisions-title">CAN NOMINATE</h3>
            <h3>{user.canNominate ? "Yes" : "No"}</h3>
          </div>
          <div className="permisions-divs">
            <h3 className="permisions-title">CAN VOTE</h3>
            <h3> {user.canVote ? "Yes" : "No"}</h3>
          </div>
        </div>
        <div className="links-wraper">
          <Link to="/home" className="links">
            HOME
          </Link>

          {user.role === "ADMIN" && (
            <Link to="/dashboard" className="links">
              DASHBOARD
            </Link>
          )}

          {phase.phase === "NOMINATIONS OPEN" && user.canNominate && (
            <Link to="/nomination" className="links">
              NOMINATION
            </Link>
          )}

          {phase.phase === "VOTING OPEN" && user.canVote && (
            <Link to="/vote" className="links">
              VOTE
            </Link>
          )}

          {user.nominationsMade?.length > 0 && (
            <Link to="/mynominations" className="links">
              MY NOMINATIONS
            </Link>
          )}

          <Link to="/history" className="links">
            HISTORY
          </Link>
          <Link to="/login" onClick={logOut} className="links">
            LOG OUT
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Menu;
