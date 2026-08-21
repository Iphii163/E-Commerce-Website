"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function ClearCartOnLoad() {
  const { clearCart, loaded } = useCart();

  useEffect(() => {
    if (loaded) {
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return null;
}