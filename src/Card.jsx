import { useState } from "react";
import { useEffect } from "react";

const api = import.meta.env.VITE_API_KEY;

function Card({ imgKey, name, handleClick, id }) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const url = `https://api.giphy.com/v1/gifs/${imgKey}?api_key=${api}&rating=g`;

    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [imgKey, name]);


  return (
    <>
      {data ? (
        <div id={id} className="card" onClick={handleClick}>
          <img id={id} src={data.data.images.fixed_height_downsampled.url} alt={name}></img>
          <h4>{name}</h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Card;
