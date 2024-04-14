import { useDeferredValue, useMemo } from "react";

import usePets from "../../hooks/usePets";
import Results from "./Results";
import SearchForm from "./SearchForm";

const SearchParams = () => {
  const [pets, requestPets] = usePets();
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets],
  );

  return (
    <div className="mx-auto my-0 w-11/12">
      <SearchForm requestPets={requestPets} />
      {renderedPets}
    </div>
  );
};

export default SearchParams;
