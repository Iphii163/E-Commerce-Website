"use client";

import Image from "next/image";

type CartItemProps = {
  item: {
    productId: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
  };
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex gap-4 border-b border-gray-200 py-6 sm:gap-6">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:h-36 sm:w-36">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="144px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {item.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            ${item.price.toFixed(2)} each
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
            <button
              onClick={() => onDecrease(item.productId)}
              className="px-3 py-2 text-gray-600 transition hover:bg-gray-100"
            >
              −
            </button>

            <span className="min-w-10 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() => onIncrease(item.productId)}
              className="px-3 py-2 text-gray-600 transition hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.productId)}
            className="text-sm font-medium text-gray-400 transition hover:text-red-500"
          >
            Remove
          </button>

          <p className="font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}