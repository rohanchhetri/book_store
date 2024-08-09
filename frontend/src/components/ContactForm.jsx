import { useState } from "react";
import { PORT } from "../utils/port";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    status: "Pending", // Add status to form state
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    const { name, email, message, status } = form;

    if (!name || !email || !message) {
      setError("Please fill all the fields.");
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      try {
        const response = await fetch(`http://localhost:${PORT}/api/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message, status }), // Include status in request body
        });

        if (response.ok) {
          setSubmitted(true);
          // Clear form fields after successful submission
          setForm({
            name: "",
            email: "",
            message: "",
            status: "Pending", // Reset status after submission
          });
        } else {
          console.error("Failed to submit message");
        }
      } catch (error) {
        console.error("Error submitting message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {submitted ? (
        <div className="bg-white shadow-md p-6 my-5 rounded-md text-center">
          <h1 className="text-2xl font-semibold">
            Thank you for reaching out!
          </h1>
          <p>
            We have received your message and will get back to you as soon as
            possible.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 bg-main text-white py-2 px-4 rounded-md"
          >
            OK
          </button>
        </div>
      ) : (
        <div className="min-w-[40vw] max-w-[500px] bg-white shadow-md p-6 my-5 rounded-md">
          <h1 className="text-2xl font-semibold text-center">
            Leave us message
          </h1>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
            rows="5"
          />
          <button
            onClick={handleSubmit}
            className="bg-main text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
