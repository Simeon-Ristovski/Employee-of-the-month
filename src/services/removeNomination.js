function removeNomination(props, setLocalStorageEmployees) {
  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));

  const employee = localStorageEmployees.find((emp) => emp.id === props.id);
  localStorageEmployees.forEach((employee) => {
    employee.nominationsMade = employee.nominationsMade.filter(
      (nomination) => nomination.nominatedEmployeeId !== props.id,
    );
  });
  if (!employee) {
    return;
  }

  employee.votes = 0;
  employee.nominations = 0;
  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));
  setLocalStorageEmployees([...localStorageEmployees]);
}

export default removeNomination;
