"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

type FilterBarProps = {
  categories: string[];
};

export default function FilterBar({
  categories,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlSearch =
    searchParams.get("search") || "";

  const [searchInput, setSearchInput] =
    useState(urlSearch);

  const previousPage = useRef(
    searchParams.get("page") || "1"
  );

  const currentCategory =
    searchParams.get("category") || "";

  const currentSort =
    searchParams.get("sort") || "";

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {

      const currentSearch =
        searchParams.get("search") || "";

      if (searchInput === currentSearch) {
        return;
      }

      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (searchInput.trim()) {

        if (!currentSearch) {
          previousPage.current =
            searchParams.get("page") || "1";
        }

        params.set(
          "search",
          searchInput.trim()
        );
        params.delete("page");

      }

      else {

        params.delete("search");

        const savedPage =
          previousPage.current;

        if (savedPage !== "1") {
          params.set(
            "page",
            savedPage
          );
        } else {
          params.delete("page");
        }
      }

      const queryString =
        params.toString();

      router.push(
        queryString
          ? `/products?${queryString}`
          : "/products"
      );

    }, 500);

    return () => clearTimeout(timer);

  }, [
    searchInput,
    searchParams,
    router,
  ]);

  function updateFilter(
    key: string,
    value: string
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    const queryString =
      params.toString();

    router.push(
      queryString
        ? `/products?${queryString}`
        : "/products"
    );
  }


  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

      <div className="grid gap-3 md:grid-cols-3">

        <div className="relative">

          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(event) => {
              setSearchInput(
                event.target.value
              );
            }}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white"
          />

        </div>

        <select
          value={currentCategory}
          onChange={(event) =>
            updateFilter(
              "category",
              event.target.value
            )
          }
          className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:bg-white"
        >

          <option value="">
            All Categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category
                  .charAt(0)
                  .toUpperCase() +
                  category.slice(1)}
              </option>
            )
          )}

        </select>

        <select
          value={currentSort}
          onChange={(event) =>
            updateFilter(
              "sort",
              event.target.value
            )
          }
          className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:bg-white"
        >

          <option value="">
            Sort By
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>

          <option value="rating">
            Highest Rated
          </option>

        </select>

      </div>

    </div>
  );
}