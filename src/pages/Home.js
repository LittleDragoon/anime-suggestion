import axios from "axios";
import React from "react";

export const Home = () => {
  const [searchForAnime, setSearchForAnime] = React.useState("");
  const [resultAnimeSuggestion, setResultAnimeSuggestion] =
    React.useState(null);

  const fetchAnimeSuggestions = async () => {
    const { data } = await axios.get(
      "https://anime-recommender.p.rapidapi.com/",
      {
        params: { anime_title: searchForAnime, number_of_anime: "1" },
        headers: {
          "x-rapidapi-host": "anime-recommender.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_PUBLIC_RAPIDAPI_KEY,
        },
      }
    );
    setResultAnimeSuggestion(data);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-900 text-white gap-y-12 min-h-screen">
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
          placeholder="Enter an anime for suggestion"
          onChange={(e) => setSearchForAnime(e.target.value)}
        />
        <button
          className="color-red-100 bg-blue-700 rounded-sm px-2 text-bold text-center"
          type="button"
          name="get-anime"
          onClick={fetchAnimeSuggestions}
        >
          <b>Get suggestions</b>
        </button>
      </div>
      {resultAnimeSuggestion && (
        <div className="flex flex-1 flex-col border-orange-500 border-2 p-4 gap-y-2 w-2/5">
          <img
            src={resultAnimeSuggestion.data[0].bannerImage}
            alt="anime Suggestion"
            width={600}
            height={200}
          />
          <div className="font-bold font-3xl text-purple-600">
            {resultAnimeSuggestion.data[0].title.english}
          </div>
          <div className="text-justify">
            {resultAnimeSuggestion.data[0].description}
          </div>
        </div>
      )}
    </div>
  );
};
