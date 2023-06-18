import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ClientProfile from "@/components/ClientProfile";

async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      this is profile pagge
      <ClientProfile />
    </div>
  );
}

export default Profile;
