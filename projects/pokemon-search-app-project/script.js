const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonNameSpan = document.getElementById("pokemon-name");
const pokemonIdSpan = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const spriteWrapperDiv = document.getElementById("sprite-wrapper");
const typesDiv = document.getElementById("types");
const hpTd = document.getElementById("hp");
const attackTd = document.getElementById("attack");
const defenseTd = document.getElementById("defense");
const specialAttackTd = document.getElementById("special-attack");
const specialDefenseTd = document.getElementById("special-defense");
const speedTd = document.getElementById("speed");

const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const isInputValid = (input) => {
  const regex = /^([a-z]+|[a-z]+-[a-z]|\d+)$/i;
  return regex.test(input);
};

const fetchData = async () => {
  const inputValue = searchInput.value.toLowerCase();

  if (!isInputValid(inputValue)) {
    alert(
      "The input cannot be empty and can only contain letters with/wthout dashed or numbers"
    );
    return;
  }

  try {
    const res = await fetch(pokemonAPI + inputValue);
    if (res.ok === false) {
      throw new Error();
    }

    const data = await res.json();
    updateUI(data);
  } catch (error) {
    alert("Pokemon not found");
  }
};

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});

searchButton.addEventListener("click", fetchData);

const updateUI = (data) => {
  typesDiv.innerHTML = "";

  const {
    name,
    id,
    weight,
    height,
    sprites: { front_default },
    types,
    stats,
  } = data;

  pokemonNameSpan.textContent = name.toUpperCase();
  pokemonIdSpan.textContent = `#${id}`;
  weightSpan.textContent = `Weight: ${weight}`;
  weightSpan.classList.add("weight-height");
  heightSpan.textContent = `Height: ${height}`;
  heightSpan.classList.add("weight-height");
  spriteWrapperDiv.innerHTML = `<image id="sprite" src="${front_default}">`;

  types.forEach((item) => {
    typesDiv.innerHTML += `<span class="type ${
      item.type.name
    }">${item.type.name.toUpperCase()}</span>`;
  });

  stats.forEach((item) => {
    if (item.stat.name === "hp") {
      hpTd.textContent = item.base_stat;
    } else if (item.stat.name === "attack") {
      attackTd.textContent = item.base_stat;
    } else if (item.stat.name === "defense") {
      defenseTd.textContent = item.base_stat;
    } else if (item.stat.name === "special-attack") {
      specialAttackTd.textContent = item.base_stat;
    } else if (item.stat.name === "special-defense") {
      specialDefenseTd.textContent = item.base_stat;
    } else if (item.stat.name === "speed") {
      speedTd.textContent = item.base_stat;
    }
  });
};
