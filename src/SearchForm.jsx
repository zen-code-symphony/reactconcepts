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
      className="float-left my-0 ml-0 mr-[25px] w-[360px] rounded-md bg-lightpink px-[15px] pb-[15px] pt-[35px] shadow-[0px_0px_12px_#aaa,-0px_-0px_12px_#fff]"
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
        <img
          src={adoptedPet.images[0]}
          alt={adoptedPet.name}
          className="m-auto h-[100px] rounded-full"
        />
      ) : null}
      <label htmlFor="location" className="block w-[60px]">
        Location
      </label>
      <input
        id="location"
        name="location"
        placeholder="Location"
        className="mb-[30px] h-[30px] w-[325px] border border-solid border-border p-2 text-lg"
      />

      <label htmlFor="animal" className="block w-[60px]">
        Animal
      </label>
      <select
        id="animal"
        name="animal"
        value={animal}
        onChange={(e) => setAnimal(e.target.value)}
        className="mb-[30px] h-[30px] w-[325px] border border-solid border-border text-lg"
      >
        <option />
        {ANIMALS.map((animal) => (
          <option key={animal}>{animal}</option>
        ))}
      </select>

      <label htmlFor="breed" className="block w-[60px]">
        Breed
      </label>
      <select
        id="breed"
        name="breed"
        disabled={breeds.length === 0}
        className="mb-[30px] h-[30px] w-[325px] border border-solid border-border text-lg"
      >
        <option />
        {breeds.map((breed) => (
          <option key={breed}>{breed}</option>
        ))}
      </select>

      <button className="focus:border-yellow mx-auto my-0 block cursor-pointer rounded-[5px] border-[solid] border-border bg-primary px-[25px] py-[5px] text-lg text-[white] hover:bg-hoverprimary focus:border focus:border-solid active:bg-active">
        Submit
      </button>
    </form>
  );
}

export default SearchForm;
