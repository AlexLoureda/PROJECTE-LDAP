(function(){
    var stage = document.querySelector("#stage");
    var output = document.querySelector("#output");

    window.addEventListener("keydown", keydownHandler, false);

    var map =
        [
            [0, 1, 0, 0, 0, 2, 0, 6, 0, 0, 3],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 6, 0],
            [0, 6, 1, 0, 0, 0, 0, 6, 0, 0, 6],
            [1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 6, 0, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [6, 6, 0, 1, 0, 2, 0, 0, 0, 6, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 6, 0, 0, 2, 0]
        ];

    var gameObjects =
        [
            [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0,0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
            [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0,4, 0, 0, 0, 0, 0, 0, 0, 0, 7]
        ];

    var WATER = 0;
    var ISLAND = 1;
    var PIRATE = 2;
    var HOME = 3;
    var SHIP = 4;
    var MONSTER = 5;
    var ROCKS = 6;
    var STORM = 7;

    var UP = 38;
    var DOWN = 40;
    var RIGHT = 39;
    var LEFT = 37;

    var SIZE = 64;

    var ROWS = map.length;
    var COLUMNS = map[0].length;

    var food = 10;
    var gold = 10;
    var experience = 0;
    var gameMessage = "<strong>" + "Usa las flechas para llegar al Professor Oak." + "<br>" 
                        + " Cuidado con el Team Rocket." + "<br>"
                        + " Un último consejo, los beedrill pinchan."
                        + "<br>";

    var shipRow;
    var shipColumn;

    var monsterRow;
    var monsterColumn;

    var stormRow;
    var stormColumn;

    render();

    function render() {
        if (stage.hasChildNodes()) {
            for (var i = 0; i < ROWS * COLUMNS; i++) {
                stage.removeChild(stage.firstChild);
            }
        }

        for (var row = 0; row < ROWS; row++) {
            for (var column = 0; column < COLUMNS; column++) {
                var cell = document.createElement("img");
                cell.setAttribute("class", "cell");
                stage.appendChild(cell);

                switch (map[row][column]) {
                    case WATER:
                        cell.src = "images/water.png";
                        break;
                    case ISLAND:
                        cell.src = "images/centropokemon.png";
                        break;
                    case PIRATE:
                        cell.src = "images/teamrocket.png";
                        break;
                    case HOME:
                        cell.src = "images/professoroak.png";
                        break;
                    case ROCKS:
                        cell.src = "images/beedrill.png";
                        break;
                }
                switch (gameObjects[row][column]) {
                    case SHIP:
                        cell.src = "images/entrenador.png";
                        break;

                    case MONSTER:
                        cell.src = "images/mewtwo.png";
                        break;

                    case STORM:
                        cell.src = "images/pikachu.png";
                        break;
                }
                cell.style.top = row * SIZE + "px";
                cell.style.left = column * SIZE + "px";
            }
        }

        for (var row = 0; row < ROWS; row++) {
            for (var column = 0; column < COLUMNS; column++) {
                if (gameObjects[row][column] === SHIP) {
                    shipRow = row;
                    shipColumn = column;
                }

                if (gameObjects[row][column] === MONSTER) {
                    monsterRow = row;
                    monsterColumn = column;
                }

                if (gameObjects[row][column] === STORM) {
                    stormRow = row;
                    stormColumn = column;
                }

            }
        }



        output.innerHTML = gameMessage;

        output.innerHTML
            += "<strong>" + "<br>Pokeballs:" + gold + ", Comida: "
            + food + ", Experiencia: " + experience;
    }

    function keydownHandler(event) {
        switch (event.keyCode) {
            case UP:
                if (shipRow > 0) {
                    gameObjects[shipRow][shipColumn] = 0;
                    shipRow--;
                    gameObjects[shipRow][shipColumn] = SHIP;
                }
                break;
            case DOWN:
                if (shipRow < ROWS - 1) {
                    gameObjects[shipRow][shipColumn] = 0;
                    shipRow++;
                    gameObjects[shipRow][shipColumn] = SHIP;
                }
                break;
            case LEFT:
                if (shipColumn > 0) {
                    gameObjects[shipRow][shipColumn] = 0;
                    shipColumn--;
                    gameObjects[shipRow][shipColumn] = SHIP;
                }
                break;
            case RIGHT:
                if (shipColumn < COLUMNS - 1) {
                    gameObjects[shipRow][shipColumn] = 0;
                    shipColumn++;
                    gameObjects[shipRow][shipColumn] = SHIP;
                }
                break;
        }

        switch (map[shipRow][shipColumn]) {
            case WATER:
                gameMessage = "Estás caminando por el prado" + "<br>";
                break;
            case PIRATE:
                fight();
                break;
            case ISLAND:
                trade();
                break;
            case HOME:
                endGame();
                break;
            case ROCKS:
                endGame();
                break;
        }

        food--;
        if (food <= 0 || gold <= 0) {
            endGame();
        }
        moveMonster();

        moveStorm();

        if (gameObjects[shipRow][shipColumn] === MONSTER) {
            endGame();
        }

        if (gameObjects[shipRow][shipColumn] === STORM) {
            endGame();
        }

        render();
    }

    function trade() {
        var islandFood = experience + gold;
        var cost = Math.ceil(Math.random() * islandFood);

        if (gold > cost) {
            food += islandFood;
            gold -= cost;
            experience += 2;

            gameMessage
                = "Has comprado " + islandFood + " pokeballs "
                + "por " + cost + " monedas." + "<br>"
        }

        else {
            experience += 1;
            gameMessage = "No quedan monedas!" + "<br>"
        }
    }
    function fight() {
        var shipStrenght = Math.ceil((food + gold) / 2);
        var pirateStrenght = Math.ceil(Math.random() * shipStrenght * 2);

        if (pirateStrenght > shipStrenght) {
            var stolenGold = Math.round(pirateStrenght / 2);
            gold -= stolenGold;

            experience += 1;

            gameMessage
                = "Luchaste, pero perdiste " + stolenGold + " pokeballs." + "<br>"
                + " Tu resistencia és de: " + shipStrenght + "<br>"
                + " La fuerza del Team Rocket es: " + pirateStrenght + "<br>";
        }
        else {
            var pirateGold = Math.round(pirateStrenght / 2);
            gold += pirateGold;

            experience += 2;

            gameMessage
            "Luchaste y ganaste, conseguiste " + pirateGold + " pokeballs." + "<br>"
                + " La resistencia de nuestro equipo es: " + shipStrenght + "<br>"
                + " La fuerza del Team Rocket era de: " + pirateStrenght + "<br>";
        }
    }

    function endGame() {
        if (map[shipRow][shipColumn] === HOME) {
            var score = food + gold + experience;

            gameMessage
                = "Llegaste a salvo, " + "tu puntuación final es: " + score + "<br>";
        }
        else if (gameObjects[shipRow][shipColumn] === MONSTER) {
            gameMessage
                = " Mewtwo ha usado Psíquico" + "<br>";
        }
        else if (gameObjects[shipRow][shipColumn] === STORM) {
            gameMessage
                = " Pikachu te ha churruscao" + "<br>";
        }
        else if (map[shipRow][shipColumn] === ROCKS) {
            gameMessage
                = " Los beedrill te dejaron fino" + "<br>";
        }
        else {
            if (gold <= 0) {
                gameMessage += " Te quedaste sin monedas amigo!" + "<br>";

            }
            else {
                gameMessage += " Te quedaste sin comida tontaina!" + "<br>";

            }
            gameMessage += " Te quedaste sin pokemon, eres un perdedor!" + "<br>";
        }
        window.removeEventListener("keydown", keydownHandler, false);
    }

    function moveMonster() {
        var UP = 1;
        var DOWN = 2;
        var RIGHT = 3;
        var LEFT = 4;

        var validDirections = [];
        var direction = undefined;

        if (monsterRow > 0) {
            var thingAbove = map[monsterRow - 1][monsterColumn];

            if (thingAbove === WATER) {
                validDirections.push(UP)
            }
        }

        if (monsterRow < ROWS - 1) {
            var thingBelow = map[monsterRow + 1][monsterColumn];
            if (thingBelow === WATER) {
                validDirections.push(DOWN)
            }
        }
        if (monsterColumn > 0) {
            var thingToTheLeft = map[monsterRow][monsterColumn - 1];

            if (thingToTheLeft === WATER) {
                validDirections.push(LEFT)
            }
        }
        if (monsterColumn < COLUMNS - 1) {
            var thingToTheRight = map[monsterRow][monsterColumn + 1];

            if (thingToTheRight === WATER) {
                validDirections.push(RIGHT)
            }
        }
        if (validDirections.length !== 0) {
            var randomNumber = Math.floor(Math.random() * validDirections.length);
            direction = validDirections[randomNumber];
        }
        switch (direction) {
            case UP:
                gameObjects[monsterRow][monsterColumn] = 0;
                monsterRow--;
                gameObjects[monsterRow][monsterColumn] = MONSTER;
                break;
            case DOWN:
                gameObjects[monsterRow][monsterColumn] = 0;
                monsterRow++;
                gameObjects[monsterRow][monsterColumn] = MONSTER;
                break;
            case LEFT:
                gameObjects[monsterRow][monsterColumn] = 0;
                monsterColumn--;
                gameObjects[monsterRow][monsterColumn] = MONSTER;
                break;
            case RIGHT:
                gameObjects[monsterRow][monsterColumn] = 0;
                monsterColumn++;
                gameObjects[monsterRow][monsterColumn] = MONSTER;
                break;
        }
    }

    function moveStorm() {
        var UP = 1;
        var DOWN = 2;
        var RIGHT = 3;
        var LEFT = 4;

        var validDirections = [];
        var direction = undefined;

        if (stormRow > 0) {
            var thingAbove = map[stormRow - 1][stormColumn];

            if (thingAbove === WATER) {
                validDirections.push(UP)
            }
        }

        if (stormRow < ROWS - 1) {
            var thingBelow = map[stormRow + 1][stormColumn];
            if (thingBelow === WATER) {
                validDirections.push(DOWN)
            }
        }
        if (stormColumn > 0) {
            var thingToTheLeft = map[stormRow][stormColumn - 1];

            if (thingToTheLeft === WATER) {
                validDirections.push(LEFT)
            }
        }
        if (stormColumn < COLUMNS - 1) {
            var thingToTheRight = map[stormRow][stormColumn + 1];

            if (thingToTheRight === WATER) {
                validDirections.push(RIGHT)
            }
        }
        if (validDirections.length !== 0) {
            var randomNumber = Math.floor(Math.random() * validDirections.length);
            direction = validDirections[randomNumber];
        }
        switch (direction) {
            case UP:
                gameObjects[stormRow][stormColumn] = 0;
                stormRow--;
                gameObjects[stormRow][stormColumn] = STORM;
                break;
            case DOWN:
                gameObjects[stormRow][stormColumn] = 0;
                stormRow++;
                gameObjects[stormRow][stormColumn] = STORM;
                break;
            case LEFT:
                gameObjects[stormRow][stormColumn] = 0;
                stormColumn--;
                gameObjects[stormRow][stormColumn] = STORM;
                break;
            case RIGHT:
                gameObjects[stormRow][stormColumn] = 0;
                stormColumn++;
                gameObjects[stormRow][stormColumn] = STORM;
                break;
        }
    }
}());