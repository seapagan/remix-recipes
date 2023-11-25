import React from "react";

import { useMatches } from "@remix-run/react";

type useMatchesDataType = {
  message: string | undefined;
};

export const useMatchesData = (id: string): useMatchesDataType => {
  const matches = useMatches();
  const route = React.useMemo(
    () => matches.find((route) => route.id === id),
    [matches, id]
  );
  return route?.data;
};
