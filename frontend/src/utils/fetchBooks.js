import { PORT } from "./port";

// Function to shuffle an array
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default async function fetchBooks() {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/books`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const books = await response.json();
    // Shuffle the books array
    const shuffledBooks = shuffleArray(books);
    // console.log("Fetched and shuffled books:", shuffledBooks); // Add this line to check the fetched data
    return shuffledBooks;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
