"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type WatchlistItem = {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
};

type WatchlistContextType = {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number) => void;
  toggleWatchlist: (item: WatchlistItem) => void;
  isInWatchlist: (id: number) => boolean;
  watchlistCount: number;
};

const WatchlistContext = createContext<
  WatchlistContextType | undefined
>(undefined);

export function WatchlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [watchlist, setWatchlist] = useState<
    WatchlistItem[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedWatchlist =
      localStorage.getItem("watchlist");

    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
      );
    }
  }, [watchlist, loaded]);

  function addToWatchlist(item: WatchlistItem) {
    setWatchlist((currentWatchlist) => {
      const existingItem = currentWatchlist.find(
        (watchlistItem) =>
          watchlistItem.productId === item.productId
      );

      if (existingItem) {
        return currentWatchlist;
      }

      return [...currentWatchlist, item];
    });
  }

  function removeFromWatchlist(id: number) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter(
        (item) => item.productId !== id
      )
    );
  }

  function toggleWatchlist(item: WatchlistItem) {
    setWatchlist((currentWatchlist) => {
      const existingItem = currentWatchlist.find(
        (watchlistItem) =>
          watchlistItem.productId === item.productId
      );

      if (existingItem) {
        return currentWatchlist.filter(
          (watchlistItem) =>
            watchlistItem.productId !== item.productId
        );
      }

      return [...currentWatchlist, item];
    });
  }

  function isInWatchlist(id: number) {
    return watchlist.some(
      (item) => item.productId === id
    );
  }

  const watchlistCount = watchlist.length;

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
        watchlistCount,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlist must be used inside WatchlistProvider"
    );
  }

  return context;
}
