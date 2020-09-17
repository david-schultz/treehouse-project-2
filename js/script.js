/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const studentList = document.getElementsByClassName("student-list")[0].getElementsByClassName("student-item");
const itemsPerPage = 10;



/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

  //list: represents the list of Students
  //page: represents the current page number
const showPage = (list, page) => {
  let endIndex = page * itemsPerPage;
  let startIndex = endIndex - itemsPerPage;

  for(let i = 0; i < list.length; i++) {
    let listItem = list[i];
    listItem.style.display = "none";
    if(i >= startIndex && i < endIndex) {
      listItem.style.display = "block";
    }
  }
};

//showPage(studentList, 1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/




const appendPageLinks = (list) => {
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination";
  const ul = document.createElement("ul");
  paginationDiv.appendChild(ul);
  const pageCount = Math.ceil(list.length / itemsPerPage);
  for (let i = 1; i <= pageCount; i++) {
    ul.appendChild(createLI(i));
  }
  showPage(list, 1);

  ul.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        console.log("you have clicked: " + e.target.textContent);
        for (let i = 0; i < pageCount; i++) {
          ul.children[i].children[0].className = "";
        }
        e.target.className = "active";
        showPage(list, e.target.textContent);
      }
  });

  const docElement = document.getElementsByClassName("page")[0];
  docElement.appendChild(paginationDiv);
};

const createLI = (page) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = page;
  if(page === 1) {
    a.className = "active";
  }
  li.appendChild(a);
  return li;
};

appendPageLinks(studentList);


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/



const appendSearchBar = () => {
  const pageHeader = document.getElementsByClassName("page-header")[0];
  const searchDiv = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");
  searchDiv.appendChild(input);
  searchDiv.appendChild(button);

  searchDiv.className = "student-search";
  input.setAttribute("placeholder", "Search for students...");
  button.textContent = "Search";

  button.addEventListener("click", () => {
    const inputtedText = input.value;
    toggleFilter(inputtedText);
  });

  pageHeader.appendChild(searchDiv);
};


const getFilteredList = (list, name) => {
  const filteredList = [];

  for (let i = 0; i < list.length; i++) {
    const student = list.children[i];
    const studentName = student.children[1].textContent.toLowerCase();
    if (studentName.includes(name.toLowerCase())) {
      filteredList.push(student);
    }
  }

  return filteredList;
};

const toggleFilter = (list, name) => {

};









appendSearchBar();




// Remember to delete the comments that came with this file, and replace them with your own code comments.
