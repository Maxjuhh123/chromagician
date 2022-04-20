//setting up user
let user;

//setting up the popular section
const popularContainer = document.getElementById('popularPaletteContainer');
const popularPalettes = []; //should later be set to top 5 of database sorted by likes + views? maybe also by time?
for(let i = 0; i < 5; i++) {
    popularPalettes.push(["blue","blue","blue"])
}
for(let colorList of popularPalettes) {
    generatePaletteDiv(colorList, popularContainer);
}

//setting up recent section
const recentContainer = document.getElementById('recentPaletteContainer');
const recentPalettes = []; //should later be set to top 5 of database sorted by likes + views? maybe also by time?
for(let i = 0; i < 5; i++) {
    recentPalettes.push(["blue","blue","blue"])
}
for(let colorList of recentPalettes) {
    generatePaletteDiv(colorList, recentContainer);
}

//setting up liked section
const likedContainer = document.getElementById('likedPaletteContainer');
const likedPalettes = []; //should later be set to top 5 of database sorted by likes + views? maybe also by time?
for(let i = 0; i < 5; i++) {
    likedPalettes.push(["blue","blue","blue"])
}
for(let colorList of likedPalettes) {
    generatePaletteDiv(colorList, likedContainer);
}

//setting up see more
const seeMorePopular = document.createElement('a');
seeMorePopular.href = "market.html";
popularContainer.parentElement.appendChild(seeMorePopular);


/** A function that, given a list of three colours, adds a pallette of it
 * to the given container div.
 * 
 * @param {*} colours - the three colours to be displayed in the palette
 * @param {*} container - the container the palette will be added to
 */

function generatePaletteDiv(colours, container) {
    //creating div elements
    const paletteDiv = document.createElement('div');
    const child1 = document.createElement('div');
    const child2 = document.createElement('div');
    const child3 = document.createElement('div');

    //settting style of all divs
    paletteDiv.style = "display: flex; align-items: center; float: left; margin-right: 30px;";
    child1.style = "border: 5px solid white; border-radius: 15px; width: 80px; height: 80px; border: 5px white; float: left; margin-right: -40px; z-index: 3;" + 
        "background-color: " + colours[0] + ";";
    child2.style = "border-radius: 10px; width: 70px; height: 70px; border: 5px white; float: left; margin-right: -40px; z-index: 2;" + 
        "background-color: " + colours[1] + ";";
    child3.style = "border-radius: 10px; width: 60px; height: 60px; border: 5px white; float: left; z-index: 1;" + 
        "background-color: " + colours[2] + ";";

    //adding the divs to the document
    paletteDiv.appendChild(child1);
    paletteDiv.appendChild(child2);
    paletteDiv.appendChild(child3);
    container.appendChild(paletteDiv);
}


/** Setter for user.
 * 
 * @param {*} user - the user to be set
 */
function setUser(user) {
    this.user = user;
}