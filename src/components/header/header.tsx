import React from "react";
import { useLogout, useGetIdentity, useNavigation } from "@refinedev/core";

import { Link } from "react-router-dom";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  const { listUrl, createUrl } = useNavigation();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? "Admin"}</span>
      </h2>
      <Link to={listUrl("protected-products")}>List Products</Link>
      <Link to={createUrl("protected-products")}>Create Product</Link>
      <button type="button" disabled={isLoading} onClick={mutate}>
        Logout
      </button>
    </>
  );
};
