import { useSyncExternalStore } from "react";

type MediaStore = {
  media: MediaQueryList;
  listeners: Set<() => void>;
  notify: () => void;
};

const mediaStores = new Map<string, MediaStore>();

function getMediaStore(query: string) {
  const existing = mediaStores.get(query);
  if (existing) return existing;

  const listeners = new Set<() => void>();
  const store: MediaStore = {
    media: window.matchMedia(query),
    listeners,
    notify: () => listeners.forEach((listener) => listener()),
  };

  mediaStores.set(query, store);
  return store;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (listener) => {
      const store = getMediaStore(query);
      if (store.listeners.size === 0) store.media.addEventListener("change", store.notify);
      store.listeners.add(listener);

      return () => {
        store.listeners.delete(listener);
        if (store.listeners.size === 0) store.media.removeEventListener("change", store.notify);
      };
    },
    () => getMediaStore(query).media.matches,
    () => false,
  );
}

const visibilityListeners = new Set<() => void>();
const notifyVisibility = () => visibilityListeners.forEach((listener) => listener());

function subscribeToVisibility(listener: () => void) {
  if (visibilityListeners.size === 0) {
    document.addEventListener("visibilitychange", notifyVisibility);
  }
  visibilityListeners.add(listener);

  return () => {
    visibilityListeners.delete(listener);
    if (visibilityListeners.size === 0) {
      document.removeEventListener("visibilitychange", notifyVisibility);
    }
  };
}

export function useDocumentVisible() {
  return useSyncExternalStore(
    subscribeToVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
}

export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
