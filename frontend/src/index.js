async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:5555/all-books");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    // You can now use the data received from the API
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

fetchBooks();
