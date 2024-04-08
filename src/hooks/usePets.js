import { useEffect, useState } from "react";

export default function usePets(animal, location, breed) {
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const res =
      await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}
  `);
    const json = await res.json();
    setPets(json.pets);
  }

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [pets, requestPets];
}
