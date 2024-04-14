import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import AdoptedPetContext from "./AdoptedPetContext";
import { Pet } from "./ApiResponsesTypes";
import Loader from "./Loader";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null as Pet | null);
  return (
    <div className="m-0 bg-[url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)] bg-repeat p-0">
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 p-7 text-center">
              <Link to="/" className="text-6xl text-white hover:text-gray-200 ">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
    </div>
  );
};

export default App;
