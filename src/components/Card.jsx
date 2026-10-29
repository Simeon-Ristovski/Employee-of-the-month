import vote from "../services/vote";
import React from "react";
import removeNomination from "../services/removeNomination";
import publish from "../services/publish";
import canNominate from "../services/canNominate";
import canVote from "../services/canVote";
import { useNavigate } from "react-router";
import Modal from "./Modal";

function Card(props) {
  const logedUser = JSON.parse(sessionStorage.getItem("user"));
  const phase = JSON.parse(localStorage.getItem("phase"));
  const navigate = useNavigate();

  const [showModalVote, setShowModalVote] = React.useState(false);
  const [showSuccessModalVote, setShowSuccessModalVote] = React.useState(false);
  const [showModalPublish, setShowModalPublish] = React.useState(false);
  const [showModalRemove, setShowModalRemove] = React.useState(false);
  const [showReasonsModal, setShowReasonsModal] = React.useState(false);

  async function handleVote() {
    props.setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    vote(props, props.user, props.setUser);
    setShowModalVote(false);
    setShowSuccessModalVote(true);
    props.setLoading(false);
  }
  function handleVoteRedirect() {
    navigate("/home");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handlePublish() {
    props.setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    publish(props, props.setPublished);
    props.onPublishSuccess();
    setShowModalPublish(false);
    props.setLoading(false);
  }
  async function handleRemove() {
    props.setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    removeNomination(props, props.setLocalStorageEmployees);
    setShowModalRemove(false);
    props.onRemoveSuccess();
    props.setLoading(false);
  }

  return (
    <>
      <div className={`employee-card ${props.isWinner ? "winner-card" : ""}`}>
        <h1 className="employee-first-name">{props.firstName}</h1>
        <h3 className="employee-last-name">{props.lastName}</h3>
        <p className="employee-email">{props.email}</p>
        <p className="employee-department">{props.department}</p>
        <p className="employee-title">{props.title}</p>
        {/*  */}
        {/*HISTORY PAGE  */}
        {/*  */}
        {props.page === "history" && (
          <>
            {props.wins > 0 && (
              <>
                <p>Months won: {props.wins}</p>
                <ul>
                  {props.wonMonths.map((element) => (
                    <li key={element.id}>
                      {element.month} {element.year}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        {/*  */}
        {/*NOMINATION PAGE  */}
        {/*  */}
        {props.page === "nomination" &&
          logedUser.canNominate &&
          props.user.id !== props.id && (
            <button
              onClick={() => props.onOpenNomination(props)}
              className="nominate-btn"
            >
              Nominate
            </button>
          )}
        {/*  */}
        {/*DASHOBARD PAGE  */}
        {/*  */}
        {logedUser.role === "ADMIN" && (
          <>
            {props.page === "dashboard" && phase.phase === "DRAFT" && (
              <p className="employee-isNominated">
                {props.canNominate ? "Can Nominated!" : "Cannot Nominate!"}
              </p>
            )}
            {props.page === "dashboard" && phase.phase === "DRAFT" && (
              <p className="employee-canVote">
                {props.canVote ? "Can vote!" : "Not alowed to vote!"}
              </p>
            )}
          </>
        )}
        {props.page === "dashboard" &&
          logedUser.role === "ADMIN" &&
          phase.phase !== "DRAFT" && (
            <p className="employee-isNominated">
              Nomination: {props.nominations}
            </p>
          )}
        {props.page === "dashboard" &&
          logedUser.role === "ADMIN" &&
          phase.phase !== "DRAFT" && (
            <p className="employee-canVote">Votes: {props.votes}</p>
          )}
        {props.page === "dashboard" &&
          logedUser.role === "ADMIN" &&
          props.reasons?.length > 0 &&
          phase.phase === "REVIEW" && (
            <button
              className="nominate-btn"
              onClick={() => setShowReasonsModal(true)}
            >
              View Reasons
            </button>
          )}
        {props.page === "dashboard" &&
          logedUser.role === "ADMIN" &&
          phase.phase === "REVIEW" && (
            <button
              onClick={() => setShowModalRemove(true)}
              className="nominate-btn"
            >
              Remove
            </button>
          )}
        {props.page === "dashboard" &&
          logedUser.role === "ADMIN" &&
          !props.published &&
          props.isWinner && (
            <button
              onClick={() => setShowModalPublish(true)}
              className="vote-btn"
            >
              PUBLISH
            </button>
          )}
        <div className="permissions-container">
          {props.page === "dashboard" &&
            logedUser.role === "ADMIN" &&
            phase.phase === "DRAFT" && (
              <>
                {props.role !== "ADMIN" && (
                  <button
                    onClick={() =>
                      canVote(props, props.setLocalStorageEmployees)
                    }
                    className={`vote-btn ${props.canVote ? "permission-active" : ""}`}
                  >
                    {props.canVote ? "✓ Can Vote" : "Can Vote"}
                  </button>
                )}

                <button
                  onClick={() =>
                    canNominate(props, props.setLocalStorageEmployees)
                  }
                  className={`nominate-btn ${props.canNominate ? "permission-active" : ""}`}
                >
                  {props.canNominate ? "✓ Can Nominate" : "Can Nominate"}
                </button>
              </>
            )}
        </div>
        {/*  */}
        {/*VOTE PAGE  */}
        {/*  */}
        {/* {props.page === "vote" && (
          <>
            {props.reasons.length > 0 && (
              <>
                <div className="reasons">
                  <p>Reasons:</p>
                  {props.reasons.map((element) => (
                    <p key={element.id}>{element.text}</p>
                  ))}
                </div>
              </>
            )}
          </>
        )} */}
        {props.page === "vote" && props.reasons?.length > 0 && (
          <button
            className="nominate-btn"
            onClick={() => setShowReasonsModal(true)}
          >
            View Reasons
          </button>
        )}
        {props.page === "vote" &&
          logedUser.canVote &&
          logedUser.role !== "ADMIN" && (
            <button onClick={() => setShowModalVote(true)} className="vote-btn">
              Vote
            </button>
          )}
      </div>
      <Modal
        isOpen={showModalVote}
        title="Confirm Your Vote"
        message="Are you sure you want to vote for this candidate?"
        type="warning"
        showCancel={true}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => handleVote()}
        onCancel={() => setShowModalVote(false)}
      />
      <Modal
        isOpen={showSuccessModalVote}
        title="Vote Successful!"
        message="Your vote has been successfully recorded."
        type="success"
        confirmText="OK"
        onConfirm={() => {
          (handleVoteRedirect(), setShowSuccessModalVote(false));
        }}
      />

      <Modal
        isOpen={showModalPublish}
        title="Announce Winner"
        message="Are you sure you want to declare this candidate as the winner?"
        type="warning"
        showCancel={true}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => {
          // setShowModalPublish(false);
          handlePublish();
        }}
        onCancel={() => setShowModalPublish(false)}
      />
      <Modal
        isOpen={showModalRemove}
        title="Remove Nomination"
        message="Are you sure you want to remove this nomination?"
        type="warning"
        showCancel={true}
        confirmText="Yes"
        cancelText="No"
        onConfirm={() => handleRemove()}
        onCancel={() => setShowModalRemove(false)}
      />
      <Modal
        isOpen={showReasonsModal}
        title="Nomination Reasons"
        message={
          props.reasons?.length > 0
            ? props.reasons.map((reason) => reason.text).join("\n\n")
            : "No reasons available for this employee."
        }
        type="info"
        confirmText="OK"
        onConfirm={() => setShowReasonsModal(false)}
      />
    </>
  );
}

export default Card;
