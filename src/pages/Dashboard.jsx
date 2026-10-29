import React from "react";
import TitleLogo from "../components/TitleLogo";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import "../App.css";
import Card from "../components/Card";
import phases from "../data/phases";
import phaseChange from "../services/phaseChange";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

function Dashboard() {
  const [loading, setLoading] = React.useState(false);
  const [showSuccessModalRemove, setShowSuccessModalRemove] =
    React.useState(false);
  const [showSuccessModalPublish, setShowSuccessModalPublish] =
    React.useState(false);
  const [showModalPhase, setShowModalPhase] = React.useState(false);
  const [showModalNewCycle, setShowModalNewCycle] = React.useState(false);
  const [localStorageEmployees, setLocalStorageEmployees] = React.useState(
    JSON.parse(localStorage.getItem("employees")),
  );
  const [id, setId] = React.useState(JSON.parse(localStorage.getItem("id")));
  const [published, setPublished] = React.useState(
    JSON.parse(localStorage.getItem("published")) === true,
  );

  localStorage.setItem("phase", JSON.stringify(phases[id]));

  React.useEffect(() => {
    localStorage.setItem("id", id);
    localStorage.setItem("phase", JSON.stringify(phases[id]));
  }, [id]);

  const phase = JSON.parse(localStorage.getItem("phase"));
  const employeesDashboard = [...localStorageEmployees].sort(
    (a, b) => b.votes - a.votes,
  );
  const nominatedEmployees = employeesDashboard.filter(
    (employee) => employee.nominations > 0,
  );
  const maxVotes = Math.max(
    ...employeesDashboard.map((employee) => employee.votes),
  );

  function prevClick() {
    setId((prev) => (prev === phase.length - 1 ? 0 : 0));
    phaseChange(setPublished, setLocalStorageEmployees);
  }

  function nextClick() {
    window.location.reload();
    setId((prev) => (prev < phases.length - 1 ? prev + 1 : 5));
    phaseChange(setPublished, setLocalStorageEmployees);
  }
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
          <div className="cycle-dashboard">
            <p className="mini-title-dashboard">ADMINISTRATION</p>
            <h3 className="title-dashboard">Cycle dashboard</h3>
            <p className="paragraph-dashboard">
              Manage the phase progression, review nomination activity, and
              publish the final winner when the cycle is ready.
            </p>
          </div>
          <div className="phase-navigation">
            <button
              disabled={phase.phase !== "PUBLISHED"}
              onClick={() => setShowModalNewCycle(true)}
              className="previous-btn"
            >
              NEW CYCLE
            </button>

            <div className="phases-container">
              {/* Desktop: сите фази */}
              <div className="phases-desktop">
                {phases.map((item) => (
                  <label
                    key={item.id}
                    className={`phase-label ${
                      phase.phase === item.phase ? "active" : ""
                    }`}
                  >
                    {item.phase}
                  </label>
                ))}
              </div>

              <div className="phases-mobile">
                {id > 0 && (
                  <div className="phase-small phase-top">
                    {phases[id - 1].phase}
                  </div>
                )}

                <div className="phase-current">{phases[id].phase}</div>

                {id < phases.length - 1 && (
                  <div className="phase-small phase-bottom">
                    {phases[id + 1].phase}
                  </div>
                )}
              </div>
            </div>

            <button
              disabled={phase.phase === "PUBLISHED"}
              onClick={() => setShowModalPhase(true)}
              className="next-btn"
            >
              NEXT PHASE
            </button>
          </div>
          {(phase.phase === "DRAFT" || phase.phase === "PUBLISHED") && (
            <div className="content-text-phase">
              {phase.phase === "DRAFT" && (
                <>
                  <div className="draft-text">
                    As an Admin, decide which employees can vote, nominate, do
                    both, or do neither. Once you have reviewed and confirmed
                    all permissions, click NEXT PHASE to start the Employee of
                    the Month selection cycle.
                  </div>
                  <div className="content-cards">
                    {localStorageEmployees.map((employee) => (
                      <Card
                        setLocalStorageEmployees={setLocalStorageEmployees}
                        published={published}
                        setPublished={setPublished}
                        key={employee.id}
                        {...employee}
                        page="dashboard"
                        isWinner={
                          phase.phase === "FINALIZED" &&
                          employee.votes === maxVotes
                        }
                      />
                    ))}
                  </div>
                </>
              )}
              {phase.phase === "PUBLISHED" && (
                <div className="draft-text">
                  The current cycle has ended. Click NEW CYCLE to start a new
                  one.
                </div>
              )}
            </div>
          )}
          <div className="content-cards">
            {nominatedEmployees.map((employee) => (
              <Card
                setLoading={setLoading}
                setLocalStorageEmployees={setLocalStorageEmployees}
                onRemoveSuccess={() => setShowSuccessModalRemove(true)}
                onPublishSuccess={() => setShowSuccessModalPublish(true)}
                published={published}
                setPublished={setPublished}
                key={employee.id}
                {...employee}
                page="dashboard"
                isWinner={
                  phase.phase === "FINALIZED" && employee.votes === maxVotes
                }
              />
            ))}
          </div>
        </div>

        <div id="footer">
          <Footer />
        </div>
      </div>
      <Modal
        isOpen={showModalPhase}
        title="Change Phase"
        message="Are you sure you want to change the phase?"
        type="warning"
        showCancel={true}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => {
          setShowModalPhase(false);
          nextClick();
        }}
        onCancel={() => setShowModalPhase(false)}
      />
      <Modal
        isOpen={showModalNewCycle}
        title="Start a New Cycle"
        message="Are you sure you want to start a new cycle?"
        type="warning"
        showCancel={true}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => {
          setShowModalNewCycle(false);
          prevClick();
        }}
        onCancel={() => setShowModalNewCycle(false)}
      />
      <Modal
        isOpen={showSuccessModalRemove}
        title="Nomination Removed Successfully!"
        message="The nomination has been successfully removed."
        type="success"
        confirmText="OK"
        onConfirm={() => setShowSuccessModalRemove(false)}
      />
      <Modal
        isOpen={showSuccessModalPublish}
        title="Winner Announced Successfully!"
        message="The winner has been successfully announced."
        type="success"
        confirmText="OK"
        onConfirm={() => {
          (nextClick(), setShowSuccessModalPublish(false));
        }}
      />
    </>
  );
}

export default Dashboard;
