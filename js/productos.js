const apiKey = "5cdb7b543c564feb83830ffa43d555b4";
const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=12`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    return response.json();
  })
  .then((data) => {
    displayGames(data.results);

  })

  .catch((error) => {
    console.error("Hubo un problema con la solicitud:", error);
  });

// funcion que muestra los productos que estamos trayendo

function displayGames(data) {
  let container = document.querySelector("#container");

  data.forEach((juegos) => {
    let copia = document.querySelector("template").content.cloneNode(true);

    copia.querySelector("h5").textContent = juegos.name;
    copia.querySelector("img").src = juegos.background_image;

    const platforms = juegos.platforms
      .map((platform) => platform.platform.name)
      .join(", ");
    copia.querySelector("p").textContent = `Plataformas: ${platforms}`;

    container.append(copia);
  });
}
