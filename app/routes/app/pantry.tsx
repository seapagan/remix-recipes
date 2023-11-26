import {
  type LoaderFunctionArgs,
  json,
  type ActionFunction,
} from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useNavigation,
} from "@remix-run/react";
import classNames from "classnames";
import React from "react";
import { PrimaryButton } from "~/components/forms";
import { PlusIcon, SearchIcon } from "~/components/icons";
import { createShelf, getAllShelves } from "~/models/pantry-shelf.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const shelves = await getAllShelves(q);
  return json({ shelves });
};

export const action: ActionFunction = async () => {
  return createShelf();
};

export const Pantry = () => {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const containerRef = React.useRef<HTMLUListElement>(null);

  const isSearching = navigation.formData?.has("q");
  const isCreatingShelf = navigation.formData?.has("createShelf");

  React.useEffect(() => {
    if (!isCreatingShelf && containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [isCreatingShelf]);

  return (
    <div>
      <Form
        className={classNames(
          "flex border-2 borger-gray-300 rounded-md",
          "focus-within:border-primary md:w-80",
          isSearching ? "animate-pulse" : ""
        )}
      >
        <button className="px-2 mr-1">
          <SearchIcon />
        </button>
        <input
          defaultValue={searchParams.get("q") ?? ""}
          type="text"
          name="q"
          autoComplete="off"
          placeholder="Search Shelves..."
          id=""
          className="w-5/6 py-3 px-2 outline-none"
        />
      </Form>
      <Form method="POST">
        <PrimaryButton
          name="createShelf"
          className={classNames(
            "mt-4 w-full md:w-fit",
            isCreatingShelf ? "bg-primary-light" : ""
          )}
        >
          <PlusIcon />
          <span className="pl-2">
            {isCreatingShelf ? "Creating Shelf" : "Create Shelf"}
          </span>
        </PrimaryButton>
      </Form>
      <ul
        ref={containerRef}
        className={classNames(
          "flex gap-8 overflow-x-auto mt-4 pb-4",
          "snap-x snap-mandatory md:snap-none"
        )}
      >
        {data.shelves.map((shelf) => (
          <li
            key={shelf.id}
            className={classNames(
              "border-2 border-primary rounded-md p-4",
              "w-[calc(100vw-2rem)] flex-none snap-center h-fit",
              "md:w-96"
            )}
          >
            <h1 className="text-2xl font-extrabold mb-2">{shelf.name}</h1>
            <ul>
              {shelf.items.map((item) => (
                <li key={item.id} className="py-2">
                  {item.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pantry;
