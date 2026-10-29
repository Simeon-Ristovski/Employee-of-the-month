import React from "react";

function CreateNominationModal({ employee, nomination, onClose, onSubmit }) {
  const [reason, setReason] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setReason(nomination?.reason || "");
    setError("");
  }, [nomination]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!reason.trim()) {
      setError("Please enter a reason for the nomination.");
      return;
    }

    onSubmit(reason);
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="nomination-modal-overlay" onClick={onClose}>
      <div
        className="nomination-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2>{nomination ? "Edit Nomination" : "Create Nomination"}</h2>

        <div className="modal-employee-details">
          <h3>
            {employee.firstName} {employee.lastName}
          </h3>
          <p>{employee.email}</p>
          <p>{employee.department}</p>
          <p>{employee.title}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nomination-reason">Reason for nomination</label>

          <textarea
            id="nomination-reason"
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
              setError("");
            }}
            placeholder="Explain why this employee deserves to be nominated..."
            rows={5}
            maxLength={1000}
            required
          />

          <p className="reason-character-count">{reason.length}/1000</p>

          {error && <p className="nomination-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-nominate-btn"
              disabled={!reason.trim()}
            >
              {nomination ? "Save Changes" : "Submit Nomination"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNominationModal;
