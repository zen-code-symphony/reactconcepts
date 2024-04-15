import { Link } from "react-router-dom";

import { Animal } from "../services/ApiResponsesTypes";

interface IProps {
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet = ({ name, animal, breed, images, location, id }: IProps) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images && images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="relative block rounded-md">
      <img
        data-testid="thumbnail"
        src={hero}
        alt={name}
        className="w-full object-cover object-center"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-tr from-white to-transparent pb-2 pr-2 pt-2">
        <h1 className="ml-2 font-semibold">{name}</h1>
        <h2 className="ml-2 font-light">
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
