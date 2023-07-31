import axios from "axios";
import React from "react";

export const Home = () => {
  const [searchForAnime, setSearchForAnime] = React.useState("");
  const [resultAnimeSuggestion, setResultAnimeSuggestion] =
    React.useState(null);

  const [isDataFetching, setIsDataFetching] = React.useState(false);

  // /!\ In an async func, the page is rendered at every set state

  const fetchAnimeSuggestions = async () => {
    setIsDataFetching(true);
    const { data } = await axios.get(
      "https://anime-recommender.p.rapidapi.com/",
      {
        params: { anime_title: searchForAnime, number_of_anime: "5" },
        headers: {
          "x-rapidapi-host": "anime-recommender.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_PUBLIC_RAPIDAPI_KEY,
        },
      }
    );
    setIsDataFetching(false);
    if (data.data !== "Anime Not Found") {
      setResultAnimeSuggestion(data.data);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 text-white gap-y-12 min-h-screen">
      <div className="flex flex-col items-center pt-12 gap-y-4">
        <div className="text-6xl font-bold">
          Anime <span className="text-purple-600">Suggestion</span>
        </div>
        <div className="text-4xl text-orange-300 font-bold">
          Get anime suggestion based on your favorite anime
        </div>
      </div>
      <div className="flex gap-x-3 w-full justify-center">
        <input
          className="w-2/5 rounded-sm text-black border-none outline-none px-2 py-2"
          autoFocus={true}
          type="text"
          id="anime-input"
          name="anime-input"
          placeholder="Enter an anime for suggestion: e.g. 'Death Note'"
          onChange={(e) => setSearchForAnime(e.target.value)}
        />
        <button
          className="color-red-100 bg-blue-700 rounded-sm px-2 text-bold text-center"
          type="button"
          name="get-anime"
          onClick={fetchAnimeSuggestions}
        >
          <b>
            {isDataFetching ? "Getting Suggestions ..." : "Get Suggestions"}
          </b>
        </button>
      </div>
      {isDataFetching && <div>Loading... Wait a few seconds... </div>}
      {!isDataFetching &&
        resultAnimeSuggestion &&
        resultAnimeSuggestion.map((suggestion) => {
          const html = /<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi;
          const doubleSpace = /\s{2,}/g;
          const description = suggestion.description
            .replace(html, "")
            .replace(doubleSpace, " ")
            .trim();
          return (
            <div
              className="flex flex-col item-center my-12 w-3/6 h-4/5 md:flex-col md:w-4/6 md:h-full md:mb-12"
              key={suggestion.id}
            >
              <div className="w-full mt-4 p-8 border border-secondary h-full text-lightGrey font-raleway">
                <img
                  src={suggestion.bannerImage}
                  alt="anime suggestion"
                  height={200}
                  className="items-center justify-center"
                />
                <h2 className="text-xl font-bold my-4">
                  {suggestion.title.english}
                </h2>
                <p className="text-sm leading-8">{description}</p>
                {suggestion.trailer && (
                  <div className="mt-4">
                    <h3 className="text-lg my-4 font-bold">Watch Trailer</h3>
                    <iframe
                      className="w-full h-96"
                      src={`https://www.youtube.com/embed/${suggestion.trailer.id}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
