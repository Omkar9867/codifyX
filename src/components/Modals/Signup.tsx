import { useModal } from "@/context/ModalContext";
import React, { useState } from "react";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const { openModal } = useModal();
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      //After receiving the call
      const data = await response.json();
      if (response.ok) {
        console.log("User created:", data);
        openModal('login')
      } else {
        console.error("Signup error:", data.message);
      }
    } catch (error) {
      console.error("Error sending signup request:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleRegister} className="space-y-6 px-6 pb-4">
        <h3 className="text-xl font-medium text-white">Register to CodifyX</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Email
          </label>
          <input
            onChange={handleChangeInput}
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="displayName"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Display Name
          </label>
          <input
            onChange={handleChangeInput}
            type="displayName"
            name="displayName"
            id="displayName"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Password
          </label>
          <input
            onChange={handleChangeInput}
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
          Register
        </button>
        <div className="text-sm font-medium text-gray-300">
          Already have an account?{" "}
          <a
            onClick={() => openModal("login")}
            href="#"
            className="text-blue-700 hover:underline"
          >
            Log In
          </a>
        </div>
      </form>
    </>
  );
};

export default Signup;
