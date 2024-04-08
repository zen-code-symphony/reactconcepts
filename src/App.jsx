import { BrowserRouter, Route, Routes } from "react-router-dom";

import Details from "./Details";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Adopt me!</h1>
      </div>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
