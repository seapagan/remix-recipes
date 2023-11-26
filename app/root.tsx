import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  NavLink,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useResolvedPath,
  useRouteError,
  Link,
} from "@remix-run/react";

import styles from "./tailwind.css";
import {
  DiscoverIcon,
  HomeIcon,
  RecipeBookIcon,
  SettingsIcon,
} from "./components/icons";
import classNames from "classnames";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Recipes" },
    { name: "description", content: "Welcome to the Remix Recipes App" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="md:flex md:h-screen bg-background">
        <nav className="bg-primary text-white">
          <ul className="flex md:flex-col">
            <li>
              <AppNavLink to="/">
                <HomeIcon />
              </AppNavLink>
            </li>
            <li>
              <AppNavLink to="discover">
                <DiscoverIcon />
              </AppNavLink>
            </li>
            <li>
              <AppNavLink to="app/pantry">
                <RecipeBookIcon />
              </AppNavLink>
            </li>
            <li>
              <AppNavLink to="settings">
                <SettingsIcon />
              </AppNavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 w-full md:w-[calc(100%-4rem)]">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

type AppNavLinkProps = {
  to: string;
  children: React.ReactNode;
};

const AppNavLink = ({ to, children }: AppNavLinkProps) => {
  const path = useResolvedPath(to);
  const navigation = useNavigation();

  const isLoading =
    navigation.state === "loading" &&
    navigation.location.pathname === path.pathname &&
    navigation.formMethod === undefined;

  return (
    <li className="w-16">
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={classNames(
              "py-4 flex justify-center hover:bg-primary-light",
              isActive ? "bg-primary-light" : "",
              isLoading ? "animate-pulse bg-primary-light" : ""
            )}
          >
            {children}
          </div>
        )}
      </NavLink>
    </li>
  );
};

export const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <html>
      <head>
        <title>Whoops!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="p-4">
          <h1 className="text-2xl pb-3">Whoops!</h1>
          <p>You're seeing this page because an unexpected error occured.</p>
          {error instanceof Error ? (
            <p className=" my-4 font-bold text-red-600">{error.message}</p>
          ) : null}
          <Link to="/" className="text-primary">
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
};
