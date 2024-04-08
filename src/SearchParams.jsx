import Results from "./Results.";
import SearchForm from "./SearchForm";
import usePets from "./hooks/usePets";

const SearchParams = () => {
  const [pets, requestPets] = usePets();

  return (
    <div className="mx-auto my-0 w-[1100px] md:w-[95%]">
      <SearchForm requestPets={requestPets} />
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
