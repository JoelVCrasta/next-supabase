"use client";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import { redirect } from "next/dist/server/api-utils";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return;
      } else {
        console.log("Login successful");

      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1>Login</h1>
        <div className="text-black">
          <form onSubmit={handleLogin}>
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
              <button type="submit">Login</button>
            </div>
            <div>
              <p className="text-white">
                Dont have an account? <a href="/signup">SignUp</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
