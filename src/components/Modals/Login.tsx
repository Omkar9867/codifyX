import { useModal } from "@/context/ModalContext";
import React, { useState } from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const { openModal } = useModal();
  const [inputs, setInput] = useState({ email: "", password: "" });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login Successfull: ", data);
        localStorage.setItem("token", data.token);
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error sending login request:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin} className="space-y-6 px-6 pb-4">
        <h3 className="text-xl font-medium text-white">SignIn to CodifyX</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Your Email
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Your Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="******"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          Login
        </button>
        <button className="flex w-full justify-end">
          <a
            onClick={() => openModal("forgetPassword")}
            href="#"
            className="text-sm block text-brand-orange hover:underline w-full text-right"
          >
            Forgot Password?
          </a>
        </button>
        <div className="text-sm font-medium text-gray-300">
          Not Registered?{" "}
          <a
            onClick={() => openModal("signin")}
            href="#"
            className="text-blue-700 hover:underline"
          >
            Create Account
          </a>
        </div>
      </form>
    </>
  );
};

export default Login;
