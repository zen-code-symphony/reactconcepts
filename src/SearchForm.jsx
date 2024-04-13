import { useContext, useState } from "react";

import AdoptedPetContext from "./AdoptedPetContext";
import useBreedList from "./hooks/useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

function SearchForm({ requestPets }) {
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  return (
    <form
      className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          location: formData.get("location") ?? "",
          animal: formData.get("animal") ?? "",
          breed: formData.get("breed") ?? "",
        };
        requestPets(obj);
      }}
    >
      {adoptedPet ? (
        <div>
          <img
            src={adoptedPet.images[0]}
            alt={adoptedPet.name}
            className="h-[100px] rounded-full"
          />
        </div>
      ) : null}
      <label htmlFor="location">
        Location
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Location"
          className="mb-5 block w-60"
        />
      </label>

      <label htmlFor="animal">
        Animal
        <select
          id="animal"
          name="animal"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          className="search-input"
        >
          <option />
          {ANIMALS.map((animal) => (
            <option key={animal}>{animal}</option>
          ))}
        </select>
      </label>

      <label htmlFor="breed">
        Breed
        <select
          id="breed"
          name="breed"
          className="search-input grayed-out-disabled"
          disabled={breeds.length === 0}
        >
          <option />
          {breeds.map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
      </label>

      <button className="rounded border-none bg-orange-500  px-6 py-2 text-white hover:opacity-50">
        Submit
      </button>
    </form>
  );
}

export default SearchForm;
