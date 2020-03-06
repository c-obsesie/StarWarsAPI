
var linkApi = "https://swapi.co/api/starships"


function sortByCrew(results) {
  var sortedArray = results.sort((a, b) => parseFloat(a.crew) - parseFloat(b.crew));

  for (var i = sortedArray.length - 1; i >= 0; i--) {
    if (sortedArray[i].crew <= 10) {
      sortedArray.splice(i, 1);
    }
  }
  return sortedArray;
}

function findShipWithMostFilms(results) {
  let max = 0;
  let returnedShip = null;
for(let i = 0; i < results.length; i++) {
  if(results[i].films_count > max) {
    max = results[i].films_count;
    returnedShip = results[i];
  }
}
return returnedShip;
  }


async function getUserAsync() {
  let response = await fetch(linkApi);
  let data = await response.json()
  let dataCount = data.count;
  let map = [];

  for (i = 0; i < data.results.length; i++) {
    var spaceship = {
      "count": dataCount,
      "results": [{
        "name": "",
        "model": "",
        "crew": "",
        "passengers": "",
        "films_count": "",
        "films": []
      }]
    }

    spaceship["name"] = data.results[i].name
    spaceship["model"] = data.results[i].model
    spaceship["crew"] = data.results[i].crew
    spaceship["passengers"] = data.results[i].passengers
    var filmCount = data.results[i].films.length
    spaceship["films_count"] = filmCount

    var films = []

    for (j = 0; j < filmCount; j++) {
      film = data.results[i].films[j]
      let response = await fetch(film);
      let filmData = await response.json();
      var filmJson = {
        "title": filmData["title"],
        "director": filmData["director"],
        "release_date": filmData["release_date"]
      }

      films.push(filmJson);

    }

    spaceship["films"] = films

    map.push(spaceship);
  };
 

  var mapMethod = map.slice()


 

  var ship = findShipWithMostFilms(map)
  var sort = sortByCrew(mapMethod)

  console.log(map)
  var most = map.indexOf(ship)
  console.log(sort)

  var container = document.createElement("div");
  container.classList.add('container');

  var inline = document.createElement("div");
  inline.classList.add('inline');

  for (var i = 0; i < map.length; i++) {


    var ship = document.createElement("div");
    ship.classList.add('ship');

    var name = document.createElement("div");
    name.classList.add('name');
    var nameText = map[i].name
    name.appendChild(document.createTextNode(nameText));
    ship.appendChild(name);

    var model = document.createElement("div");
    model.classList.add('model');
    var modelText = map[i].model
    model.appendChild(document.createTextNode(modelText));
    ship.appendChild(model);

    var charContainer = document.createElement("div");
    charContainer.classList.add('char-container');

    var crewContainer = document.createElement("div");
    crewContainer.classList.add('crew-container');
    var passengersContainer = document.createElement("div");
    passengersContainer.classList.add('passengers-container');
    var filmContainer = document.createElement("div");
    filmContainer.classList.add('film-container');


    var nameCrew=document.createElement("div");
    nameCrew.classList.add('name-crew');
    var numberCrew=document.createElement("div");
    numberCrew.classList.add('number-crew');
    var crewText=map[i].crew
    numberCrew.appendChild(document.createTextNode(crewText))


    var namePassangers=document.createElement("div");
    namePassangers.classList.add('name-passangers');
    var numberPassangers=document.createElement("div");
    numberPassangers.classList.add('number-passangers');
    var passengersText=map[i].passengers
    numberPassangers.appendChild(document.createTextNode(passengersText))
    
    var nameFilm=document.createElement("div");
    nameFilm.classList.add('name-film');
    var numberFilm=document.createElement("div");
    numberFilm.classList.add('number-film');
    var filmText=map[i].films_count
    numberFilm.appendChild(document.createTextNode(filmText))

    charContainer.appendChild(crewContainer);
    charContainer.appendChild(passengersContainer);
    charContainer.appendChild(filmContainer);

    
    ship.appendChild(charContainer);
 
    
   

    passengersContainer.appendChild(namePassangers)
    passengersContainer.appendChild(numberPassangers)

    filmContainer.appendChild(nameFilm)
    filmContainer.appendChild(numberFilm)

 crewContainer.appendChild(nameCrew)
    crewContainer.appendChild(numberCrew)
    namePassangers.innerText="Passangers"
    nameCrew.innerText="Crew"
    nameFilm.innerText="Films"

   

		if(i==most){ship.classList.add('most');}

    inline.appendChild(ship);

    var model = map[i].model
    var numberCrew = map[i].crew
    var namePassangers = map[i].passengers
    var film=map[i].films_count






  }

  container.appendChild(inline);
  document.getElementById("output").appendChild(container);



}








getUserAsync()
