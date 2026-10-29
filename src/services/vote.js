function vote(props, user, setUser) {
  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));

  const employee = localStorageEmployees.find((emp) => emp.id === props.id);
  const employeeVote = localStorageEmployees.find((emp) => emp.id === user.id);

  if (!employee) {
    return;
  }
  employee.votes += 1;
  employeeVote.canVote = false;

  setUser(employeeVote);

  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));
  sessionStorage.setItem("user", JSON.stringify(employeeVote));

  return console.log("Successfully!");
}

export default vote;
