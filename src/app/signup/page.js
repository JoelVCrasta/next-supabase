"use client";
import { useState, useRef } from "react";
import supabase from "../config/supabaseClient";

const signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        username,
        email,
        password,
      });

      if (error) console.log(error.message);
      else alert("Check your email for the confirmation link");
    } catch {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1>Signup</h1>
        <div className="text-black">
          <form onSubmit={handleSignup}>
            <div className="flex flex-col">
              <p></p>
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center border-2 mt-4 text-white">
              <button type="submit">Signup</button>
            </div>
            <div>
              <p className="text-white">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
