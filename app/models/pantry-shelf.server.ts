import db from "~/db.server";

export const getAllShelves = (query: string | null) => {
  return db.pantryShelf.findMany({
    where: {
      name: {
        contains: query ?? "",
        mode: "insensitive",
      },
    },
    include: {
      items: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "desc",
    },
  });
};

export const createShelf = () => {
  return db.pantryShelf.create({
    data: {
      name: "New Shelf",
    },
  });
};
