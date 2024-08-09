import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { PORT } from "../../utils/port";
import StarRating from "../../components/StarRating";
import { generateRating } from "../../utils/rating";
import FeedBack from "../../components/FeedBack";
import CountUp from "react-countup";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.title = "Admin Dashboard";

    // Fetch messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${PORT}/api/messages`
        );
        setMessages(response.data.slice(0, 2)); // Get only the first 2 messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overview Widgets */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Total Books</h3>
            <CountUp
              start={150}
              end={237}
              duration={5}
              className="text-2xl font-bold text-gray-900"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>{" "}
            <CountUp
              start={2899}
              end={3210}
              duration={5}
              className="text-2xl font-bold text-gray-900"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">
              Active Users
            </h3>{" "}
            <CountUp
              start={2000}
              end={2250}
              duration={5}
              className="text-2xl font-bold text-gray-900"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">
              Total Ad Revenue
            </h3>

            <p className="text-2xl font-bold text-gray-900">
              $
              <CountUp
                start={10000}
                end={12250}
                duration={5}
                className="text-2xl font-bold text-gray-900"
              />
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">New Signups</h3>
            <CountUp
              start={50}
              end={169}
              duration={5}
              className="text-2xl font-bold text-gray-900"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Charts */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-700">
                Book Statistics Chart
              </h4>
              <div className="min-h-56 rounded-md overflow-hidden">
                <img src="/src/assets/chart.jpg" alt="Book Statistics Chart" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-700">
                User Engagement Chart
              </h4>
              <div className="min-h-56 overflow-hidden rounded-md">
                <img
                  src="/src/assets/chart2.png"
                  alt="User Engagement Chart"
                  className="scale-110 pt-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Notifications
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4 ">
            <h4 className="text-lg font-semibold text-gray-700">Messages</h4>
            <div className="flex flex-col lmd:flex-row w-full lmd:justify-between gap-4">
              {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className="mt-2 lmd:w-[45%] bg-gray-50 p-4 rounded-md shadow-sm"
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-gray-700">
                        {message.name}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({message.email})
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{message.message}</p>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        message.status === "Pending"
                          ? "bg-red-700 text-white"
                          : message.status === "Ongoing"
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No messages available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="flex gap-4">
            <Link to={"/admin/manage-books"}>
              <button className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600">
                Manage Books
              </button>
            </Link>
            <Link to={"/admin/manage-users"}>
              <button className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600">
                Manage Users
              </button>
            </Link>
            <Link to={"/admin/messages"}>
              <button className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600">
                Messages
              </button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Feedback
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700">
              User Feedback
            </h4>
            <FeedBack />
            {/* <div className="flex justify-evenly">
              <div className="flex flex-col gap-4 items-starjt justify-center p-3 px-4 min-w-[25vw] max-w-[420px]  shadow-md bg-gray-200 rounded-lg mb-5">
                {<StarRating rating={generateRating()} />}
                <p className="text-justify line-clamp-5">
                  Lorem ipsum dolodae, ea, natus dolore evenie num consectetur
                  adipisicingor sit llo numquam qui fugia num elit. Consequatur
                  fugiat placeat quasi earum atque sequi velit, cot tempora odit
                  culpaerror iueveniet tempora odit culpasto et iure ipsum
                  veniam illo quas!
                </p>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRelVK9xEj_QrOvVKAFfBypo3p-NoFVgU5U3w&s"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <p className="text-lg font-medium">John Doe</p>
              </div>
            </div> */}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Upcoming Events
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700">
              Event Details
            </h4>
            <p className="text-gray-600">No upcoming events at the moment...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
