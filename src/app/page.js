"use client";

import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.log("Session Error :", error.message);
        else setUser(data ? data.session.user : null);
        console.log("Data :", data);
      } catch (error) {
        console.log("Session Error :", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log("Sign Out Error :", error.message);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center font-mono">
        {user ? (
          <div>
            <h1 className="text-4xl">Welcome {user.email}</h1>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSignOut}
                className="border-2 px-4 py-1 hover:bg-white hover:text-black transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
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
