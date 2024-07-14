function fetchTodo() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching todo:", error));
}

function fetchUser() {
  return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Error fetching user:", error));
}

Promise.all([fetchTodo(), fetchUser()])
  .then((results) => {
    const [todo, user] = results;
    console.log("Todo:", todo);
    console.log("User:", user);
  })
  .catch((error) => console.error("Error with Promise.all:", error));

Promise.race([fetchTodo(), fetchUser()])
  .then((result) => {
    console.log("First resolved promise:", result);
  })
  .catch((error) => console.error("Error with Promise.race:", error));
