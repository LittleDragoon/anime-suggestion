const getAlertAnime = () => {
  alert("Anime suggestion is currently in process");
};

const App = () => {
  return (
    <>
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
          />
          <button
            className="color-red-100 bg-blue-700 rounded-sm px-2 text-bold text-center"
            type="button"
            name="get-anime"
            onClick={getAlertAnime}
          >
            <b>Get suggestions</b>
          </button>
        </div>
        <div className="flex flex-1">New anime description</div>
      </div>
    </>
  );
};

export default App;
