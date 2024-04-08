import { useEffect, useState } from "react";

import Results from "./Results.";
import useBreedList from "./hooks/useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
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

  return (
    <div className="mx-auto my-0 w-[1100px] md:w-[95%]">
      <form
        className="float-left my-0 ml-0 mr-[25px] w-[360px] rounded-md bg-lightpink px-[15px] pb-[15px] pt-[35px] shadow-[0px_0px_12px_#aaa,-0px_-0px_12px_#fff]"
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location" className="block w-[60px]">
          Location
        </label>
        <input
          id="location"
          value={location}
          placeholder="Location"
          className="mb-[30px] h-[30px] w-[325px] border border-solid border-border p-2 text-lg"
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="animal" className="block w-[60px]">
          Animal
        </label>
        <select
          id="animal"
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
          value={breed}
          disabled={breeds.length === 0}
          onChange={(e) => setBreed(e.target.value)}
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
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
