import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDeatailsData,
    setRecipeDetailsData,
    handleAddToFavorite,
    favoritesList,
  } = useContext(GlobalContext);
  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data?.data?.recipe) {
        setRecipeDetailsData(data?.data?.recipe);
      }
    }
    getRecipeDetails();
  }, []);
  return (
    <section className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDeatailsData?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-5m text-cyan-700 font-medium">
          {recipeDeatailsData?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDeatailsData?.title}
        </h3>
      </div>
      <div>
        <button
          className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          onClick={() => handleAddToFavorite(recipeDeatailsData)}
        >
          {favoritesList &&
          favoritesList.length > 0 &&
          favoritesList.findIndex(
            (item) => item.id === recipeDeatailsData.id
          ) !== -1
            ? "remove from favorite"
            : "save as favorite"}
        </button>
      </div>
      <div>
        <span className="text-2xl font-semibold text-black">Ingredients:</span>
        <ul className="flex flex-col gap-3">
          {recipeDeatailsData?.ingredients.map((ingredient) => (
            <li key={recipeDeatailsData?.ingredients.indexOf(ingredient)}>
              <span className="text-2xl font-semibold text-black">
                {ingredient.quantity} {ingredient.unit}
              </span>
              <span className="text-2xl font-semibold text-black">
                {ingredient.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
