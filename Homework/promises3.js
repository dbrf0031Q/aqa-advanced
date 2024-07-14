async function fetchTodo() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todo:", error);
  }
}

async function fetchUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

async function fetchDataAll() {
  try {
    const results = await Promise.all([fetchTodo(), fetchUser()]);
    const [todo, user] = results;
    console.log("Todo:", todo);
    console.log("User:", user);
  } catch (error) {
    console.error("Error with Promise.all:", error);
  }
}

async function fetchDataRace() {
  try {
    const result = await Promise.race([fetchTodo(), fetchUser()]);
    console.log("First resolved promise:", result);
  } catch (error) {
    console.error("Error with Promise.race:", error);
  }
}
fetchDataAll();
fetchDataRace();
