import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Table } from "react-bootstrap";
import Header from "../../components/Header";
import UploadBook from "./UploadBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/books/");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8888/api/books/${id}`);
        setBooks(books.filter((book) => book._id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const editBook = (book) => {
    setCurrentBook(book);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...updatePayload } = currentBook;

    try {
      await axios.put(`http://localhost:8888/api/books/${_id}`, updatePayload);
      setShowEditModal(false);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex flex-row items-center justify-center gap-20 ">
          <h1 className="text-3xl text-center font-medium pt-4">All Books</h1>
        </div>
        <div className="table-responsive p-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={book.imageURL}
                      className="img-fluid max-h-[120px]"
                      alt={book.bookTitle}
                    />
                  </td>
                  <td>{book.bookTitle}</td>
                  <td>{book.authorName}</td>
                  <td>{book.category}</td>
                  <td className="line-clamp-3 w-[47vw] pb-4 h- max-[40px]">
                    {book.bookDescription}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2 items-center justify-start">
                      {" "}
                      <Button
                        variant="primary"
                        className="bg-main mr-2"
                        onClick={() => editBook(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteBook(book._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UploadBook />
        </div>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentBook && (
              <Form onSubmit={handleEditSubmit}>
                <Form.Group controlId="bookTitle">
                  <Form.Label>Book Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookTitle"
                    value={currentBook.bookTitle}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="authorName">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="authorName"
                    value={currentBook.authorName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="imageURL">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageURL"
                    value={currentBook.imageURL}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={currentBook.category}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="bookDescription">
                  <Form.Label>Book Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bookDescription"
                    value={currentBook.bookDescription}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="bookPDFURL">
                  <Form.Label>Book PDF URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookPDFURL"
                    value={currentBook.bookPDFURL}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button className="bg-main mt-3" type="submit">
                  Save Changes
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Books;
