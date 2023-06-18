"use client";
import React from "react";
import { useSession } from "next-auth/react";

const ClientProfile = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default ClientProfile;
