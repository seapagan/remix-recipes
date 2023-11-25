import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const getShelves = () => {
  return [
    {
      name: "Dairy",
      items: {
        create: [
          {
            name: "Milk",
          },
          {
            name: "Eggs",
          },
          {
            name: "Cheese",
          },
        ],
      },
    },
    {
      name: "Fruits",
      items: {
        create: [
          {
            name: "Apples",
          },
          {
            name: "Oranges",
          },
        ],
      },
    },
  ];
};

const seed = async () => {
  await Promise.all(
    getShelves().map((shelf) => db.pantryShelf.create({ data: shelf }))
  );
};

seed();
