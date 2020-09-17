/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/***
  Global Variables
***/
const studentList = document.getElementsByClassName("student-list")[0].getElementsByClassName("student-item");
const itemsPerPage = 10;

/***
  Page set-up
***/

// creates an h3 element which says "No results found."
// and appends it to the end of the page.
//
// initializes the h3 element w/ display: none
const appendNoResults = () => {
  const h3 = document.createElement("h3");
  h3.textContent = "No results found.";
  h3.className = "no-results-text";
  h3.style.display = "none";

  const docElement = document.getElementsByClassName("page")[0];
  docElement.appendChild(h3);
}

/***
  Showing & Clearing the page
***/

// given a list of students and a page number, changes the
// display property of a set of students to "block", while
// changing the rest of the students' display property to "none".
const showPage = (list, page) => {
  clearPage();
  const endIndex = page * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const docElement = document.getElementsByClassName("page")[0];
  const noResultsText = docElement.getElementsByClassName("no-results-text")[0];
  noResultsText.style.display = "none";

  if (list.length === 0) {
    noResultsText.style.display = "block";
    return;
  }

  let i = startIndex;
  while (i < endIndex && i < list.length) {
      const listItem = list[i];
      listItem.style.display = "block";
      i++;
  }
};

// changes the display property of every student in the global list to "none"
const clearPage = () => {
  for(let i = 0; i < studentList.length; i++) {
    const listItem = studentList[i];
    listItem.style.display = "none";
  }
};

/***
  Pagination
***/

// given a list of students, determines how many pages are needed
// to display all students, and appends pagination links needed for each page.
//
// the appended pagination div will handle click events and call showPage()
// based on the clicked link.
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

// given a page number, creates a pagination link with the textContent
// equaling the page number.
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

// removes the pagination div from the document.
const removePageLinks = () => {
  const docElement = document.getElementsByClassName("page")[0];
  const paginationDiv = docElement.getElementsByClassName("pagination")[0];
  docElement.removeChild(paginationDiv);
};

/***
  Search Bar
***/

// creates a search bar div, with an input and button element, and append it
// to the document.
//
// the button has a listener for the click event, upon which it takes the
// input's value and filters the student by that value.
//
// if the resulting filtered list requires multiple pages to display,
// it replaces the page's pagination links with new ones, to meet the new list'
// requirements.
//
// if the resulting filtered list is empty, the page will display "No results found."
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
    console.log("button clicked. filtering for \"" + input.value + "\"");
    toggleFilter(studentList, inputtedText);
  });

  pageHeader.appendChild(searchDiv);
};

/***
  Search Bar Filtering
***/

// takes a list of students and a name, and returns a list of students,
// filtered by the given name.
const getFilteredList = (list, name) => {
  const filteredList = [];

  for (let i = 0; i < list.length; i++) {
    const student = list[i];
    const studentName = student.children[0].children[1].textContent.toLowerCase();
    if (studentName.includes(name.toLowerCase())) {
      filteredList.push(student);
    }
  }
  return filteredList;
};


// given a list of students and a name, displays a filtered list of students
// by the given name.
//
// if there are already pagination links on the document, it removes and replaces
// them with new links, to meet the filtered list of students' page requirements.
const toggleFilter = (list, name) => {
  console.log("filtering by " + name);
  removePageLinks();
  const filteredList = getFilteredList(list, name);
  showPage(filteredList, 1);
  appendPageLinks(filteredList);

};

/***
  Running Functions
***/
appendNoResults();
appendPageLinks(studentList);
appendSearchBar();
