import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  });

  if (results.isError) {
    return <h2>Oh no! {results.error.message}</h2>;
  }

  if (results.isLoading) {
    return (
      <div className="flex items-center justify-center p-[15px]">
        <h2 className="animate-spin text-[50px]">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="mx-auto my-0 mb-[25px] w-[1100px] rounded-md bg-lightpink p-[15px] shadow-[0px_0px_12px_#aaa,-0px_-0px_12px_#fff]">
      <div>
        <h1 className="mx-0 my-[5px] text-center text-6xl text-[#333]">
          {pet.name}
        </h1>
        <h2 className="mx-0 mb-5 mt-[5px] text-center">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button className="mx-auto my-0 block cursor-pointer rounded-[5px] border-[#333] border-[solid] bg-primary px-[25px] py-[5px] text-lg text-[white]">
            Adopt {pet.name}
          </button>
          <p className="px-[15px] pt-5 leading-normal">{pet.description}</p>
        </h2>
      </div>
    </div>
  );
};

export default Details;