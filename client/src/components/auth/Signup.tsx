import React from "react";
import axios from "axios";

interface SignupProps {
  renderLogin: () => void;
}

const Signup = ({ renderLogin }: SignupProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const onSubmit = () => {
    axios
      .post("/signup", {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        console.log(res);
      });
  };

  React.useEffect(() => {
    if (password === confirmPassword) setDisabled(false);
    else setDisabled(true);
  }, [password, confirmPassword]);

  return (
    <div style={{ height: "300px" }}>
      <h1 className="text-center text-indigo-500 font-bold">Sign Up</h1>
      <div className="mb-4">
        <label className="text-white">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="email"
          placeholder="Enter your email address"
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="text"
          placeholder="Enter your user name"
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="password"
          placeholder="Enter your Password"
        />
      </div>
      <div className="mb-4">
        <label className="text-white">Confirm Password</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="password"
          placeholder="Confirm your Password"
        />
      </div>
      <div>
        <p className="text-white">
          If you already have an account registered You can{" "}
          <span
            className="text-indigo-500 cursor-pointer"
            onClick={renderLogin}
          >
            Login here
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center my-4">
        <button
          className={`rounded-lg px-6 py-3 font-bold text-white ${
            disabled ? "bg-gray-400" : "bg-indigo-500"
          }`}
          disabled={disabled}
          onClick={() => onSubmit()}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
