"use client";
import { useState, useRef } from "react";
import supabase from "../config/supabaseClient";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) console.log(error.message);
      else alert("Check your email for the confirmation link");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Google login error:", error.message);
      } else {
        console.log("Google login successful");
      }
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="border-2 h-auto w-80 py-4 flex flex-col justify-center shadow-lg shadow-white ">
          <h1 className="text-center text-2xl mb-4 font-semibold">SignUp</h1>
          <div className="p-4">
            <form onSubmit={handleSignup}>
              <div className="flex flex-col">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="border-2 px-4 py-2 mb-4 bg-white bg-opacity-10"
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
                  className="border-2 px-4 py-2 mb-4 bg-white bg-opacity-10"
                />
              </div>
              <hr />
              <div className="border-2 mt-4 hover:bg-white hover:text-black transition-all duration-200">
                <button type="submit" className="w-full h-10 font-semibold">
                  SignUp
                </button>
              </div>
              <div className="border-2 mt-4 hover:bg-white hover:text-black transition-all duration-200">
                <button
                  onClick={handleGoogleSignup}
                  className="w-full h-10 font-semibold"
                >
                  Google
                </button>
              </div>
              <div>
                <p className="mt-4 text-center font-light">
                  Already have an account?{" "}
                  <a href="/login" className="hover:text-red-500">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
