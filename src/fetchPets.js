const fetchPets = async ({ queryKey }) => {
  const animal = queryKey[1];
  const location = queryKey[2];
  const breed = queryKey[3];

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
