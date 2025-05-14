import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

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
	
  const [inputedString, setInputedString] = useState(
    pageDynamicalAddress || ""
  );

  useEffect(() => {
   
    setInputedString(pageDynamicalAddress || "");
  }, [pageDynamicalAddress]);

  const handleInputChange = (e) => setInputedString(e.target.value);

  const enterInputString = (e) => {
    e.preventDefault();
    const cleanedInput = inputedString.trim();
    if (cleanedInput && cleanedInput !== pageDynamicalAddress) {
      navigate(`/${cleanedInput}`);
    }
  };

  const goHome = () => {
    navigate("/");
    setInputedString(""); 
  };

  return (
    <div>
      <h1 onClick={goHome} style={{ cursor: "pointer", color: "#0077cc" }}>
        THIS IS IT
      </h1>
      <form onSubmit={enterInputString}>
        <input
          type="text"
          value={inputedString}
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
  return (
    <div>
      <h1>Search Result: {stringForSearch}</h1>
    </div>
  );
}
