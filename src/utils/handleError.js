import toast from "react-hot-toast";

export default function handleError(
  error,
  fallbackMessage = "Something went wrong. Please try again."
) {
  console.error(error);

  const message = error?.message || "";

  if (
    message.includes("Failed to fetch") ||
    message.includes("Network")
  ) {
    toast.error(
      "Network error. Please check your internet connection.",
      {
        id: "network-error",
      }
    );

    return;
  }

  toast.error(fallbackMessage, {
    id: "standard-error",
  });
}