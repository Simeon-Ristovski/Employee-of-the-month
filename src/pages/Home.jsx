import TitleLogo from "../components/TitleLogo";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import ParticlesBackground from "../components/ParticlesBackground";
import "../App.css";

function Home() {
  const lastWinner = JSON.parse(localStorage.getItem("lastWinner"));

  return (
    <>
      <TitleLogo />
      <ParticlesBackground />
      <div id="home-container">
        <div id="menu">
          {" "}
          <Menu />
        </div>

        <div id="content">
          <div className={"last-winner"}>
            <h3>Last Winner:</h3>
            <div className="last-winner-container">
              <h3 className="last-winner-data">
                <p className="winner-text">
                  <span className="winner-highlight">
                    {lastWinner.firstName} {lastWinner.lastName}
                  </span>{" "}
                  from {lastWinner.department} is our Employee of the Month for{" "}
                  <span className="winner-highlight">
                    {lastWinner.month} {lastWinner.year}
                  </span>
                  .
                </p>
              </h3>
            </div>
          </div>
          <div className="content-container">
            <p className="mini-title">COMPANY RECOGNITION HUB</p>
            <h1 className="title">WELCOME TO EMPLOYEE OF THE MONTH APP</h1>
            <div className="instruction-container">
              <h3 className="instruction-title">How It Works:</h3>
              <p className="instruction-paragraph">
                Employee of the Month is a platform that helps teams recognize
                outstanding colleagues through a structured nomination and
                voting process.
              </p>
              <ol id="instructions">
                <li>
                  Nominate Colleagues - During the nomination phase, eligible
                  users can nominate colleagues and manage their submissions.
                </li>
                <li>
                  Review Nominations - Administrators review nominations and
                  approve eligible candidates.
                </li>
                <li>
                  Cast Your Vote - During the voting phase, invited voters
                  choose their preferred candidate.
                </li>
                <li>
                  Announce the Winner - The administrator finalizes the results
                  and publishes the Employee of the Month.
                </li>
                <li>
                  Explore Past Winners - Browse the history of previous cycles
                  and celebrate outstanding achievements across the team.
                </li>
              </ol>

              <p className="instruction-moto">
                Recognize - Nominate - Vote - Celebrate
              </p>

              <p className="instruction-paragraph">
                Every cycle gives employees an opportunity to recognize great
                work, celebrate their colleagues, and contribute to a culture of
                appreciation.
              </p>
            </div>
          </div>
        </div>

        <div id="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
