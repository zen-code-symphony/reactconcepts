import { lazy, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AdoptedPetContext from "../../AdoptedPetContext";
import Carousel from "../../components/Carousel";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loader from "../../components/Loader";
import usePet from "../../hooks/usePet";

const Modal = lazy(() => import("../../components/Modal"));

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("id is missing!");
  }

  const { isLoading, pet, errorMsg } = usePet(id);
  if (!isLoading && !pet) {
    throw new Error("Pet is missing!");
  }
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (errorMsg) {
    return <h2>Oh no! {errorMsg}</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !errorMsg && !pet) {
    return null;
  }

  const petObj = pet!;

  return (
    <div className="mx-auto my-0 mb-[25px] w-[1100px] rounded-md bg-lightpink p-[15px] shadow-[0px_0px_12px_#aaa,-0px_-0px_12px_#fff]">
      <Carousel images={petObj.images} />
      <div>
        <h1 className="mx-0 my-[5px] text-center text-6xl text-[#333]">
          {petObj.name}
        </h1>
        <h2 className="mx-0 mb-5 mt-[5px] text-center">
          {petObj.animal} - {petObj.breed} - {petObj.city}, {petObj.state}
          <button
            className="mx-auto my-0 block cursor-pointer rounded-[5px] border-[#333] border-[solid] bg-primary px-[25px] py-[5px] text-lg text-[white]"
            onClick={() => setShowModal(true)}
          >
            Adopt {petObj.name}
          </button>
          <p className="px-[15px] pt-5 leading-normal">{petObj.description}</p>
          {showModal ? (
            <Modal>
              <div className="max-w-[500px] rounded-[30px] bg-lightpink p-[15px] text-center">
                <h1 className="mx-0 my-[15px] text-center text-3xl font-bold text-[#333]">
                  Would you like to adopt {petObj.name}?
                </h1>
                <div>
                  <button
                    className="mx-auto my-0 mr-[15px] inline-block cursor-pointer rounded-[5px] border-[#333] border-[solid] bg-[#ad343e] px-[25px] py-[5px] text-lg text-[white]"
                    onClick={() => {
                      setAdoptedPet(petObj);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="mx-auto my-0 mr-[15px] inline-block cursor-pointer rounded-[5px] border-[#333] border-[solid] bg-[#ad343e] px-[25px] py-[5px] text-lg text-[white]"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary
      errorComponent={
        <h2>
          There was an error with this listing.{" "}
          <Link to="/">Click here to go back to home page.</Link>
        </h2>
      }
    >
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
