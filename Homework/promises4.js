class TodoFetcher {
  async fetchTodo() {
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
}

class UserFetcher {
  async fetchUser() {
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
}
async function fetchDataWithClasses() {
  const todoFetcher = new TodoFetcher();
  const userFetcher = new UserFetcher();

  try {
    const results = await Promise.all([
      todoFetcher.fetchTodo(),
      userFetcher.fetchUser(),
    ]);
    const [todo, user] = results;
    console.log("Todo:", todo);
    console.log("User:", user);
  } catch (error) {
    console.error("Error with Promise.all:", error);
  }
}

async function fetchRaceWithClasses() {
  const todoFetcher = new TodoFetcher();
  const userFetcher = new UserFetcher();

  try {
    const result = await Promise.race([
      todoFetcher.fetchTodo(),
      userFetcher.fetchUser(),
    ]);
    console.log("First resolved promise:", result);
  } catch (error) {
    console.error("Error with Promise.race:", error);
  }
}
fetchDataWithClasses();
fetchRaceWithClasses();
