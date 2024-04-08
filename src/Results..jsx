import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="float-left mb-[25px] w-[715px] rounded-md bg-lightpink px-4 shadow-[0px_0px_12px_#aaa,-0px_-0px_12px_#fff]">
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
