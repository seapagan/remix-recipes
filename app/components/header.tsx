import type { LinksFunction } from "@remix-run/node";
import HeaderStyles from "./header.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: HeaderStyles }];
};

type HeaderProps = {
  children: string;
};

export const Header = ({ children }: HeaderProps) => {
  return <h1 className="header">{children}</h1>;
};
