console.log('script loaded');

window.onload = () => {

    async function runTest() {
        const resp = await fetch('http://localhost:3000/api/books');
        const data = await resp.json();

        console.log(data);
        console.log(data.length);


        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name)
            const htmlString = `<div class="dataCard">
        <div class="divTitles"><p><b>Title:</b></p><p id="bookTitle">${data[i].name}</p></div><br>
        <div class="divTitles"><p><b>Author:</b></p><p id="publishYear">${data[i].author}</p></div><br>
        <div class="divTitles"><p><b>Description:</b></p><p id="description">${data[i].Plot}</p></div><br>
        <div class="divTitles"><b><p>Publish year:</b></p><p id="genre">${data[i].publishyear}</p></div><br>
    </div>`;

            const appendElements = document.getElementById("sectionForData");

            appendElements.insertAdjacentHTML('afterbegin', htmlString)
        }
    }
    runTest();
}