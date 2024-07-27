import { useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
// import Header from "../../components/Header";

const UploadBook = () => {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState({
    bookTitle: "",
    authorName: "",
    imageURL: "",
    category: "",
    bookDescription: "",
    bookPDFURL: "",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8888/api/books/", book);

      // Optionally handle successful upload
      alert("Book uploaded successfully!");
      setShow(false); // Close the modal
      setBook({
        bookTitle: "",
        authorName: "",
        imageURL: "",
        category: "",
        bookDescription: "",
        bookPDFURL: "",
      }); // Reset the form
      window.location.reload(); // Reload the page to show the new book
    } catch (error) {
      alert(`${error.response.data}.\nPlease try again.`);
      console.error("Error uploading book:", error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Button
        variant=""
        onClick={handleShow}
        className="bg-main text-white w-[160px] h-[50px] hover:bg-[#0B5ED7]"
      >
        Upload New Book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="bookTitle">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="bookTitle"
                value={book.bookTitle}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="authorName">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                name="authorName"
                value={book.authorName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="imageURL">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageURL"
                value={book.imageURL}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={book.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="bookDescription">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bookDescription"
                value={book.bookDescription}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="bookPDFURL">
              <Form.Label>Book PDF URL</Form.Label>
              <Form.Control
                type="text"
                name="bookPDFURL"
                value={book.bookPDFURL}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button className="bg-main mt-3" type="submit">
              Upload Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadBook;
