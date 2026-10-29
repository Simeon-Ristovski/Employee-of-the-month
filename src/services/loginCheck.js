import employees from "../data/employees";

function loginCheck(email, password) {
  const employee = employees.find((employee) => employee.email === email);

  if (!employee) {
    return "email";
  }

  if (employee.password !== password) {
    return "password";
  }

  sessionStorage.setItem("user", JSON.stringify(employee));
  return true;
}

export default loginCheck;
