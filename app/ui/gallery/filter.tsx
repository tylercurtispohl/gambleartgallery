"use client";

import { SanityCategory } from "@/app/lib/types";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Selection } from "@react-types/shared";

export const Filter = (props: { categories: SanityCategory[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { categories } = props;
  const currentCategoryId = searchParams.get("categoryId") ?? "";

  const [filterValue, setFilterValue] = useState<Selection>(
    new Set([`category_${currentCategoryId}`])
  );
  const navigateToFilter = useDebouncedCallback((value: string | undefined) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("categoryId", value);

      replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("categoryId");
      replace(pathname);
    }
  }, 100);

  const handleSelectionChange = (keys: Selection) => {
    setFilterValue(keys);

    const selectedCategory =
      typeof keys === "object"
        ? keys.values().next().value.replace("category_", "")
        : "";

    navigateToFilter(selectedCategory);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-2">
      <Select
        label="Filter"
        size="sm"
        className="col-span-1 md:col-start-3 lg:col-start-4"
        onSelectionChange={handleSelectionChange}
        selectedKeys={filterValue}
      >
        {[{ _id: "", name: "All" }, ...categories].map((c) => (
          <SelectItem key={`category_${c._id}`} value={c._id}>
            {c.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
