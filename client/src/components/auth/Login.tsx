import React from "react";
import axios from "axios";

interface LoginProps {
  renderSignup: () => void;
}
const Login = ({ renderSignup }: LoginProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        // sucessful, save the token
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);

          window.location.href = "/dashboard";
        } else {
          // do some validation, logging
        }
      });
  };

  return (
    <div style={{ height: "300px" }}>
      <h1 className="text-center text-indigo-500 font-bold">Login</h1>
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
        <label className="text-white">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <div>
        <p className="text-white">
          If you dont have an account<br></br> You can
          <span
            className="text-indigo-500 cursor-pointer"
            onClick={renderSignup}
          >
            {" "}
            sign up here
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center my-4">
        <button
          className="rounded-lg px-6 py-3 font-bold bg-indigo-500 text-white"
          onClick={() => onSubmit()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
