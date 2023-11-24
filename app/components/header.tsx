type HeaderProps = {
  children: string;
};

export const Header = ({ children }: HeaderProps) => {
  return <h1 className="header">{children}</h1>;
};
