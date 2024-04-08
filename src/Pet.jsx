const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <a
      href={`/details/${id}`}
      className="flex items-center gap-2 border-b-2 border-solid border-b-[#333] py-4  last:border-b-0"
    >
      <img src={hero} alt={name} className="w-[100px] rounded-full" />
      <div>
        <h1 className="w-[95%] overflow-hidden text-ellipsis whitespace-nowrap font-[normal] text-3xl text-[#333]">
          {name}
        </h1>
        <h2 className="text-ellipsis whitespace-nowrap font-[normal] text-xl">
          {animal} - {breed} - {location}
        </h2>
      </div>
    </a>
  );
};

export default Pet;
