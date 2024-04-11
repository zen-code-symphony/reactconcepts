import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import fetchPets from "../fetchPets";

export default function usePets() {
  const [animal, setAnimal] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");
  const { data } = useQuery({
    queryKey: ["pets", animal, location, breed],
    queryFn: fetchPets,
  });

  function requestPets(animal, location, breed) {
    setAnimal(animal);
    setLocation(location);
    setBreed(breed);
  }

  return [data?.pets || [], requestPets];
}
