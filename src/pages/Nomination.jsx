import React from "react";
import TitleLogo from "../components/TitleLogo";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import "../App.css";
import Card from "../components/Card";
import nominate from "../services/nominate";
import CreateNominationModal from "../components/CreateNominationModal";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

function Nomination() {
  const [employees, setEmployees] = React.useState(() =>
    JSON.parse(localStorage.getItem("employees") || "[]"),
  );

  const [loading, setLoading] = React.useState(false);
  const [showModalNominate, setShowModalNominate] = React.useState(false);
  const [showSuccessModalNominate, setShowSuccessModalNominate] =
    React.useState(false);
  const [nominationReason, setNominationReason] = React.useState("");

  const [user, setUser] = React.useState(
    JSON.parse(sessionStorage.getItem("user")),
  );
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);

  const navigate = useNavigate();
  const employeesDashboard = [...employees].sort(
    (a, b) => b.nominations - a.nominations,
  );

  function openNomination(employee) {
    setSelectedEmployee(employee);
  }
  function closeNomination() {
    setSelectedEmployee(null);
  }
  async function handleSubmit(reason) {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const success = nominate(
      selectedEmployee,
      user,
      setUser,
      reason,
      setLoading,
    );

    if (success) {
      setEmployees(JSON.parse(localStorage.getItem("employees") || "[]"));
      setShowSuccessModalNominate(true);
      // navigate("/home");
      closeNomination();
      setLoading(false);
    }
    setLoading(false);
  }
  function handleVoteRedirect() {
    navigate("/home");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          <div className="content-cards">
            {employeesDashboard.map((employee) => (
              <Card
                key={employee.id}
                {...employee}
                user={user}
                setUser={setUser}
                page="nomination"
                onOpenNomination={openNomination}
              />
            ))}
          </div>
        </div>

        <div id="footer">
          <Footer />
        </div>
      </div>
      <CreateNominationModal
        employee={selectedEmployee}
        onClose={closeNomination}
        onSubmit={(reason) => {
          setNominationReason(reason);
          setShowModalNominate(true);
        }}
      />
      <Modal
        isOpen={showModalNominate}
        title="Confirm Your Nomination"
        message="Are you sure you want to nominate this candidate?"
        type="warning"
        showCancel={true}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => {
          setShowModalNominate(false);
          handleSubmit(nominationReason);
        }}
        onCancel={() => setShowModalNominate(false)}
      />

      <Modal
        isOpen={showSuccessModalNominate}
        title="Nomination Successful!"
        message="You have successfully nominated this employee."
        type="success"
        confirmText="OK"
        onConfirm={() => {
          (handleVoteRedirect(), setShowSuccessModalNominate(false));
        }}
      />
    </>
  );
}

export default Nomination;
