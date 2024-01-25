"use client";

import { SanityCategory } from "@/app/lib/types";
import { FunnelIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const Filter = (props: { categories: SanityCategory[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { categories } = props;
  const currentCategoryId = searchParams.get("categoryId") ?? "";

  const [filterValue, setFilterValue] = useState<string>(currentCategoryId);

  const navigateToFilter = useDebouncedCallback((value: string | undefined) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("categoryId", value);

      replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("categoryId");
      replace(pathname);
    }

    setIsPopoverOpen(false);
  }, 100);

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
    navigateToFilter(value);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-end w-full py-2">
        <Popover
          placement="bottom-end"
          isOpen={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          size="lg"
          classNames={{
            content: "p-6",
          }}
        >
          <PopoverTrigger>
            <FunnelIcon className="cursor-pointer h-6 w-6 text-blue-900" />
          </PopoverTrigger>
          <PopoverContent>
            <RadioGroup
              value={filterValue}
              onValueChange={handleFilterValueChange}
            >
              {/* <p className="text-blue-900 text-md">Filter Paintings</p> */}
              <Radio key="category_all" value="">
                All
              </Radio>
              {categories.map((c) => (
                <Radio key={`category_${c._id}`} value={`${c._id}`}>
                  {c.name}
                </Radio>
              ))}
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
