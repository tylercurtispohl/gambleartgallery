"use client";

import { CategoryT } from "@/app/lib/data";
import { FunnelIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const Filter = (props: { categories: CategoryT[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { categories } = props;
  const currentCategoryId = searchParams.get("categoryId") ?? undefined;

  const [filterValue, setFilterValue] = useState<string | undefined>(
    currentCategoryId
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

    setIsPopoverOpen(false);
  }, 300);

  const handleFilterValueChange = (value: string | undefined) => {
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
        >
          <PopoverTrigger>
            <FunnelIcon className="cursor-pointer h-6 w-6 text-blue-900" />
          </PopoverTrigger>
          <PopoverContent>
            <RadioGroup
              label="Filter Paintings"
              color="primary"
              value={filterValue}
              onValueChange={handleFilterValueChange}
            >
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
