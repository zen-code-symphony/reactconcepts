import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import AdoptedPetContext from "./AdoptedPetContext";
import Details from "./Details";
import SearchParams from "./SearchParams";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header className="mx-auto my-0 flex w-[1100px] content-center justify-center px-0 pb-0 pt-5">
            <Link
              to="/"
              className="mx-0 my-5 block h-[76px] w-[279px] overflow-hidden bg-[url(http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png)] pb-2.5 indent-[-9999px] font-[bold] text-[3px] text-[#333] no-underline brightness-[150%]"
            >
              Adopt Me!
            </Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
