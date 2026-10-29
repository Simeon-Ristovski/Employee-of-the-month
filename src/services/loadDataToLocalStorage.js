import employees from "../data/employees";

function loadDataToLocalStorage() {
  const existingEmployees = localStorage.getItem("employees");
  if (!existingEmployees) {
    localStorage.setItem("employees", JSON.stringify(employees));
    const lastWinner = {
      firstName: "Simeon",
      lastName: "Ristovski",
      department: "IT",
      title: "Software Engineer",
      email: "simeonristovski@example.com",
      month: "September",
      year: 2026,
    };
    localStorage.setItem("lastWinner", JSON.stringify(lastWinner));
    console.log("Data loaded");
  } else {
    console.log("Data already exists");
  }
}

export default loadDataToLocalStorage;
