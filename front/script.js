console.log('script loaded');

window.onload = () => {

    async function runTest() {
        const resp = await fetch('https://web2-course-project-gregvetto.herokuapp.com/api/books');
        const data = await resp.json();

        console.log(data);
        console.log(data.length);


        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].name);
           // console.log(data[i].image);
            const htmlString = `<form action="https://web2-course-project-gregvetto.herokuapp.com/api/bookRemove" method="POST" id="form">
            <label for="name"></label>
            <input style="display:none" type="text" name="name" id="name" for="name" value="${data[i].name}">
            <label for="author"></label>
            <input style="display:none" type="text" name="author" id="author" for="author" value="${data[i].author}">
            <label for="Plot"></label>
            <input style="display:none" type="text" name="Plot" id="Plot" for="Plot" value="${data[i].Plot}">
            <label for="publishdate"></label>
            <input style="display:none" type="text" name="publishdate" id="publishdate" for="publishdate" value="${data[i].publishdate}">
            <label for="image"></label>
            <input style="display:none" type="text" name="image" id="image" for="image" value="${data[i].image}">
            <label for="preview"></label>
            <input style="display:none" type="text" name="preview" id="preview" for="preview" value="${data[i].preview}">

            <div class="dataCard">
        <img src="${data[i].image}" id="bookThumbnail">
        <div id="containerBook">
        <div class="divTitles"><p><b>Title:</b></p><p id="bookTitle">${data[i].name}</p></div><br>
        <div class="divTitles"><p><b>Author:</b></p><p id="author">${data[i].author}</p></div><br>
        <div class="divTitles"><p><b>Description:</b></p><p id="description">${data[i].Plot}</p></div><br>
        <div class="divTitles"><b><p>Published date:</b></p><p id="publishYear">${data[i].publishdate}</p></div><br>
        <input type="submit" id="submit" name="submit" value="Delete from portfolio">
        </form>
        </div>
    </div>`;

            const appendElements = document.getElementById("sectionForData");

            appendElements.insertAdjacentHTML('afterbegin', htmlString)
        }
    }
    runTest();
}
//        <a href="${data[i].preview}" target="_blank"><button id="addtoPortfolio">Preview</button></a>