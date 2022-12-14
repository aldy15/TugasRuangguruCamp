import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = (id) => {
    // TODO: answer here
    fetch(`https://gallery-app-server.vercel.app/photos${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setPhotos(photos.filter((photo) => photo.id !== id)))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    if (sort || submited) {
      setLoading(true);
      let withParam = "";

      if (sort || submited)
        withParam = `?_order=${sort}&q=${submited}&_sort=id`;

      fetch(`http://localhost:3001/photos` + withParam)
        .then((res) => res.json())
        .then((res) => setPhotos(res))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }

    // TODO: answer here
  }, [sort, submited]);

  useEffect(() => {
    setLoading(true);
    fetch("https://gallery-app-server.vercel.app/photos")
      .then((res) => res.json())
      .then((res) => setPhotos(res))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
    // TODO: answer here
  }, []);

  if (error)
    return (
      <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        Error!
      </h1>
    );

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
