"use client";

import { useEffect } from "react";
import supabase from "../config/supabaseClient";
import { redirect } from "next/dist/server/api-utils";

const page = () => {
  useEffect(() => {
    const confirmUser = async () => {
      const { data, error } = await supabase.auth.api.updateUser({
        email: supabase.auth.user().email,
      });

      if (error) {
        console.error(error.message);
      } else {
        console.log("Email successfully confirmed");
        redirect("/");
      }
    };
  }, []);

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <p>Confirming your email...</p>
      </div>
    </>
  );
};

export default page;
