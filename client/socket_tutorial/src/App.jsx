import { useState, useEffect } from "react";
import "./styles/App.scss";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [values, SetValues] = useState({
    message: "",
  });
  const [MessageRecived, SetMessageRecived] = useState("");
  useEffect(() => {
    socket.on("recive_message", (data) => {
      SetMessageRecived(data.message);
    });
  }, [socket]);

  const ToastOpt = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const handleValidation = () => {
    const { message } = values;

    if (message.length < 1) {
      toast.error("Please fill in fields!", ToastOpt);
      return false;
    } else {
      toast.success("Message will Sent!", ToastOpt);
      socket.emit("send_message", { message });
      return true;
    }
  };

  const handleChange = (event) => {
    SetValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidation();
  };
  return (
    <>
      <div className="FormContainer">
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            placeholder="Enter message..."
            onChange={(e) => handleChange(e)}
            name="message"
          />
          <button type="submit">Send Message</button>
          <h1>Message:</h1>
          <h2>{MessageRecived}</h2>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
