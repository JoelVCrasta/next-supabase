"use client";

import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checlSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser(data ? data.user : null);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log("Sign Out Error :", error.message);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center font-mono">
        {user ? (
          <div>
            <h1>Welcome {user.email}</h1>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl">Welcome to Supabase Auth</h1>
            <div className="flex justify-around mt-6 text-xl">
              <button
                onClick={() => (window.location.href = "/signup")}
                className="border-2 px-4 py-1 hover:bg-white hover:text-black transition-all duration-300"
              >
                Sign Up
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="border-2 px-4 py-1 hover:bg-white hover:text-black transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
