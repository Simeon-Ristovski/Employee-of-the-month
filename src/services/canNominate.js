function canNominate(props, setLocalStorageEmployees) {
  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));
  const employee = localStorageEmployees.find((emp) => emp.id === props.id);

  if (!employee) {
    return;
  }
  employee.canNominate = !employee.canNominate;
  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));
  window.dispatchEvent(new Event("employeesUpdated"));
  setLocalStorageEmployees([...localStorageEmployees]);
  return console.log("Successfully!");
}

export default canNominate;
