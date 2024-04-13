import Results from "./Results.";
import SearchForm from "./SearchForm";
import usePets from "./hooks/usePets";

const SearchParams = () => {
  const [pets, requestPets] = usePets();

  return (
    <div className="mx-auto my-0 w-11/12">
      <SearchForm requestPets={requestPets} />
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
