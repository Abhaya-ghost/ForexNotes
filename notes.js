console.log("Welcome to the Forex Notes")
showNotes();

//adding notes
let addBtn = document.getElementById('add_btn');
addBtn.addEventListener("click", function (element) {
    let textNote = document.getElementById('addTxt');
    let titleNote = document.getElementById('addTitle')
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    
    let objnotes = {
        title : titleNote.value,
        text : textNote.value
    }
    notesObj.push(objnotes);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textNote.value = "";
    titleNote.value = "";
    console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-3 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
        </div>
    </div>`
    });

    let notesEle=document.getElementById('notes');
    if(notesObj.length!=0){
        notesEle.innerHTML=html;
    }
    else{
        notesEle.innerHTML=`No notes.Please add a note!`
    }
}

function deleteNote(index)
{
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchtxt');
search.addEventListener("input", function(){
    let input=search.value.toLowerCase();
    let noteCard=document.getElementByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let txt=element.getElementsByTagName("p")[0].innerText;
        if(txt.includes(input)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})