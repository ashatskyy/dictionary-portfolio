import { HashRouter, Routes, Route, useNavigate, useParams, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path=":pg" element={<AboutPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}


function HomePage() {
  const { pg: urlParam } = useParams();
  const [pg, setPg] = useState(urlParam || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (urlParam !== undefined) {
      setPg(urlParam);
    }
  }, [urlParam]);

const goHome = () => {
    navigate("/");
    setPg(""); 
  };


  const handleInputChange = (e) => {
    setPg(e.target.value);
  };

  const goToDynamicPage = (e) => {
    e.preventDefault();
    if (pg) navigate(`/${pg}`);
  };

  return (
    <div>
        <h1 onClick={goHome} style={{ cursor: "pointer", color: "#0077cc" }}>PUTTING</h1>
      <Form
        pg={pg}
        handleInputChange={handleInputChange}
        goToDynamicPage={goToDynamicPage}
      />
      <Outlet />
    </div>
  );
}


function Form({ pg, handleInputChange, goToDynamicPage }) {
  return (
    <form onSubmit={goToDynamicPage}>
      <input
        type="text"
        value={pg}
        onChange={handleInputChange}
        placeholder="Enter page name"
      />
    </form>
  );
}

function AboutPage() {
  const { pg } = useParams();
  return (
    <div>
      <h1>Dynamic Page: {pg}</h1>
    </div>
  );
}
