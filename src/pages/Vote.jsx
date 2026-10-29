import React from "react";
import TitleLogo from "../components/TitleLogo";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import Card from "../components/Card";
import Loader from "../components/Loader";
import "../App.css";

function Vote() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(
    JSON.parse(sessionStorage.getItem("user")),
  );

  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));
  const employeesDashboard = [...localStorageEmployees].sort(
    (a, b) => b.votes - a.votes,
  );
  const nominatedEmployees = employeesDashboard.filter(
    (employee) => employee.nominations > 0,
  );

  return (
    <>
      <TitleLogo />
      {loading && <Loader />}
      <div id="home-container">
        <div id="menu">
          {" "}
          <Menu />
        </div>
        <div id="content">
          <div className="content-cards">
            {nominatedEmployees.map((employee) => (
              <Card
                setLoading={setLoading}
                page="vote"
                key={employee.id}
                {...employee}
                user={user}
                setUser={setUser}
              />
            ))}
          </div>
        </div>

        <div id="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Vote;
