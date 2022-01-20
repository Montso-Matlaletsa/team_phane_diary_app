const colListDiv = document.querySelector(".my-form");

window.onload = () =>{
    showStories(getStories());
}

let col1ID = 1;//benji
function colID(id, title, date, body){
    this.id = id; // a function once defined can be invoked for different objects using the (this as the keyword)
    this.title = title;
    this.date = date;
    this.body = body;//benji you just added this
}

 // moved the window function above col1ID

 //get item from storage (Benji)

function getDataFromStorage(){
    return localStorage.getItem("col1") ? JSON.parse(localStorage.getItem("col1")) : [];
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




//Create and store stories to the localhost(Montso)
//const store = (event) =>{
  //  event.preventDefault();
  //  let title = document.querySelector('#title').value;
  //  let date = document.querySelector('#date').value;
  //  let body = document.querySelector('#body').value;

 // let id = title +Math.floor((Math.random() * 1000) + 1);
 // console.log(id);

 //   let details = 
      //  {
      //      id: id,
      //      title: title,
      //      date: date,
      //      body: body
    //    }
  //  ;

   // localStorage.setItem(id, JSON.stringify(details));
   // resetForm()
  //  location.reload();
//}

// add a new story(note) in the list benji

function store(){
    const col1Title = document.getElementById("title");
    const col1Body = document.getElementById("body");
    const col1Date = document.getElementById("Date");

    if(validateInput(col1Title, col1Body, col1Date)){
      let col1 = getDataFromStorage();
      
      let noteItem = new Note(col1ID, col1Title.value, col1Body.value, col1Date);
      col1ID++;
      col1.push(formItem);
      createstore(formItem);
      
      // saving in the local storage 
      
      localStorage.setItem("store", JSON.stringify(store));
      col1Title.value = "";
      col1Body.value = "";
      col1Date.value = "";
      
      
    }
    
  }


//get the stories from localstorage
//const getStories = () => {
   // let stories = [];

   // for (var key in localStorage){
    

   //     if(JSON.parse(localStorage.getItem(key)) === null){
            
    //    }else{
    //        stories.push(JSON.parse(localStorage.getItem(key)))
    //    }
  //  }

  //  return stories;
//}


//Display stories to the screen
const showStories = (stories) =>{
    var ul = document.createElement("ul");
    for(let story of stories){
        let li = document.createElement("li"); li.innerHTML =                    
                    '<div class="flex-grid">'+
                          '<div class="col2">'+

                            '<div class="flex-grid">'+
                                '<label class="col2 form-control">'+
                                    '<input type="checkbox" name="checkbox-checked"  />'+
                                        
                                '</label>'+

                                '<div class="col2">'+
                                    story.title+
                                '</div>'+
                            '</div>'+
                          '</div>'+

                          '<div class="col2">'+
                              '<a id="d" onclick="deleteS()" value="'+story.id+'" class="delBtn" ><img src="./assets/delete-icon-14.jpg" class="imgBtn"  alt="Delete"/></a>'+
                          '</div>'+
                    '</div>';

                    console.log(story.id)

        ul.appendChild(li);
    }

document.getElementById("myMenu").appendChild(ul);
    
}

//delete a  story
const deleteS = () =>{
    let a = '';
     a = document.getElementById('d').value;
   
    console.log(a);
}

let resetForm = () =>{
    let title = document.querySelector('#title');
    let date = document.querySelector('#date');
    let body = document.querySelector('#body');

    title.value = '';
    body.value = '';
    date.value = ''
}


// delete all stories 
function deletesAll(){
  localStorage.removeItem("resetForm");
  let colList = document.querySelectorAll(".col");
  if(colList.length > 0){
    colList.forEach(item => {
      noteListDiv.removeChild(item);
    });
  }
  col1ID = 1 //resetting storeID to 1
}

// Function to Edit the Note(story)
function store() {
    let store = localStorage.getItem("store");
    let title = document.getElementById("title");
    let  body = document.getElementById("body");
    let  date = document.getElementById("date");


    if (addTitle.value !== "" || addbody.value !== "" || adddate.value !== "" ) {
      return alert("Please clear the form before editing a note")
    } 

    if (store == null) {
      storeObj = [];
    } else {
      storeObj = JSON.parse(store);
    }
    console.log(storeObj);

    storeObj.findIndex((element, index) => {
      addTitle.value = element.title;
      addTxt.value = element.text;
    })
    storeObj.splice(index, 1);
        localStorage.setItem("store", JSON.stringify(storeObj));
        showNotes();
}


showStore(); 