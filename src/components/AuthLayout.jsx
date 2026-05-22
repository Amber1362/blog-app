import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return
  
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate, authentication, loading]);

  if(loading) return null
  
  return <>{children}</>;
}