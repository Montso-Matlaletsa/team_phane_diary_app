
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