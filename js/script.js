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

const itemsPerPage = 10;
const students = document.getElementsByClassName("student-list")[0].getElementsByClassName("student-item");


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

const showPage = (list, page) => {
   const isOnPage = (index) => {
      const firstIndex = (itemsPerPage * (page - 1)) + 1;
      const lastIndex = firstIndex + itemsPerPage - 1;
      return (index >= firstIndex) && (index <= lastIndex);
   }

   for (i = 0; i < list.length; i++) {
      const isHidden = (list[i].style.display === "none");
      if (!isOnPage(i) && !isHidden) {       //if this student is not on the page, and isnt hidden
            list[i].style.display = "none";
      } else if(isOnPage(i) && isHidden) {   //if the student is on the page, and is currently hidden
         list[i].style.display = "inline";
      }
   }
}

//showPage(students, 6);



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
   

}



// Remember to delete the comments that came with this file, and replace them with your own code comments.