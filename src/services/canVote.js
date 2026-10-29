function canVote(props, setLocalStorageEmployees) {
  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));
  const employee = localStorageEmployees.find((emp) => emp.id === props.id);

  if (!employee) {
    return;
  }
  employee.canVote = !employee.canVote;
  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));
  window.dispatchEvent(new Event("employeesUpdated"));
  setLocalStorageEmployees([...localStorageEmployees]);
  return console.log("Successfully!");
}

export default canVote;
