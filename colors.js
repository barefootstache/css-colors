function readTextFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("./colors.json", function(text){
    const data = JSON.parse(text).list;

    let grid = ''

    for (let ii = 0; ii < data.length; ii++) {
        const cc = data[ii];
        grid += `<div class="cell ${cc.isDark ? 'white' : ''}" style="background-color:${cc.name.toLowerCase()}" onclick="copyText('${cc.hex}')">
                    <p class="name">${cc.name}</p>
                    <p class="hex">${cc.hex}</p>
                </div>`
        
    }

    document.getElementById('container').innerHTML = grid;
});

function copyText(text) {
    navigator.clipboard.writeText(text);
}