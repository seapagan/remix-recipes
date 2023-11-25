import { json, type LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  return json({ message: "Hello, There!" });
};

type LoaderData = {
  message: string;
};

export default function Settings() {
  const data: LoaderData = useLoaderData();

  return (
    <div>
      <h1>Settings</h1>
      <p>This is the settings page.</p>
      <p>Message from loader: {data?.message}</p>
      <nav>
        <Link to="app">App</Link>
        <Link to="profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};
