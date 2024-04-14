import { Pet as PetType } from "./APIResponsesTypes";
import Pet from "./Pet";

const Results = ({ pets }: { pets: PetType[] }) => {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!pets.length ? (
        <h1 className="py-4 font-bold">No pets found.</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              key={pet.id}
              id={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
