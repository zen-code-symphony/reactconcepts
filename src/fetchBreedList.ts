import { QueryFunction } from "@tanstack/react-query";

import { Animal, BreedListApiResponse } from "./APIResponsesTypes";

const fetchBreedList: QueryFunction<
  BreedListApiResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal = queryKey[1];

  if (!animal) {
    return [];
  }

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
  );

  if (!apiRes.ok) {
    throw new Error(`animal/${animal} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchBreedList;
