import { redirect, type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("/app/pantry");
};
