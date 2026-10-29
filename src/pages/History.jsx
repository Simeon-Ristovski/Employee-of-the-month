import TitleLogo from "../components/TitleLogo";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import "../App.css";
import Card from "../components/Card";

function History() {
  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));
  const employees = [...localStorageEmployees].sort((a, b) => b.wins - a.wins);
  const previousWinners = employees.filter((employee) => employee.wins > 0);

  return (
    <>
      <TitleLogo />
      <div id="home-container">
        <div id="menu">
          {" "}
          <Menu />
        </div>
        <div id="content">
          <div className="content-cards">
            {previousWinners.map((employee) => (
              <Card page="history" key={employee.id} {...employee} />
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

export default History;
