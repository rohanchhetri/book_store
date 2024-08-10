import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Form,
  Table,
  DropdownButton,
  Dropdown,
  Alert,
} from "react-bootstrap";
import Header from "../../components/Header";

const Users = () => {
  useEffect(() => {
    document.title = "BookHub | Manage Users";
  }, []);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(""); // State for notifications

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/users/");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      setNotification("User deleted successfully.");
      setTimeout(() => {
        setNotification("");
        window.location.reload();
      }, 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error deleting user:", error);
      setNotification("Error deleting user.");
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...updatePayload } = currentUser;
      await axios.put(
        `http://localhost:8888/api/users/${currentUser._id}`,
        updatePayload
      );
      console.log(_id);
      setShowEditModal(false);
      fetchUsers();
      setNotification("User updated successfully.");
      setTimeout(() => {
        setNotification("");
        fetchUsers();
      }, 3000); // Clear notification after 3 seconds
    } catch (error) {
      console.error("Error updating user:", error);
      setNotification("Error updating user.");
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleRoleChange = async (userId, newRole) => {
    const updatedUser = users.find((user) => user._id === userId);
    if (updatedUser) {
      const { _id, ...userWithoutId } = updatedUser; // Exclude _id from the update payload
      try {
        await axios.put(`http://localhost:8888/api/users/${userId}`, {
          ...userWithoutId,
          admin: newRole,
        });
        console.log(_id);
        // Update user in local state
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, admin: newRole } : user
          )
        );
        setNotification("User role updated successfully.");
        setTimeout(() => {
          setNotification("");
          window.location.reload();
        }, 3000); // Clear notification after 3 seconds
      } catch (error) {
        console.error("Error updating role:", error);
        setNotification("Error updating role.");
        setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container flex flex-col justify-center md:items-center md:m w-[100%] sm:text-xs md:text-sm lmd:text-base lg:text-lg xl:text-xl">
        <h1 className="text-3xl font-medium py-4">All Users</h1>
        {notification && (
          <Alert variant="info" className="mb-3">
            {notification}
          </Alert>
        )}
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.fullAddress}</td>
                  <td>
                    <DropdownButton
                      id={`dropdown-role-${user._id}`}
                      title={user.admin ? "Admin" : "User"}
                      onSelect={(eventKey) =>
                        handleRoleChange(user._id, eventKey === "admin")
                      }
                    >
                      <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                      <Dropdown.Item eventKey="user">User</Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td className="flex flex-wrap gap-2">
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* Edit User Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentUser && (
              <Form onSubmit={handleEditSubmit}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={currentUser.firstName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={currentUser.lastName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="contact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    value={currentUser.contact}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="fullAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullAddress"
                    value={currentUser.fullAddress}
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

export default Users;
