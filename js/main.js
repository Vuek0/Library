import {datas} from "./data.js";

const data = {
    ...datas,

    takenBooks: []
}

class Page{
    constructor(name, button, container, html, script, data){
        this.name = name;
        this.button = button;
        this.container = container;
        this.html = html;
        this.script = script;
        this.data = data;
    }

    buttonAction(){
       
        this.button.addEventListener("click", ()=>{
            const buttons = document.querySelectorAll(".page");
            buttons.forEach(item => {
                if(item.name !== this.name){
                    item.classList.remove("button-active")
                }
            });
            this.setActive();
        })
    }
    setActive(){
        const containerName = `${this.name.toLowerCase()}__container`
        this.button.classList.add("button-active");
        // -------------------------- needed -----------------------------------
        container.innerHTML = `
        <div class="${containerName} page__container container">
            ${this.html}
        </div>`;
        this.script();            
        // -------------------------- needed -----------------------------------
    }
    reRender(newHtml){
        
            const containerName = `${this.name.toLowerCase()}__container`;
            this.html = newHtml;
            container.innerHTML = `
            <div class="${containerName} page__container container">
                ${newHtml}
            </div>`;
            this.script(); 
            
        
    }
}

const modal = document.querySelector('.modal');
const modalClose = document.querySelector(".modal__close");
const output = document.querySelector(".modal__output")
function openModal(){
    modal.classList.add("open");
    modalClose.addEventListener("click", function closeModal(){
        modal.classList.remove("open");
        output.innerHTML = "";
        modalClose.removeEventListener("click", closeModal);
    })
}
function closeModal(){
    modal.classList.remove("open");
    output.innerHTML = "";
}
// ---------------------------
// openModal();
// output.textContent = "some";
// ---------------------------

function getDateFormat(date){
    return('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
}

const d = new Date();

function makeBookCard(data){
    return `
        <div class="book__card" id="book${data.id}">
            <h3>${data.name}</h3>
            <p>${data.author}(${data.year} г.)</p>
            <p>Количество книг: ${data.count}</p>
            <div class="book__card__buttons">
                <button class="book-change">Изменить</button>
                <button class="book-delete">Удалить</button>
            </div>
        </div>
    `
}

function makePopularBookCard(data){
    return `
        <div class="book__card" id="book${data.id}">
            <h3>${data.name}</h3>
            <p>${data.author}(${data.year} г.)</p>
            <p>Количество книг: 5</p>
        </div>
    `
}

function makeVisitorCard(data){
    return `
        <div class="visitor__card" id="visitor${data.id}">
            <p>Имя: ${data.name}</p>
            <p>Телефон: ${data.phone}</p>
            <div class="visitor__card__buttons">
                <button class="visitor-change">Изменить</button>
                <button class="visitor-delete">Удалить</button>
            </div>
        </div>
    `
}

function makeCard(data){
    return `
    <div class="card" id="card${data.id}">
        <p style="display: none;" class="bookId">${data._bookId}</p>
        <p>Имя: ${data.name}</p>
        <p>Книга: ${data.book}</p>
        <p>Дата выдачи: ${data.issue}</p>
        <p>Дата отдачи: ${data.return}</p>
        <button class="card-return" >Вернуть</button>
    </div>
    `
}

function createHtml(arr, method){
    let resultHTML = `<div class="cards"> 
                        `;
    for(let i = 0; i < arr.length ;i++){
        const card = method(arr[i]);
        resultHTML+=card;
    }
    resultHTML+=`</div>`;
    return resultHTML;
}

function createPopularHtml(arr, method){
    let resultHTML = `<div class="cards">`;
    for(let i = 0; i < 4; i++){
        const card = method(arr[i]);
        resultHTML+=card;
    }
    resultHTML+="</div>"
    return resultHTML;
}

function makeNewBookForm(){
    return `<h3>New Book: </h3>
    <form class="book__create__form">
        <label>
            Book name:
            <input type="text" placeholder="Name" id="bookNameInput"/>
        </label>
        <label>
            Author:
            <input type="text" placeholder="Author" id="bookAuthorInput"/>
        </label>
        <label>
            Book year:
            <input type="date" placeholder="Year" id="bookYearInput"/>
        </label>
        <label>
            Book quantity:
            <input type="number" value="1" min="1" max="999" class="quantity" id="bookQuanityInput"/>
        </label>
        <button class="book__create__form__button" type="submit">Save</button>
    </form>`
}

function makeEditBookForm(){
    return `<h3>Edit Book: </h3>
    <form class="book__create__form">
        <label>
            Book name:
            <input type="text" placeholder="Name" id="bookNameInput"/>
        </label>
        <label>
            Author:
            <input type="text" placeholder="Author" id="bookAuthorInput"/>
        </label>
        <label>
            Book year:
            <input type="date" placeholder="Year" id="bookYearInput"/>
        </label>
        <label>
            Book quantity:
            <input type="number" value="1" min="1" max="999" maxlength="5" class="quantity" id="bookQuanityInput"/>
        </label>
        <button class="book__create__form__button" type="submit">Save</button>
    </form>`;
}

function makeEditVisitorForm(){
    return `<h3>Edit visitor: </h3>
    <form class="visitor__form">
        <label>
            Full name:
            <input type="text" placeholder="Collete Kelley" id="fullnameInput"/>
        </label>
        <label>
            Phone number:
            <input type="tel" placeholder="+012-435-45-67" pattern="[+]{1}[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" id="telInput"/>
        </label>
        <button class="visitor__form__button" type="submit">Save</button>
    </form>`;
}

function makeNewVisitorForm(){
    return `<h3>New visitor: </h3>
    <form class="visitor__form">
        <label>
            Full name:
            <input type="text" placeholder="Collete Kelley" id="fullnameInput"/>
        </label>
        <label>
            Phone number:
            <input type="tel" placeholder="+012-435-45-67" pattern="[+]{1}[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" id="telInput"/>
        </label>
        <button class="visitor__form__button" type="submit">Create</button>
    </form>`;
}

function makeCardForm(){
    const optionsForUsers = makeOptions(data.users);
    const optionsForBooks = makeOptions(data.books);
    const html = `<h3>New card: </h3>
    <form class="card__form">
        <label>
            Visitor:
            <select name="visitors" id="visitorSelect">
                ${optionsForUsers}
            </select>
        </label>
        <label>
            Book:
            <select name="books" id="bookSelect">
                ${optionsForBooks}
            </select>
        </label>
        <button class="visitor__form__button" type="submit">Save</button>
    </form>
    ` 
    return html;
}

function makeOptions(arr){  
    let result = ``;
    // for(let i = 1; i < arr.length; i++){

    // }
    arr.forEach(item => {
        if(item.count !== undefined && item.count > 0){
            result+=`<option value="${item.name}__${item.id}"> ${item.name} <option>`;
        } else if(item.count == undefined){
            result+=`<option value="${item.name}__${item.id}"> ${item.name} <option>`;
        }
    })   
    return result;
}

// function makeOptionsBooks(arr){

// }


const container = document.querySelector(".pages")

const pages = [
    new Page("Books", document.querySelector("#books"), container, `<button id="addBook"> Добавить книгу </button>` + createHtml(data.books, makeBookCard), function (){
        const obj = this;
        const change = document.querySelectorAll(".book-change");
        const del = document.querySelectorAll(".book-delete");
        const addButton = document.querySelector("#addBook");
        addButton.addEventListener("click", ()=>{
            openModal();
            output.innerHTML = makeNewBookForm();
            const form = document.querySelector("form");
            form.addEventListener("submit", (e)=>{
                e.preventDefault();
                const bookNameInput = document.querySelector("#bookNameInput");
                const bookAuthorInput = document.querySelector("#bookAuthorInput");
                const bookYearInput = document.querySelector("#bookYearInput");
                const bookQuanityInput = document.querySelector("#bookQuanityInput");
                if(bookNameInput.value 
                    && bookAuthorInput.value
                    && bookYearInput.value
                    && bookQuanityInput.value){
                    if(bookYearInput.value.slice(0, 4) >= 2025 || bookYearInput.value.slice(0,4) <= 1488){
                        alert("Введен неверный год!");
                    }else if(bookAuthorInput.value.length > 25 || bookNameInput.value.length > 25){
                        alert("Слишком большое количество символов")
                    } else{
                        let id;
                        if(data.books.length >= 1){
                            id = data.books[data.books.length - 1].id + 1
                        }else{
                            id = 1;
                        }
                        
                        const result = {
                            id: id,
                            name: bookNameInput.value,
                            author: bookAuthorInput.value,
                            year: bookYearInput.value.slice(0, 4),
                            count: bookQuanityInput.value
                        };
                        data.books.push(result);
                        const newHTML = `<button id="addBook"> Добавить книгу </button>` + createHtml(data.books, makeBookCard);
                        closeModal();
                        obj.reRender(newHTML);
                    }
                }else{
                    alert("Имеются пустые значения!");
                }
                
            })
    
        })

        
        change.forEach(item=>{
            item.addEventListener("click", ()=>{
                const id = Number(item.parentNode.parentNode.id.split("book")[1]);
                let bookObj;
                data.books.forEach(item => {
                    const itemId = item.id
                    if(item.id == id){
                        bookObj = item;
                    }
                })
                
                openModal();
                output.innerHTML = makeEditBookForm();
                const form = document.querySelector("form");
                const bookNameInput = document.querySelector("#bookNameInput");
                const bookAuthorInput = document.querySelector("#bookAuthorInput");
                const bookYearInput = document.querySelector("#bookYearInput");
                const bookQuanityInput = document.querySelector("#bookQuanityInput");
                bookNameInput.value = bookObj.name;
                bookAuthorInput.value = bookObj.author;
                bookYearInput.value = bookObj.year + "-01-01";
                bookQuanityInput.value = bookObj.count;
                form.addEventListener("submit", (e)=>{
                    e.preventDefault();
                    if(bookNameInput.value 
                        && bookAuthorInput.value
                        && bookYearInput.value
                        && bookQuanityInput.value){
                        if(bookYearInput.value.slice(0, 4) >= 2025 || bookYearInput.value.slice(0,4) <= 1488){
                            alert("Введен неверный год!");
                        }else if(bookAuthorInput.value.length > 25 || bookNameInput.value.length > 25){
                            alert("Слишком большое количество символов")
                        } else{
                            const result = {
                                name: bookNameInput.value,
                                author: bookAuthorInput.value,
                                year: bookYearInput.value.slice(0, 4),
                                count: bookQuanityInput.value
                            };
                            data.books.forEach(item => {
                                const itemId = item.id
                                if(item.id == id){
                                    item.name = result.name;
                                    item.author = result.author;
                                    item.year = result.year;
                                    item.count = result.count;
                                }
                            })
                            const newHTML = `<button id="addBook"> Добавить книгу </button>` + createHtml(data.books, makeBookCard);
                            obj.reRender(newHTML);
                            closeModal();
                        }
                    }else{
                        alert("Имеются пустые значения!");
                    }
                    
                })
            })
        });

        del.forEach(item=>{
            item.addEventListener("click", ()=>{
                openModal();
                output.innerHTML = `
                    <h3>Вы точно хотите удалить книгу?</h3>
                    <div class="agree__buttons">
                        <button class="button--agree">Удалить</button>
                        <button class="button--disagree">Отменить</button>
                    </div>
                `
                const agree = document.querySelector(".button--agree");
                const disAgree = document.querySelector(".button--disagree");
                agree.addEventListener("click", ()=>{
                    const bookId = Number(item.parentNode.parentNode.id.split("book")[1]);
                    const newArr = data.books.filter(item=>{
                        if(item.id != bookId){
                            return item;
                        }
                    })
                    data.books = newArr;
                    const newHTML = `<button id="addBook"> Добавить книгу </button>` + createHtml(data.books, makeBookCard);
                    obj.reRender(newHTML);
                    
                    closeModal();
                })

                disAgree.addEventListener("click", ()=>{
                    closeModal();
                    output.innerHTML = "";
                })



                // deleting

                
                
            })
        })
        
    }),
    new Page("Visitors", document.querySelector("#visitors"), container, `<button id="addNewUser">Добавить нового посетителя</button>` + createHtml(data.users, makeVisitorCard), function(){
        const obj = this;
        const change = document.querySelectorAll(".visitor-change");
        const del = document.querySelectorAll(".visitor-delete");
        const addButton = document.querySelector("#addNewUser");
        addButton.addEventListener("click", ()=>{
            openModal();
            output.innerHTML = makeNewVisitorForm();
            const form = document.querySelector("form");
            form.addEventListener("submit", (e)=>{
                e.preventDefault();
                const nameInput = document.querySelector("#fullnameInput");
                const phoneInput = document.querySelector("#telInput");
                
                if(nameInput.value && phoneInput.value){
                    if(nameInput.value.length > 15){
                        alert("Слишком большое количество символов в имени")
                    } else{
                        let id;
                        if(data.users.length >= 1){
                            id = data.users[data.users.length - 1].id + 1
                        }else{
                            id = 1;
                        }
                        
                        const result = {
                            id: id,
                            name: nameInput.value,
                            phone: phoneInput.value
                        };
                        data.users.push(result);
                        const newHTML = `<button id="addNewUser"> Добавить нового посетителя </button>` + createHtml(data.users, makeVisitorCard);
                        closeModal();
                        obj.reRender(newHTML);
                    }
                }else{
                    alert("Имеются пустые значения!");
                }
                
            })
        })
        
        change.forEach(item=>{
            item.addEventListener("click", ()=>{
                const id = Number(item.parentNode.parentNode.id.split("visitor")[1]);
                let userObj;
                data.users.forEach(item => {
                    if(item.id == id){
                        userObj = item;
                    }
                })
                
                openModal();
                output.innerHTML = makeEditVisitorForm();
                const form = document.querySelector("form");
                const nameInput = document.querySelector("#fullnameInput");
                const phoneInput = document.querySelector("#telInput");
                nameInput.value = userObj.name;
                phoneInput.value = userObj.phone;
                form.addEventListener("submit", (e)=>{
                    e.preventDefault();
                    if(nameInput.value && phoneInput.value){
                        if(nameInput.value.length > 15){
                            alert("Слишком большое количество символов в имени")
                        } else{
                            const result = {
                                name: nameInput.value,
                                phone: phoneInput.value
                            };
                            data.users.forEach(item => {
                                if(item.id == id){
                                    item.name = result.name;
                                    item.phone = result.phone;
                                }
                            })
                            const newHTML = `<button id="addNewUser"> Добавить нового посетителя </button>` + createHtml(data.users, makeVisitorCard);
                            obj.reRender(newHTML);
                            closeModal();
                        }
                    }else{
                        alert("Имеются пустые значения!");
                    }
                    
                })
            })
        });

        del.forEach(item=>{
            item.addEventListener("click", ()=>{
                openModal();
                output.innerHTML = `
                    <h3>Вы точно хотите удалить пользователя?</h3>
                    <div class="agree__buttons">
                        <button class="button--agree">Удалить</button>
                        <button class="button--disagree">Отменить</button>
                    </div>
                `
                const agree = document.querySelector(".button--agree");
                const disAgree = document.querySelector(".button--disagree");
                agree.addEventListener("click", ()=>{
                    const userId = Number(item.parentNode.parentNode.id.split("visitor")[1]);
                    const newArr = data.users.filter(item=>{
                        if(item.id != userId){
                            return item;
                        }
                    })
                    data.users = newArr;
                    const newHTML = `<button id="addNewUser"> Добавить нового посетителя </button>` + createHtml(data.users, makeVisitorCard);
                    obj.reRender(newHTML);
                    output.innerHTML = "";
                    closeModal();
                })

                disAgree.addEventListener("click", ()=>{
                    closeModal();
                    output.innerHTML = "";
                })



                // deleting

                
                
            })
        })
        
    }),
    new Page("Cards", document.querySelector("#cards"), container, `<button id="addButton">Добавить карточку</button>` + createHtml(data.takenBooks, makeCard), function(){
        const addButton = document.querySelector("#addButton");
        const obj = this;
        const returnButtons = document.querySelectorAll(".card-return");
        addButton.addEventListener("click", ()=>{
            openModal();
            output.innerHTML = makeCardForm();
            const form = document.querySelector("form");
            
            form.addEventListener("submit", (e)=>{
                e.preventDefault();
                const visitorSelect = document.querySelector("#visitorSelect");
                const bookSelect = document.querySelector("#bookSelect");
                if(visitorSelect.value && bookSelect.value){     
                    let id;
                    const issueDate = new Date();
                    const returnDate = new Date(issueDate.setDate(issueDate.getDate() + 3));
                    const bookSplit = bookSelect.value.split("__");
                    const visitorSplit = visitorSelect.value.split("__")
                    if(data.takenBooks.length >= 1){
                        id = data.takenBooks[data.takenBooks.length - 1].id + 1
                    }else{
                        id = 1;
                    }   
                    const result = {
                        id: id,
                        _bookId: bookSplit[1],
                        book: bookSplit[0],
                        name: visitorSplit[0],
                        issue: getDateFormat(issueDate),
                        return: getDateFormat(returnDate)

                    };
                    data.takenBooks.push(result);
                    data.books.forEach(item => {
                        if(item.id == result._bookId){
                            item.count--;
                        }
                    })
                    const newHTML = `<button id="addButton"> Добавить карточку </button>` + createHtml(data.takenBooks, makeCard);
                    closeModal();
                    obj.reRender(newHTML);
                }
                
            })
        })

        returnButtons.forEach(item => {
            item.addEventListener("click", ()=>{
                const parent = item.parentNode;
                const userId = parent.id.split("card")[1];
                const bookId = parent.querySelector(".bookId").innerHTML;
                data.books.forEach(item => {
                    if(item.id === bookId){
                        item.count++;
                    }
                })

                const newArr = data.takenBooks.filter(item=>{
                    if(item.id != userId){
                        return item;
                    }
                })
                data.takenBooks = newArr;
                const newHTML = `<button id="addButton"> Добавить карточку </button>` + createHtml(data.takenBooks, makeCard);
                obj.reRender(newHTML);

            })
        })
    }),
    new Page("Statistics", document.querySelector("#statistics"), container, createPopularHtml(data.books, makePopularBookCard), function(){
        const obj = this;
        if(data.books.length > 5 || data.books.length < 4){
            obj.reRender(createPopularHtml(data.books, makePopularBookCard));
        }
        console.log("Developed by Muhammad Nuriakhmedov. Github: https://github.com/Vuek0")
    }),
    
]

document.addEventListener("DOMContentLoaded", () => {
    pages.forEach(page => {
        page.buttonAction()
    });
    pages[0].setActive();
})

