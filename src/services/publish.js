import { v4 as uuidv4 } from "uuid";

function publish(props, setPublish) {
  const date = new Date();
  const localStorageEmployees = JSON.parse(localStorage.getItem("employees"));

  const employee = localStorageEmployees.find((emp) => emp.id === props.id);

  if (!employee) {
    return;
  }
  const lastWinner = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    department: employee.department,
    title: employee.title,
    email: employee.email,
    month: date.toLocaleString("en-US", { month: "long" }),
    year: date.getFullYear(),
  };

  const month = {
    id: uuidv4(),
    month: date.toLocaleString("en-US", { month: "long" }),
    year: date.getFullYear(),
  };
  employee.wins += 1;
  employee.wonMonths.push(month);

  localStorage.setItem("published", JSON.stringify(true));
  localStorage.setItem("lastWinner", JSON.stringify(lastWinner));

  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));
  setPublish(true);
  return console.log("Successfully!");
}

export default publish;
