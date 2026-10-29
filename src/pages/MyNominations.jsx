import React from "react";
import CardMyNominations from "../components/CardMyNominations";
import TitleLogo from "../components/TitleLogo";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import "../App.css";
import CreateNominationModal from "../components/CreateNominationModal";
import editNomination from "../services/editNomination";
import Modal from "../components/Modal";

function MyNominations() {
  const logUser = JSON.parse(sessionStorage.getItem("user"));

  const [employees, setEmployees] = React.useState(
    () => logUser?.nominationsMade || [],
  );
  const [user, setUser] = React.useState(
    JSON.parse(sessionStorage.getItem("user")),
  );
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [showModalMyNominate, setShowModalMyNominate] = React.useState(false);
  const [myNominationReason, setMyNominationReason] = React.useState("");

  function openNomination(employee) {
    setSelectedEmployee(employee);
  }
  function closeNomination() {
    setSelectedEmployee(null);
  }
  function handleSubmit(reason) {
    const success = editNomination(selectedEmployee.id, user, setUser, reason);

    if (success) {
      const updatedUser = JSON.parse(sessionStorage.getItem("user"));

      setEmployees(updatedUser.nominationsMade || []);
      closeNomination();
    }
  }

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
            {employees.map((employee) => (
              <CardMyNominations
                key={employee.id}
                {...employee}
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
        nomination={selectedEmployee}
        onClose={closeNomination}
        onSubmit={(reason) => {
          setMyNominationReason(reason);
          setShowModalMyNominate(true);
        }}
      />
      <Modal
        isOpen={showModalMyNominate}
        title="Confirm Reason Change"
        message="Are you sure you want to change the reason for your nomination?"
        type="warning"
        showCancel={true}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => {
          setShowModalMyNominate(false);
          handleSubmit(myNominationReason);
        }}
        onCancel={() => setShowModalMyNominate(false)}
      />
    </>
  );
}

export default MyNominations;
