console.log('script loaded');

window.onload = () => {

    async function runTest() {
        const resp = await fetch('https://web2-course-project-gregvetto.herokuapp.com/api/books');
        const data = await resp.json();

        console.log(data);
        console.log(data.length);


        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name)
            const htmlString = `<div class="dataCard">
        <img src="X.png" id="xButton">
        <img src="${data[i].image}" id="bookThumbnail">
        <div id="containerBook">
        <div class="divTitles"><p><b>Title:</b></p><p id="bookTitle">${data[i].name}</p></div><br>
        <div class="divTitles"><p><b>Author:</b></p><p id="author">${data[i].author}</p></div><br>
        <div class="divTitles"><p><b>Description:</b></p><p id="description">${data[i].Plot}</p></div><br>
        <div class="divTitles"><b><p>Published date:</b></p><p id="publishYear">${data[i].publishyear}</p></div><br>
        </div>
    </div>`;

            const appendElements = document.getElementById("sectionForData");

            appendElements.insertAdjacentHTML('afterbegin', htmlString)
        }
    }
    runTest();
}