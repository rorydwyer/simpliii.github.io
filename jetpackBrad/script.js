class Board { //First of two classes. Board class deals with the entire Board,
    constructor() { // how it looks and how points are interconnected.
        this.a = { //First point, everything in the constructor are points for the map. Makes it easy to implement new points
            img: 'imgs/location-a.png', //Src location for the image
            x: 0, //Starting X
            y: 0, //Starting Y
            name: 'A', //Name of point, used in table id, options selector and more.
            active: true //Active specifies if its the current point being moved on the map.
        };
        this.b = {
            img: 'imgs/location-b.png',
            x: 0,
            y: 0,
            name: 'B',
            active: false
        };
        this.c = {
            img: 'imgs/location-c.png',
            x: 0,
            y: 0,
            name: 'C',
            active: false
        };
        this.d = {
            img: 'imgs/location-d.png',
            x: 0,
            y: 0,
            name: 'D',
            active: false
        };
    }

    init() { //Starting method, initalizes the board map


        //////                              //////
        //////  Create Flags on the Board   //////
        //////                              //////


        let boardMap = document.getElementById('boardMap'); //Select consistant html div
        for (let point in this) { //Dynamicaly create flags depending on how many are in the class
            let img = document.createElement('img');
            img.src = this[point].img;
            img.id = `location-${this[point].name}`;
            img.className += 'location-points';
            boardMap.appendChild(img);
        }

        //////                              //////
        //////  Create Point Selector Menu  //////
        //////                              //////


        let pointMenu = document.getElementById('select-point');
        for (let point in this) { //Dynamicaly create a list to select different points
            let selector = document.createElement('li');
            selector.innerHTML = this[point].name;
            selector.id = `select-${this[point].name}`;
            selector.className += 'select-btn';
            selector.addEventListener('click', () => { //When cicked, set the point to active
                this.setActive(point);
            })
            pointMenu.appendChild(selector);
        }


        //////                              //////
        ////// Create the Coordinates Table //////
        //////                              //////


        let tableInfo = document.getElementById('table-info'); //Create the table
        let coordTable = document.createElement('table');
        coordTable.id = 'coord-table';
        tableInfo.appendChild(coordTable);

        let coordKey = document.createElement('tr'); //Create the header coord Key
        coordTable.appendChild(coordKey);

        let locKey = document.createElement('td'); //Add the header Keys
        locKey.appendChild(document.createTextNode('Point'));
        coordKey.appendChild(locKey)

        let xKey = document.createElement('td');
        xKey.appendChild(document.createTextNode('X'));
        coordKey.appendChild(xKey);

        let yKey = document.createElement('td');
        yKey.appendChild(document.createTextNode('Y'));
        coordKey.appendChild(yKey);

        for (let point in this) { //Dynamicaly create table rows for each point
            let tableRow = document.createElement('tr');
            coordTable.appendChild(tableRow);

            let key = document.createElement('td');
            key.appendChild(document.createTextNode(this[point].name)); //Assign Row key as point name
            tableRow.appendChild(key);

            let x = document.createElement('td');
            x.appendChild(document.createTextNode(this[point].x.toFixed(0))); //Assign X to point xm and give id as 'point'-x for future updating
            x.id = this[point].name + '-' + 'X';
            tableRow.appendChild(x);

            let y = document.createElement('td');
            y.appendChild(document.createTextNode(this[point].y.toFixed(0)));
            y.id = this[point].name + '-' + 'Y';
            tableRow.appendChild(y);
        }


        //////                              //////
        //////  Create the Distance Table   //////
        //////                              //////


        let distTable = document.createElement('table'); // Create the distance table
        distTable.id = 'dist-table';
        tableInfo.appendChild(distTable);

        let distKey = document.createElement('tr');
        distTable.appendChild(distKey);

        let distIndex = document.createElement('td');
        distIndex.appendChild(document.createTextNode('Loc'));
        distKey.appendChild(distIndex);

        for (let point in this) { //Dynamicaly create keys for each point in the header
            let headIndex = document.createElement('td');
            headIndex.appendChild(document.createTextNode(this[point].name));
            distKey.appendChild(headIndex);
        }

        for (let point in this) { // Dynamicaly/Staticly Create rows for each point
            let row = document.createElement('tr'); // Future version needs complete dynamic veristility
            distTable.appendChild(row);

            let index = document.createElement('td'); //Assign point name as key
            index.appendChild(document.createTextNode(this[point].name));
            row.appendChild(index);

            let a = document.createElement('td'); //Assign distance using getDistance function
            a.appendChild(document.createTextNode(getDistance(this[point], this.a)));
            a.id = `${this[point].name}-A`; //Assign id as 'static.point.name'-'dynamic.point.name'
            row.appendChild(a);

            let b = document.createElement('td');
            b.appendChild(document.createTextNode(getDistance(this[point], this.b)));
            b.id = `${this[point].name}-B`;
            row.appendChild(b);

            let c = document.createElement('td');
            c.appendChild(document.createTextNode(getDistance(this[point], this.c)));
            c.id = `${this[point].name}-C`;
            row.appendChild(c);

            let d = document.createElement('td');
            d.appendChild(document.createTextNode(getDistance(this[point], this.d)));
            d.id = `${this[point].name}-D`;
            row.appendChild(d);
        }


        //////                              //////
        //////  Create the Slider Controls  //////
        //////                              //////


        let sliderH = document.getElementById('slider-h'); //Slider buit from noUiSlider in frameworks folder
        noUiSlider.create(sliderH, {
            start: 0, // Where the control starts
            range: { // Range that you can change. Units based off of CSS top and left. 100% moves image off map, so minus 5
                'min': 0, // Future verson needs to implent a better unit system to implement mouse coords
                'max': 95
            }
        });

        let sliderV = document.getElementById('slider-v');
        noUiSlider.create(sliderV, {
            start: 0,
            orientation: 'vertical', // Second slider for Y axis. orientation set at vertical to simulate Y axis :) mmmmmmm
            range: {
                'min': 0,
                'max': 95
            }
        });
        sliderH.noUiSlider.on('update', (vals, handle) => { //When client moves slider, perform these updates...
            let val = vals[handle];
            let point = this.getActive(); //Find current active point
            let img = document.getElementById(`location-${point.name}`); //Select the image of the current point.

            point.x = val; //Update X coord
            this.updateCoordTable(point, val, 'X'); //Update Coordinate Table
            this.updateDistTable(point); //Update the Distance Table
            img.style.left = `${val}%`; //Set the CSS left to the new value
        })

        sliderV.noUiSlider.on('update', (vals, handle) => {
            let val = vals[handle];
            let point = this.getActive();
            let img = document.getElementById(`location-${point.name}`);

            point.y = val;
            this.updateCoordTable(point, val, 'Y');
            this.updateDistTable(point);
            img.style.top = `${val}%`
        });
    }

    getActive() { //Finds the active point currently
        for (let point in this) {
            if (this[point].active) return this[point]
        }
    }

    setActive(newActive) { //Sets the new Active point and relieves the previous
        for (let point in this) {
            if (this[point].active) this[point].active = false;
        }
        this[newActive].active = true;
    }

    updateCoordTable(point, val, dir) { //Updates the Coord table with point name and direction (x, y)
        let td = document.getElementById(`${point.name}-${dir}`); //Note: use of point names
        td.innerHTML = parseInt(val).toFixed();
    }

    updateDistTable(point) { //Update the distance table with the point thats passed in
        for (let point2 in this) { //Iterate through all points dynamicly
            let value = getDistance(point, this[point2]); //Get the distance between the looping points
            let td = document.getElementById(`${point.name}-${this[point2].name}`); //Select td from point names
            td.innerHTML = value; //Set new distance value for point passed in

            let td2 = document.getElementById(`${this[point2].name}-${point.name}`); //Select td from the current point in the dynamic loop
            td2.innerHTML = value;
        }
    }


}

class Options { //This is the second of the two classes.
    constructor(boardMap) { //This class is responsible for the math of when Brad moves from point to point
        this.boardMap = boardMap; //Pass in the boardMap class so they can talk to each other
        this.brad = {
            img: 'imgs/jetpackBrad.png', //img source of brad, very handsome guy
            name: 'jetpackBrad' //name of brad, used for css and selecting the image
        };
        this.first = true; //Lets loop know if brad is starting from start
        this.totalDist = 0; //Keeps track of total Distance
        this.unknown = []; //List of points brad hasnt visited yet
        this.on; //Current point that brad is on
    }

    init() { //Starting function at start up


        //////                              //////
        //////  Create the Options Buttons  //////
        //////                              //////


        let optionsDiv = document.getElementById('options');

        let option1 = document.createElement('button'); //Create option 1 button
        option1.appendChild(document.createTextNode('Option 1'));
        option1.id = 'option-1';
        option1.addEventListener('click', () => { //When clicked, run option1 function
            this.runOption1();
        });
        optionsDiv.appendChild(option1);

        let option2 = document.createElement('button');
        option2.appendChild(document.createTextNode('Option2'));
        option2.id = 'option-2';
        option2.addEventListener('click', () => {
            this.runOption2();
        })
        optionsDiv.appendChild(option2);


        //////                              //////
        //////  Create Jetpack Brad Bradley //////
        //////                              //////

        let map = document.getElementById('boardMap'); //Adds brad img where the icons are
        let jetpack = document.createElement('img');
        jetpack.src = this.brad.img;
        jetpack.id = this.brad.name;
        map.appendChild(jetpack);


        //////                              //////
        //////       Create Text Log        //////
        //////                              //////

        let logDiv = document.getElementById('log'); //create span for the text that will be created after every launch
        let textLog = document.createElement('span');
        textLog.appendChild(document.createTextNode('Waiting for launch sequence...'));
        textLog.id = 'text-log';
        logDiv.appendChild(textLog);


        //////                              //////
        //////       Create Table Log       //////
        //////                              //////


        let tableLog = document.createElement('table'); //Create table for future data to be added
        tableLog.id = 'log-table';
        logDiv.appendChild(tableLog);

        let tHead = document.createElement('tr');
        tableLog.appendChild(tHead);

        let optKey = document.createElement('td');
        optKey.appendChild(document.createTextNode('Option'));
        tHead.appendChild(optKey);

        let pathKey = document.createElement('td');
        pathKey.appendChild(document.createTextNode('Path Taken'));
        tHead.appendChild(pathKey);

        let distKey = document.createElement('td');
        distKey.appendChild(document.createTextNode('Total Distance'));
        tHead.appendChild(distKey);




    }

    runOption1() {
        let jetpack = document.getElementById(this.brad.name); //Select Brads image
        if (this.first) { //If first time running, go to point A
            this.first = false;

            jetpack.style.left = `${this.boardMap.a.x}%`; //Set brad img at point A
            jetpack.style.top = `${this.boardMap.a.y}%`;

            this.totalDist = 0; //Set total Dist to 0, or reset to 0
            this.on = this.boardMap.a; //Set current on point to point a
            this.updateLogTable('Option 1', [this.boardMap.a, this.on]); //update Logtable
            this.updateLogText([this.boardMap.a, this.on]); //upate log text span

            for (let point in this.boardMap) { //Set All points, except current, to unknown
                if (this.boardMap[point] !== this.on) {
                    this.unknown.push(this.boardMap[point]);
                }
            }

        } else if (this.unknown.length === 0) { //Else, if brad is on the last point (no more unknown), go back to A
            this.first = true; //Set first back to true

            jetpack.style.left = `${this.boardMap.a.x}%`; //Move Brads image to A
            jetpack.style.top = `${this.boardMap.a.y}%`;

            this.totalDist += parseInt(getDistance(this.on, this.boardMap.a)); //Update total distance
            this.updateLogTable('Option 1', [this.on, this.boardMap.a]) //update log table
            this.updateLogText([this.on, this.boardMap.a]); //update log text


        } else { //Else, Brad is currently traveling to different points

            let allDist = []; //Create a distance array

            for (let point in this.unknown) { //loop through all points and get all possible distances and return to the distance array
                allDist.push([ // Also push a Point key (array of arrays ([[distance][Point]][[distance][Point]]))
                    [getDistance(this.on, this.unknown[point])], //Future Version should remove a level of array. 1 array un needed
                    [this.unknown[point]]
                ]);
            }

            allDist.sort(function(a, b) { //Sort the distances by Shortest -> Longest
                return a[0] - b[0];
            })
            let point = allDist[0][1][0]; //Select new point as the shortest in the array

            jetpack.style.left = `${point.x}%`; //Move Brad to new point
            jetpack.style.top = `${point.y}%`;

            this.totalDist += parseInt(allDist[0][0]); //Update total distance
            this.updateLogTable('Option 1', [this.on, point]); //update log table
            this.updateLogText([this.on, point]); //update log table

            this.on = point; //update on Point to the current Point
            this.unknown.forEach((val, key) => { //Remove current point from the unkown list
                if (this.on === val) {
                    this.unknown.splice(key, 1)
                }
            })
        }


    }

    runOption2() { // Exact same as option 1 other than sort function
        let jetpack = document.getElementById(this.brad.name);

        if (this.first) {
            jetpack.style.left = `${this.boardMap.a.x}%`;
            jetpack.style.top = `${this.boardMap.a.y}%`;

            this.totalDist = 0;
            this.on = this.boardMap.a;
            this.updateLogTable('Option 2', [this.boardMap.a, this.on]);
            this.updateLogText([this.boardMap.a, this.on]);

            this.first = false;
            for (let point in this.boardMap) {
                if (this.boardMap[point] !== this.on) {
                    this.unknown.push(this.boardMap[point]);
                }
            }

        } else if (this.unknown.length === 0) {
            jetpack.style.left = `${this.boardMap.a.x}%`;
            jetpack.style.top = `${this.boardMap.a.y}%`;

            this.totalDist += parseInt(getDistance(this.on, this.boardMap.a));
            this.updateLogTable('Option 2', [this.on, this.boardMap.a])
            this.updateLogText([this.on, this.boardMap.a]);

            this.first = true;

        } else {

            let allDist = [];

            for (let point in this.unknown) {
                allDist.push([
                    [getDistance(this.on, this.unknown[point])],
                    [this.unknown[point]]
                ]);
            }

            allDist.sort(function(a, b) {
                return b[0] - a[0]; //Sort from Longest -> Shortet
            })
            let point = allDist[0][1][0];
            jetpack.style.left = `${point.x}%`;
            jetpack.style.top = `${point.y}%`;

            this.totalDist += parseInt(allDist[0][0]);
            this.updateLogTable('Option 2', [this.on, point])
            this.updateLogText([this.on, point]);

            this.on = point;
            this.unknown.forEach((val, key) => {
                if (this.on === val) {
                    this.unknown.splice(key, 1)
                }
            })


        }
    }

    updateLogTable(option, path) { //Update the log table, Keeps adding new rows to it.
        let tableLog = document.getElementById('log-table'); //Future verson will have a scrollable bar for the log, use css

        let row = document.createElement('tr');
        tableLog.appendChild(row);

        let optionKey = document.createElement('td'); //Displayes the option you chose
        optionKey.appendChild(document.createTextNode(option));
        row.appendChild(optionKey);

        let pathKey = document.createElement('td'); //Displayes the path that you took
        pathKey.appendChild(document.createTextNode(`${path[0].name} to ${path[1].name}`));
        row.appendChild(pathKey);

        let distKey = document.createElement('td'); //Displayes the total distance
        distKey.appendChild(document.createTextNode(this.totalDist));
        row.appendChild(distKey);
    }

    updateLogText(path) {
        let textLog = document.getElementById('text-log'); //Pick a random message to display with specific point names.
        let logAns = [
            `Traveled from ${path[0].name} to da big ${path[1].name}. Distance as ${this.totalDist}`,
            `Whew, good call from ${path[0].name} to the magical ${path[1].name}. Traveled ${this.totalDist} so far`,
            `Made it to the ${path[1].name} from ${path[0].name}, good choice. So far ${this.totalDist}`,
            `Wow, didn't expect to make it to ${path[1].name} from ${path[0].name}. We've traveled ${this.totalDist}`
        ];

        shuffle(logAns)
        textLog.innerHTML = logAns[0];
    }

}

function getDistance(point1, point2) { //Function to get distance between 2 points using the Pythagorean theorem. Cool maths stuff
    let dist = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)).toFixed(0);
    return dist;
}

function shuffle(a) { //Function to shuffle an array, only used on log text answers, but could be used for future featurs
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function initMapSelector() { //Function run at start to build the map selector
    let toggleMap = document.getElementById('pull-down');
    let mapsMenu = document.getElementById('maps');
    toggleMap.addEventListener('click', function() {
        mapsMenu.classList.toggle('maps-on'); //toggle class to display the list
    })

    let mainMap = document.getElementById('boardMap');
    let mapList = document.getElementById('map-choice');
    let maps = mapList.getElementsByTagName('li');

    for (let i = 0; i < maps.length - 1; i++) { //When a map is clicked, except for the last (gonna be a select your own map), then map will change
        maps[i].addEventListener('click', function() {
            mainMap.style.backgroundImage = `url('imgs/map${i+1}.jpg')`;
        });
    }
}



(function () {{

    let board = new Board();
    board.init();

    let options = new Options(board);
    options.init();
    initMapSelector();

}})();
