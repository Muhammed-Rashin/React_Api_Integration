import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import axios from "axios";
import "./app.css";

function App() {
  const [loader, setLoader] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const callApi = () => {
    axios.get("https://randomuser.me/api/?results=50").then(({ data }) => {
      localStorage.setItem("users", JSON.stringify(data.results));
      setProfiles([...data.results]);
      setLoader(false);
    });
  };

  const getData = (isFromButton) => {
    setLoader(true);
    if (isFromButton) {
      callApi();
    } else {
      const data = localStorage.getItem("users");
      if (data) {
        setProfiles(JSON.parse(data));
        setLoader(false);
      } else {
        callApi();
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h3>Total Profiles : {profiles.length}</h3>
      <button onClick={() => getData("Button")}>Reload</button>
      <div className='spinnerDiv'> 

      {loader ? <Spinner /> : null}
      </div>
      <div className="cardDiv">
        {profiles.map((profile) => {
          return (
            <div key={profile.email} className='card'>
              <Card
                name={profile.name}
                email={profile.email}
                picture={profile.picture.thumbnail}
                setProfiles={setProfiles}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
