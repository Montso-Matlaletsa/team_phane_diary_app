

window.onload = () =>{
    showStories(getStories());
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

//Create and store stories to the localhost
const store = (event) =>{
    event.preventDefault();
    let title = document.querySelector('#title').value;
    let date = document.querySelector('#date').value;
    let body = document.querySelector('#body').value;

  let id = title +Math.floor((Math.random() * 1000) + 1);
  console.log(id);

    let details = 
        {
            id: id,
            title: title,
            date: date,
            body: body
        }
    ;

    localStorage.setItem(id, JSON.stringify(details));
    resetForm()
    location.reload();
}



//get the stories from localstorage
const getStories = () => {
    let stories = [];

    for (var key in localStorage){
    

        if(JSON.parse(localStorage.getItem(key)) === null){
            
        }else{
            stories.push(JSON.parse(localStorage.getItem(key)))
        }
    }

    return stories;
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

const resetForm = () =>{
    let title = document.querySelector('#title');
    let date = document.querySelector('#date');
    let body = document.querySelector('#body');

    title.value = '';
    body.value = '';
    date.value = ''
}


  