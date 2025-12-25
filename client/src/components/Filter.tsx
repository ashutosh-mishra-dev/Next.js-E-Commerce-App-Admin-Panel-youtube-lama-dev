"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    //params.set("sort", value); ye yha galat h eske jagah me ham niche alag-2 method ke hisab se kar sakte hai
    //method 1:
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    //method 2:
    //params.set("sort", value ?? "");

    //method 3:
    //params.set("sort", value as string);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="my-6 flex items-center justify-end gap-2 text-sm text-gray-500">
      <span>Sort by :</span>
      <select
        name="sort"
        id="sort"
        className="rounded-sm p-1 shadow-md ring-1 ring-gray-200"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="asc">Price : Low to High</option>
        <option value="desc">Price : High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
