const noteListDiv = document.querySelector(".note-list");
let noteID = 1;
const date = new Date();

window.onload = () =>{
    showStories(getDataFromStorage());

    
    document.getElementById("date").innerHTML = date.toDateString();
}

function Note(id, title, content,date, bookmarked){
  this.id = id; // a function once defined can be invoked for different objects using the (this as the keyword)
  this.title = title;
  this.content = content;
  this.date = date;
  this.bookmarked = bookmarked
}


// get item from storage 

function getDataFromStorage(){
  return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
}



// add a new story(note) in the list 

function addNewNote(){
  const noteTitle = document.getElementById("title");
  const noteContent = document.getElementById("body");
  let bookmarked = false;
  
  if(validateInput(noteTitle, noteContent)){
    let notes = getDataFromStorage();
    
    let id = noteTitle.value +Math.floor((Math.random() * 1000) + 1);

    let noteItem = new Note(id, noteTitle.value, noteContent.value, date.toDateString(), bookmarked);
    noteID = noteID + 1;
    notes.push(noteItem);
  
    // saving in the local storage 
    
    localStorage.setItem("notes", JSON.stringify(notes));
    noteTitle.value = "";
    noteContent.value = "";
    location.reload();
    
  }
  
}

//  input validation 

function validateInput(title, content){
  if(title.value !== "" && content.value !== ""){
    return true;
  }else {
    if(title.value === "") title.classList.add("warning");
    if(content.value === "") content.classList.add("warning");
  }
  setTimeout(() => {
    title.classList.remove("warning");
    content.classList.remove("warning");
    
  }, 1600);
}

//Display stories to the screen
const showStories = (stories) =>{
    var ul = document.createElement("ul");
    for(let story of stories){
        let li = document.createElement("li"); li.innerHTML =                    
                    '<div class="flex-grid">'+
                          '<div class="col2">'+

                            '<div class="flex-grid">'+
                                '<label class="col2 form-control">'+
                                    '<input type="checkbox" name="checkbox-checked" onChange="bookmark(\'' + story.id + '\')"  '+(story.bookmarked ? 'checked' : '')+' />'+
                                        
                                '</label>'+

                                '<div class="col2" onclick="showStory(\'' + story.id + '\')">'+
                                    story.title+
                                    '<br />'+
                                    '<span class="date-label" id="datet">'+story.date+'</span>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                          '<div class="col2">'+

                            '<div class="flex-grid">'+
                          '<div class="col2">'+
                           
                                    '<a href="javascript:void(0);" onclick="editForm(\'' + story.id + '\')"  class="delBtn" ><img src="./assets/edit.jpg" class="imgBtn"  alt="Delete"/></button>'+
                             
                          '</div>'+
                                
                                '<div class="col2">'+
                                    '<a href="javascript:void(0);" onclick="deleteStory(\'' + story.id + '\')"  class="delBtn" ><img src="./assets/delete-icon-14.jpg" class="imgBtn"  alt="Delete"/></a>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                    '</div>';

        ul.appendChild(li);
    }

    

  document.getElementById("myMenu").appendChild(ul);
    
}

//Search a story
const filterStories = ()=>{

    let filter = document.querySelector('#mySearch').value;
    let stories = document.querySelectorAll('#myMenu li');

    let search = filter.toLowerCase();

    for (let i of stories) {
        let item = i.innerHTML.toLowerCase();
       
      if (item.indexOf(search) == -1) {i.classList.add("hide"); } //add hide class to an item
      else {i.classList.remove("hide");} //remove hide class
    }
}


const editForm = (story_id) => {
  document.querySelector("#myForm").style.display = "block";
  document.querySelector("#addForm").style.display = "none";
  document.querySelector(".story").style.display = "none";

  let title = document.querySelector("#update_title");
  let content = document.querySelector("#update_body");
  let id = document.querySelector("#update_id");
  
  let notes = getDataFromStorage();

  let noteIndex = notes.findIndex((obj => obj.id == story_id));

  title.value = notes[noteIndex].title;
  content.value = notes[noteIndex].content;
  id.value = story_id;
  
}

const deleteStory = (story_id) => {
     let notes = getDataFromStorage();

    notes = notes.filter(function(e) {
      return e.id != story_id;
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    location.reload();
    
}

const updateStory = (event) => {
    event.preventDefault();
    if(event){

        let title = document.getElementById("update_title").value;
        let content = document.getElementById("update_body").value;
        let id = document.getElementById("update_id").value;

          let notes = getDataFromStorage();

          let noteIndex = notes.findIndex((obj => obj.id == id));

          notes[noteIndex].title = title;
          notes[noteIndex].content = content;

          localStorage.setItem("notes", JSON.stringify(notes));

          location.reload();
    }
}

const showStory = (id) => {
      document.querySelector("#myForm").style.display = "none";
      document.querySelector("#addForm").style.display = "none";
      document.querySelector(".story").style.display = "block";

      let notes = getDataFromStorage();
      let noteIndex = notes.findIndex((obj => obj.id == id));


      document.querySelector("#story_title").innerHTML = notes[noteIndex].title;
      document.querySelector("#story_content").innerHTML = notes[noteIndex].content;
      document.querySelector("#story_date").innerHTML = notes[noteIndex].date;
}


const bookmark = (story_id)=>{
 

    let notes = getDataFromStorage();
    let myNote = []

    let noteIndex = notes.findIndex((obj => obj.id == story_id));
    
    notes[noteIndex].bookmarked = !notes[noteIndex].bookmarked;


    localStorage.setItem("notes", JSON.stringify(notes));

}

const deleteStories = (e) => {
    localStorage.removeItem("notes")
    location.reload();
}




