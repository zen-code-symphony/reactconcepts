import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import usePet from "./hooks/usePet";

const Details = () => {
  const { id } = useParams();
  const { isLoading, pet, errorMsg } = usePet(id);
  const [showModal, setShowModal] = useState(false);

  if (errorMsg) {
    return <h2>Oh no! {errorMsg}</h2>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-[15px]">
        <h2 className="animate-spin text-[50px]">🌀</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto my-0 mb-[25px] w-[1100px] rounded-md bg-lightpink p-[15px] shadow-[0px_0px_12px_#aaa,-0px_-0px_12px_#fff]">
      <Carousel images={pet.images} />
      <div>
        <h1 className="mx-0 my-[5px] text-center text-6xl text-[#333]">
          {pet.name}
        </h1>
        <h2 className="mx-0 mb-5 mt-[5px] text-center">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button
            className="mx-auto my-0 block cursor-pointer rounded-[5px] border-[#333] border-[solid] bg-primary px-[25px] py-[5px] text-lg text-[white]"
            onClick={() => setShowModal(true)}
          >
            Adopt {pet.name}
          </button>
          <p className="px-[15px] pt-5 leading-normal">{pet.description}</p>
          {showModal ? (
            <Modal>
              <div className="max-w-[500px] rounded-[30px] bg-lightpink p-[15px] text-center">
                <h1 className="mx-0 my-[15px] text-center text-3xl font-bold text-[#333]">
                  Would you like to adopt {pet.name}?
                </h1>
                <div>
                  <button className="mx-auto my-0 mr-[15px] inline-block cursor-pointer rounded-[5px] border-[#333] border-[solid] bg-[#ad343e] px-[25px] py-[5px] text-lg text-[white]">
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

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary
      errorComponent={
        <h2>
          There was an error with this listing.{" "}
          <Link to="/">Click here to go back to home page.</Link>
        </h2>
      }
    >
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
