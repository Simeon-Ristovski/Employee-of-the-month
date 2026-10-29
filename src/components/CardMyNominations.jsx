function CardMyNominations(props) {
  return (
    <>
      <div className="employee-card">
        <h1 className="employee-first-name">{props.firstName}</h1>
        <h3 className="employee-last-name">{props.lastName}</h3>
        <p className="employee-email">{props.month}</p>
        <p className="employee-department">{props.year}</p>
        <p className="employee-title">{props.reason}</p>

        <button
          onClick={() => props.onOpenNomination(props)}
          className="edit-btn"
        >
          Edit
        </button>
      </div>
    </>
  );
}

export default CardMyNominations;
