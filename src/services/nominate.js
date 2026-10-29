import { v4 as uuidv4 } from "uuid";

function nominate(props, user, setUser, message) {
  const date = new Date();

  const localStorageEmployees = JSON.parse(
    localStorage.getItem("employees") || "[]",
  );

  const employee = localStorageEmployees.find((emp) => emp.id === props.id);

  const employeeNominate = localStorageEmployees.find(
    (emp) => emp.id === user.id,
  );

  if (
    !employee ||
    !employeeNominate ||
    !message?.trim() ||
    !employeeNominate.canNominate
  ) {
    return false;
  }

  const uuid = uuidv4();
  const reasonText = message.trim();

  employee.nominations += 1;
  employeeNominate.canNominate = false;

  const nominationReason = {
    id: uuid,
    text: reasonText,
  };

  const nominated = {
    id: uuid,
    nominatedEmployeeId: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    month: date.toLocaleString("en-US", {
      month: "long",
    }),
    year: date.getFullYear(),
    reason: reasonText,
  };

  employeeNominate.nominationsMade.push(nominated);
  employee.reasons.push(nominationReason);

  localStorage.setItem("employees", JSON.stringify(localStorageEmployees));

  sessionStorage.setItem("user", JSON.stringify(employeeNominate));

  setUser({ ...employeeNominate });

  return true;
}

export default nominate;
