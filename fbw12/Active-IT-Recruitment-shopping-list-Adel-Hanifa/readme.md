Active IT Recruitment || Adel Hanifa || Shopping List

********************************************************************************************************************

The task:
"Create a grocery shopping list. You can add items in the frontend. This data is stored in the backend. The list shows the items. You can create new items, you can delete items and you can modify items. So, if you want to change "tomaeteos" (misspelled) to "tomatoes", you can. All updated are stored in backend."

Advanced bonus task:
"Add a priority number to each item on the list, for example between 1 and 5, and the priority items appear first on the list but after they are checked as done (or already bought) they will go to the bottom of the list."

********************************************************************************************************************

 about my code: 
 - to run the code just follow:
 
 1- Download the code
 2- open the folder in Visual Studio
 3- write in the Terminal "npm init" & "npm i" to install all node_modules and package-lock
 4- chande the value of the variables "dataBaseLink,port" in server.js
 5- write in the Terminal "npm start" to run the server

 - in test screenshot I added 3 pictures :
         * Database
         * Browser in Desktop
         * Browser in Mobile phone

 - I used one collection in the DataBase for the Items.
 - Because I don't have a lot of routs I puted all the routs in the server.js without using (router or controler).
 - when the page run for the first time and the DataBase is empty this message will see: 
      "You don't have any items in the list  Please enter a new item using the form above". 
      
 - Using the form on the top of the card enter item name and click enter than item will added to DataBase.
 - each item has 4 options (Important, Done, Edit, Delete) the options will apear when hover the item.
         * Imporent: to make the Item important and display it on the top of the list.
         * Done: to make the Item as done (bought) and display it on the bottom of the list.
         * Edit: to call the Item and edit it using Ajax.
         * Delete: To delete the Item from the DataBase.

 - in the card footer we see how many items left (need to buy) using "registerHelper".
 - I tried to but comment for all parts of the code.
 - I hope i did all the parts you needed.
 - I hope you like it. 
