function phaseChange(setPublish, setLocalStorageEmployees) {
  const phaseLocalStorage = JSON.parse(localStorage.getItem("phase"));
  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));
  const employee = JSON.parse(sessionStorage.getItem("user"));

  if (phaseLocalStorage.phase === "FINALIZED") {
    localStorageEmployees.forEach((employee) => {
      ((employee.votes = 0),
        (employee.nominations = 0),
        (employee.canVote = false),
        (employee.canNominate = false),
        (employee.reasons = []));
    });
    employee.canNominate = false;
    employee.canVote = false;
    setPublish(false);
  }
  localStorage.setItem("published", JSON.stringify(false));
  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));
  sessionStorage.setItem("user", JSON.stringify(employee));
  setLocalStorageEmployees([...localStorageEmployees]);
  return console.log("Successfully!");
}

export default phaseChange;
