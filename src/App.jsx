import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";


import { SetObjectWord } from "./models/SetObjectWord";
import { populateWordFromData } from "./utils/populateWordFromData";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:pageDynamicalAddress" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

function HomePage() {
  const navigate = useNavigate();
	const { pageDynamicalAddress } = useParams();
	
  const [inputedOrAddressString, setInputedOrAddressString] = useState(
    pageDynamicalAddress || ""
  );





  useEffect(() => {
   
		setInputedOrAddressString(pageDynamicalAddress || "");

  }, [pageDynamicalAddress]);

	




  const enterInputString = (e) => {
    e.preventDefault();
    const cleanedInput = inputedOrAddressString.trim();
    if (cleanedInput && cleanedInput !== pageDynamicalAddress) {
      navigate(`/${cleanedInput}`);
    }
  };

  const handleInputChange = (e) => setInputedOrAddressString(e.target.value);


  const goHome = () => {
    navigate("/");
    setInputedOrAddressString(""); 
  };

  return (
    <div>
      <h1 onClick={goHome} style={{ cursor: "pointer", color: "#0077cc" }}>
        THIS IS IT
      </h1>
      <form onSubmit={enterInputString}>
        <input
          type="text"
          value={inputedOrAddressString}
          onChange={handleInputChange}
          placeholder="Search for any word…"
        />
      </form>

      {pageDynamicalAddress && (
        <OutputWindow stringForSearch={pageDynamicalAddress} />
      )}
    </div>
  );
}

function OutputWindow({ stringForSearch }) {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    if (!stringForSearch.trim()) return;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${stringForSearch}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setFetchedData(data);
        } else {
          const word = new SetObjectWord();
          setFetchedData(populateWordFromData(data, word));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [stringForSearch]);

  useEffect(() => {
    console.log("Fetched data updated:", fetchedData);
  }, [fetchedData]);

  return (
    <div>
      <h1>Search Request: {stringForSearch}</h1>
      <p>Search Result: <b>{fetchedData?.word || fetchedData?.title}</b></p>
    </div>
  );
}