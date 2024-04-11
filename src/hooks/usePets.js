import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import fetchPets from "../fetchPets";

export default function usePets() {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const { data } = useQuery({
    queryKey: ["pets", requestParams],
    queryFn: fetchPets,
  });

  function requestPets({ animal, location, breed }) {
    setRequestParams({
      animal,
      location,
      breed,
    });
  }

  return [data?.pets ?? [], requestPets];
}
