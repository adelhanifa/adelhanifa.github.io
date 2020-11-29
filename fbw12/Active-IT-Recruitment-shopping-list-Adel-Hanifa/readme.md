Active IT Recruitment || Adel Hanifa || Shopping List

********************************************************************************************************************

The task:
"Create a grocery shopping list. You can add items in the frontend. This data is stored in the backend. The list shows the items. You can create new items, you can delete items and you can modify items. So, if you want to change "tomaeteos" (misspelled) to "tomatoes", you can. All updated are stored in backend."

Advanced bonus task:
"Add a priority number to each item on the list, for example between 1 and 5, and the priority items appear first on the list but after they are checked as done (or already bought) they will go to the bottom of the list."

********************************************************************************************************************

 about my code: 
1- to run the code just follow:
 - Download the code
 - open the folder in Visual Studio
 - write in the Terminal "npm init" & "npm i" to install all node_modules and package-lock
 - chande the value of the variables "dataBaseLink,port" in server.js
 - write in the Terminal "npm start" to run the server

2- in test screenshot I added 3 pictures :
         * Database
         * Browser in Desktop
         * Browser in Mobile phone

3- I used one collection in the DataBase for the Items.
4- Because I don't have a lot of routs I puted all the routs in the server.js without using (router or controler).
5- when the page run for the first time and the DataBase is empty this message will see: 
      "You don't have any items in the list  Please enter a new item using the form above". 
      
6- Using the form on the top of the card enter item name and click enter than item will added to DataBase.
7- each item has 4 options (Important, Done, Edit, Delete) the options will apear when hover the item.
         * Imporent: to make the Item important and display it on the top of the list.
         * Done: to make the Item as done (bought) and display it on the bottom of the list.
         * Edit: to call the Item and edit it using Ajax.
         * Delete: To delete the Item from the DataBase.

8- in the card footer we see how many items left (need to buy) using "registerHelper".
9- I tried to but comment for all parts of the code.
10- I hope i did all the parts you needed.
11- I hope you like it. 
