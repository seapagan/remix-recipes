import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  NavLink,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";
import {
  DiscoverIcon,
  HomeIcon,
  RecipeBookIcon,
  SettingsIcon,
} from "./components/icons";
import classNames from "classnames";

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
      <body className="md:flex md:h-screen">
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
              <AppNavLink to="app">
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
        <div className="p-4">
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
  return (
    <li className="w-16">
      <NavLink to={to}>
        {({ isActive }) => (
          <div
            className={classNames(
              "py-4 flex justify-center hover:bg-primary-light",
              {
                "bg-primary-light": isActive,
              }
            )}
          >
            {children}
          </div>
        )}
      </NavLink>
    </li>
  );
};
