const fileInput = document.getElementById('fileInput');
const inputForm = document.getElementById('inputForm')
const colour = document.getElementById('colour');
const displayIMG = document.createElement('img');
displayIMG.width = 100;
displayIMG.height = 100;
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

document.getElementById('wrapper').appendChild(displayIMG);
inputForm.addEventListener('submit', e => {
    debugger;
    console.log("got here");
    e.preventDefault();
    if(fileInput.files === null || fileInput.files.Length === 0 || fileInput.files.Length >= 2) {
        alert('Please select one valid image file');
        return;
    }
    const file = fileInput.files[0];
    const imageToAdd = URL.createObjectURL(file);
    displayIMG.src = imageToAdd;
    displayIMG.onload = function() {
        const colours = mostFrequentColour(displayIMG, 5);
        colour.innerHTML = "";
        for(let colorHex in colours) {
            colour.innerHTML += `<div style="Background-color: ${colorHex}">${colorHex}</div>`;
        }
    };
});


/** Method to get the dominant colour of an image
 * 
 * @param img an image file 
 * @param n the amount of dominant colours
 * @returns a list of the n dominant colours of the image
 */

function mostFrequentColour(img, n) {
    context.drawImage(img, 0, 0);
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const map = new Map();
    for(let i = 0; i < data.length; i += 4) {
        if(data[i + 3] < 255) { //ignore partially transparent pixels
            continue;
        }
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i+ 2];
        const colour = "#" + stringNumberToHex(red) + stringNumberToHex(green) + stringNumberToHex(blue);
        if(map.has(colour)) {
            map.set(colour, map.get(colour) + 1);
        } else {
            map.set(colour, 1);
        }
    }
    const toRet = [];
    while(toRet.length < n && map.size > 0) {
        debugger;
        let maxkey = '';
        let max = 0;
        for(let [key, value] of map) {
            if(value > max) {
                maxkey = key;
                max = value;
            }
        }
        map.delete(maxkey);
        toRet.push(colour);
    }
    return toRet;
}


/**
 * 
 * @param numberString string representation of a decimal number
 * @returns the hexadecimal representation of the number as a string
 */
function stringNumberToHex(numberString) {
    const number = parseInt(numberString);
    return number.toString(16);
}

