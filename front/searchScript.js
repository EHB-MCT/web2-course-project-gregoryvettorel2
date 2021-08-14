console.log('script loaded');
//API KEY
const key = "AIzaSyAFm0I29g1bQu8Npv5Sl_L2SQ4BYZWtAEQ";

function ConfirmLogout() {
    var confirmLogout = confirm("Are you sure you want to logout?");
    if (confirm)
        return true;
    else
        return false;
}

window.onload = () => {

    //haalt user input op
    let submitForm = event => {
        event.preventDefault();
        document.getElementById("resultsDiv").innerHTML = "";
        let value = document.getElementById('inputTitle').value;
        console.log(value);

        let result = getData(value);
    }

    async function getData(searchParameter) {
        let resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParameter}&key=${key}`);
        let data2 = await resp.json();

        //Tests
        console.log(data2);

        //LOOP VOOR ITEREREN EN APEND
        for (let i = 0; i < data2.items.length; i++) {
            //functie om error te catchen
            function getSafe(fn, defaultVal) {
                try {
                    return fn();
                } catch (e) {
                    return defaultVal;
                }
            }

            //VARIABELEN VOOR STRING AANMAKEN
            //Als er geen image is, "emptycover.png" gebruiken, lost error op "cannot read value of undefined"
            let image = (getSafe(() => data2.items[i].volumeInfo.imageLinks.thumbnail));
            if (image === undefined) {
                image = "emptycover.png";
            }
            //als er geen auteur is, "unknown", lost error op "cannot read value of undefined"
            let author = (getSafe(() => data2.items[i].volumeInfo.authors[0]));
            if(author === undefined) {
                author = "No author available";
            }
            //Plot var aanmaken
            let plot = data2.items[i].volumeInfo.description;
            if(plot === undefined){
                plot = "No plot available";
            }
            //title var aanmaken
            let title = data2.items[i].volumeInfo.title;
            if(title === undefined){
                title = "No title available";
            }
            //Published date var aanmaken
            let published = data2.items[i].volumeInfo.publishedDate;
            if(published === undefined){
                published = "No published date available";
            }

            //Append string
            //Labels/input for POST + Injected string
            const htmlString = `<form action="https://web2-course-project-gregvetto.herokuapp.com/api/books" method="POST" id="form">
            <label for="name"></label>
            <input style="display:none" type="text" name="name" id="name" for="name" value="${title}">
            <label for="author"></label>
            <input style="display:none" type="text" name="author" id="author" for="author" value="${author}">
            <label for="Plot"></label>
            <input style="display:none" type="text" name="Plot" id="Plot" for="Plot" value="${plot}">
            <label for="publishdate"></label>
            <input style="display:none" type="text" name="publishdate" id="publishdate" for="publishdate" value="${published}">
            <label for="image"></label>
            <input style="display:none" type="text" name="image" id="image" for="image" value="${image}">

            <div class="dataCard">
            <img src="${image}" id="bookThumbnail">
            <div id="containerBook">
            <div class="divTitles"><p><b>Title:</b></p><p id="smallText">${title}</p></div><br>
            <div class="divTitles"><b><p>Author:</b></p><p id="smallText">${author}</p></div><br>
            <div class="divTitles"><p><b>Published date:</b></p><p id="smallText">${published}</p></div><br>
            <div class="divTitles"><p><b>Description:</b></p><p id="smallText">${plot}</p></div><br>
            </div>
            <br>
            <a href="${data2.items[i].volumeInfo.previewLink}" target="_blank"><button id="addtoPortfolio">Preview</button></a>
            <input type="submit" class="card-btn" name="submit" id="submit2" value="Add to portfolio">
            </div></form>`;

            //Hier wordt de string geinsert
            const appendElement = document.getElementById("resultsDiv");

            appendElement.insertAdjacentHTML('afterbegin', htmlString)
        }
    }

    //Event listener voor button, refresh toevoegen?
    document.getElementById('searchform').addEventListener('submit', submitForm);
}