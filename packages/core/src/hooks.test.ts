import { afterEach, describe, expect, it, vi } from "vitest";
import type { Genome } from "./genome";
import { bindContainerSize, bindMediaQueries } from "./hooks";

describe("browser environment bindings", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("syncs media query values into Genome context", () => {
    const mutate = vi.fn();

    const genome = {
      mutate,
    } as unknown as Genome;

    let darkModeListener: (() => void) | undefined;
    let reducedMotionListener: (() => void) | undefined;

    const darkModeQuery = {
      matches: false,

      addEventListener: vi.fn((_event: string, listener: () => void) => {
        darkModeListener = listener;
      }),

      removeEventListener: vi.fn(),
    };

    const reducedMotionQuery = {
      matches: true,

      addEventListener: vi.fn((_event: string, listener: () => void) => {
        reducedMotionListener = listener;
      }),

      removeEventListener: vi.fn(),
    };

    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => {
        if (query === "(prefers-color-scheme: dark)") {
          return darkModeQuery;
        }

        return reducedMotionQuery;
      }),
    );

    const cleanup = bindMediaQueries(genome);

    expect(mutate).toHaveBeenCalledWith({
      colorScheme: "light",
      reducedMotion: true,
    });

    darkModeQuery.matches = true;
    darkModeListener?.();

    expect(mutate).toHaveBeenLastCalledWith({
      colorScheme: "dark",
      reducedMotion: true,
    });

    expect(reducedMotionListener).toBeDefined();

    cleanup();

    expect(darkModeQuery.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    expect(reducedMotionQuery.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("syncs container width into Genome context", () => {
    const mutate = vi.fn();

    const genome = {
      mutate,
    } as unknown as Genome;

    let resizeCallback: ResizeObserverCallback | undefined;

    const observe = vi.fn();
    const disconnect = vi.fn();

    class MockResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
      }

      observe = observe;
      disconnect = disconnect;
      unobserve = vi.fn();
    }

    vi.stubGlobal("ResizeObserver", MockResizeObserver);

    const element = document.createElement("div");

    const cleanup = bindContainerSize(genome, element);

    expect(observe).toHaveBeenCalledWith(element);

    const entry = {
      contentRect: {
        width: 640,
      },
    } as ResizeObserverEntry;

    resizeCallback?.([entry], {} as ResizeObserver);

    expect(mutate).toHaveBeenCalledWith({
      containerWidth: 640,
    });

    cleanup();

    expect(disconnect).toHaveBeenCalledOnce();
  });
});
