import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  return json({ message: "Yo" });
};

type ProfileDataType = {
  message: string;
};

export default function Profile() {
  const data: ProfileDataType = useLoaderData();

  return (
    <div>
      <h2>Profile Settings</h2>
      <p>These are the 'Profile' Settings.</p>
      <p>Message: {data.message}</p>
    </div>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (error instanceof Error) {
    return (
      <div className="bg-red-300 border-2 border-red-600 rounded-md p-4">
        <h1>Whoops, something went wrong.</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return <div>An unexpected error occurred.</div>;
};
