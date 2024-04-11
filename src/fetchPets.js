const fetchPets = async ({ queryKey }) => {
  const { animal, location, breed } = queryKey[1];

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );

  if (!apiRes.ok) {
    throw new Error(
      `pets/animal=${animal}&location=${location}&breed=${breed} fetch not ok`,
    );
  }

  return apiRes.json();
};

export default fetchPets;
