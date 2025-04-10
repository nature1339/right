import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiRequest from "../utils/api";

export default function HealthGuard({ children }) {
  const router = useRouter();

  const {
    data: health,
    isLoading: isLoading,
    isError,
  } = useQuery({
    queryKey: ["health"],
    queryFn: () =>
      apiRequest("/health", {
        method: "GET",
      }),
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      router.push("/server-error");
    }
  }, [health, isError]);

  if (isLoading) {
    return <></>;
  }

  if (isError) return null;

  return children;
}
