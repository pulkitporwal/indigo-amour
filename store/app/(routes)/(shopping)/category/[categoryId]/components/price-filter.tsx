"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const PriceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialLowerPrice = parseInt(searchParams.get("lowerPrice") || "0");
  const initialUpperPrice = parseInt(searchParams.get("upperPrice") || "1000");

  const [priceRange, setPriceRange] = useState([
    initialLowerPrice,
    initialUpperPrice,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const current = qs.parse(searchParams.toString());

      const query = {
        ...current,
        lowerPrice: priceRange[0],
        upperPrice: priceRange[1],
      };

      if (priceRange[0] === 0 && priceRange[1] === 1000) {
        delete query.lowerPrice;
        delete query.upperPrice;
      }

      const url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );

      router.push(url);
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [priceRange, router, searchParams]);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">Price Range</h3>
      <hr className="my-4" />

      <div className="px-2">
        <div className="mt-6">
          <input
            type="range"
            min={0}
            max={25000}
            step={10}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="slider"
          />
          <input
            type="range"
            min={0}
            max={25000}
            step={10}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="slider"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">₹</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="w-20 p-1 text-sm border rounded-md"
              min={0}
              max={priceRange[1]}
            />
          </div>
          <div className="text-sm text-gray-500">to</div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">₹</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-20 p-1 text-sm border rounded-md"
              min={priceRange[0]}
              max={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
