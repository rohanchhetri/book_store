import { useState, useEffect } from "react";
import { PORT } from "../../utils/port";
import Header from "../../components/Header";

const statusColors = {
  Ongoing: "bg-yellow-200",
  Resolved: "bg-green-200",
  Pending: "bg-red-200",
};

const Messages = () => {
  useEffect(() => {
    (document.title = "BookHub | User Messages"), [];
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch messages from the API
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:${PORT}/api/messages`);
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    if (newStatus === "Resolved") {
      // First update status to Resolved and change color
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === id ? { ...msg, status: "Resolved" } : msg
        )
      );

      setTimeout(async () => {
        try {
          const response = await fetch(
            `http://localhost:${PORT}/api/messages/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete message");
          }

          // Remove the deleted message from state
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg._id !== id)
          );
        } catch (err) {
          console.error("Error deleting message:", err);
          setError(err.message);
        }
      }, 1000); // 1 seconds delay
    } else {
      // Update the status in the database
      try {
        const response = await fetch(
          `http://localhost:${PORT}/api/messages/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }), // Send the new status
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update message status");
        }

        // Update the status on the frontend
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === id ? { ...msg, status: newStatus } : msg
          )
        );
      } catch (err) {
        console.error("Error updating message status:", err);
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 mt-14">
        <h1 className="text-2xl font-bold mb-4">Submitted Messages</h1>
        {messages.length === 0 ? (
          <p>No new messages available.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className={`shadow-md p-4 rounded-md flex flex-col md:flex-row justify-between items-start ${
                  statusColors[msg.status]
                }`}
              >
                <div>
                  <p>
                    <strong>Name:</strong> {msg.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {msg.email}
                  </p>
                  <p>
                    <strong>Message:</strong> {msg.message}
                  </p>
                </div>
                <div className="flex items-center">
                  <select
                    value={msg.status}
                    onChange={(e) =>
                      handleStatusChange(msg._id, e.target.value)
                    }
                    className="md:ml-4 border rounded-md p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Messages;
