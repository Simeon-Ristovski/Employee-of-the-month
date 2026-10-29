function editNomination(nominationId, user, setUser, message) {
  const localStorageEmployees = JSON.parse(
    localStorage.getItem("employees") || "[]",
  );

  const employeeNominate = localStorageEmployees.find(
    (emp) => emp.id === user.id,
  );

  if (!employeeNominate || !message?.trim()) {
    return false;
  }

  const nomination = employeeNominate.nominationsMade.find(
    (item) => item.id === nominationId,
  );

  if (!nomination) {
    return false;
  }

  const reasonText = message.trim();

  nomination.reason = reasonText;

  const employee = localStorageEmployees.find(
    (emp) => emp.id === nomination.nominatedEmployeeId,
  );

  if (!employee) {
    return false;
  }

  const reason = employee.reasons.find((item) => item.id === nominationId);

  if (reason) {
    reason.text = reasonText;
  }

  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));

  sessionStorage.setItem("user", JSON.stringify(employeeNominate));
  setUser({ ...employeeNominate });

  return true;
}

export default editNomination;
