import { QueryStatus, useQuery } from "@tanstack/react-query";

import { Animal } from "../services/ApiResponsesTypes";
import fetchBreedList from "../services/fetchBreedList";

export default function useBreedList(animal: Animal) {
  const results = useQuery({
    queryKey: ["breeds", animal],
    queryFn: fetchBreedList,
  });

  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus,
  ];
}
