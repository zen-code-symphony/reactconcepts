import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

import useBreedList from "../../hooks/useBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

test("gives empty list when no animal provided", async () => {
  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("pending");
});
