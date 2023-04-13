// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// import useSWR from "swr";
import useUser from "@libs/client/useUser";

export default () => {
  const { user, isLoading } = useUser();
  if (!user) {
    return <div />;
  }
  console.log(user);
  return (
    <div>
      <h1>Welcome {user?.name}!</h1>
      <h3>Your email is: {user?.email}</h3>
    </div>
  );
};
