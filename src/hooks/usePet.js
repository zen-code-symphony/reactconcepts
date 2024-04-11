import { useQuery } from "@tanstack/react-query";

import fetchPet from "../fetchPet";

export default function usePet(id) {
  const { isError, error, isLoading, data } = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  });
  const pet = data?.pets[0] || null;
  const errorMsg = isError ? error.message : null;
  return { isLoading, pet, errorMsg };
}
