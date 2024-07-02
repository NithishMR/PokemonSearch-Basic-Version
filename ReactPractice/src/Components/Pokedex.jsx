// // File: Pokedex.jsx

// import React, { useState } from "react";

// async function fetchData(setPokemonData) {
//   try {
//     const pokemonName = document
//       .getElementById("searchBar")
//       .value.toLowerCase();
//     console.log(pokemonName);
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
//     );
//     if (!response.ok) {
//       throw new Error("Could not fetch resources");
//     }
//     const data = await response.json();
//     console.log(data);
//     setPokemonData(data);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// function Statistics({ data }) {
//   if (!data) return null;

//   return (
//     <div className="flex flex-col items-center justify-center gap-4 m-10 ">
//       <div className="text-center text-[30px]">
//         <span className="font-bold"># </span>
//         <span>{data.id}</span>
//       </div>
//       <div className="text-center text-[30px]">
//         <span className="">{data.name.toUpperCase()}</span>
//       </div>

//       <div className="border-black border-2 w-[100%] flex justify-evenly py-6">
//         <span className="font-bold">WEIGHT: </span>
//         <span>{data.weight}</span>
//       </div>
//       <div className="border-black border-2 w-[100%] flex justify-evenly py-6">
//         <span className="font-bold">HEIGHT: </span>
//         <span>{data.height}</span>
//       </div>
//       <div className="border-black border-2 w-[100%] flex justify-evenly py-6">
//         <span className="font-bold">HP: </span>
//         <span>{data.stats[0].base_stat}</span>
//       </div>
//       <div className="border-black border-2 w-[100%] flex justify-evenly py-6">
//         <span className="font-bold">ATTACK: </span>
//         <span>{data.stats[1].base_stat}</span>
//       </div>
//       <div className="border-black border-2 w-[100%] flex justify-evenly py-6">
//         <span className="font-bold">DEFENSE: </span>
//         <span>{data.stats[2].base_stat}</span>
//       </div>
//     </div>
//   );
// }

// function Pokedex() {
//   const [pokemonData, setPokemonData] = useState(null);

//   return (
//     <>
//       <div className="border-black border-2 w-[30%] m-auto">
//         <div className="flex flex-col items-center justify-between gap-3 m-10">
//           <div className="flex flex-row items-center gap-2">
//             <div className="">
//               <input
//                 id="searchBar"
//                 type="text"
//                 className="border-gray-400 border-2 rounded-md placeholder:text-center"
//               />
//             </div>
//             <button
//               type="button"
//               className=""
//               onClick={() => fetchData(setPokemonData)}
//             >
//               Search
//             </button>
//           </div>
//           <div>
//             {pokemonData && (
//               <img
//                 id="pokemonSprite"
//                 src={pokemonData.sprites.front_default}
//                 alt="pokemon pictures"
//                 className=" p-10"
//                 style={{ display: "block" }}
//               />
//             )}
//           </div>
//         </div>
//         <Statistics data={pokemonData} />
//       </div>
//     </>
//   );
// }

// export default Pokedex;
// File: Pokedex.jsx

import React, { useState } from "react";

async function fetchData(setPokemonData, setLoading, setError) {
  setLoading(true);
  setError(null);
  try {
    const pokemonName = document
      .getElementById("searchBar")
      .value.toLowerCase();
    console.log(pokemonName);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error(
        "No pokemon with that name exists. Maybe try spelling correctly"
      );
    }
    const data = await response.json();
    setPokemonData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

function Statistics({ data }) {
  if (!data) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 m-10">
      <div className="text-center text-2xl font-bold">
        <span className="font-bold"># </span>
        <span>{data.id}</span>
      </div>
      <div className="text-center text-2xl font-bold uppercase">
        <span>{data.name}</span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">WEIGHT: </span>
        <span>{data.weight}</span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">HEIGHT: </span>
        <span>{data.height}</span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">HP: </span>
        <span>{data.stats[0].base_stat}</span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">ATTACK: </span>
        <span>{data.stats[1].base_stat}</span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">DEFENSE: </span>
        <span>{data.stats[2].base_stat}</span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">TYPES: </span>
        <span>
          {data.types.map((typeInfo) => typeInfo.type.name).join(", ")}
        </span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">ABILITIES: </span>
        <span>
          {data.abilities
            .map((abilityInfo) => abilityInfo.ability.name)
            .join(", ")}
        </span>
      </div>
      <div className="border-black border-2 w-[100%] flex justify-evenly py-6 shadow-lg bg-white rounded-lg">
        <span className="font-bold">BASE EXPERIENCE: </span>
        <span>{data.base_experience}</span>
      </div>
    </div>
  );
}

function Pokedex() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen flex flex-col items-center justify-center p-5">
      <div className="border-black border-2 w-[30%] m-auto bg-white rounded-lg shadow-lg p-5">
        <div className="flex flex-col items-center justify-between gap-3 m-10">
          <div className="flex flex-row items-center gap-2">
            <div>
              <input
                id="searchBar"
                type="text"
                className="border-gray-400 border-2 rounded-md text-center placeholder:text-center p-2"
                placeholder="Enter Pokémon Name"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md px-4 py-2 transition-transform transform hover:scale-105 hover:bg-blue-600"
              onClick={() => fetchData(setPokemonData, setLoading, setError)}
            >
              Search
            </button>
          </div>
          {loading && (
            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          )}
          {error && <div className="text-red-500">{error}</div>}
          {pokemonData && (
            <img
              id="pokemonSprite"
              src={pokemonData.sprites.front_default}
              alt="pokemon pictures"
              className="p-10 transition-transform transform hover:scale-110"
            />
          )}
        </div>
        <Statistics data={pokemonData} />
      </div>
    </div>
  );
}

export default Pokedex;
