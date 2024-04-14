import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Pet } from "../ApiResponsesTypes";
import fetchPets from "../fetchPets";

export interface RequestParams {
  location: string;
  animal: string;
  breed: string;
}

export type RequestPetsFunction = (params: RequestParams) => void;

export default function usePets() {
  const [requestParams, setRequestParams] = useState<RequestParams>({
    location: "",
    animal: "",
    breed: "",
  });
  const { data } = useQuery({
    queryKey: ["pets", requestParams],
    queryFn: fetchPets,
  });

  function requestPets({ animal, location, breed }: RequestParams) {
    setRequestParams({
      animal,
      location,
      breed,
    });
  }

  return [data?.pets ?? [], requestPets] as [Pet[], RequestPetsFunction];
}
