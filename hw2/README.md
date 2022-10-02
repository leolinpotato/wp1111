# Web Programming HW#2
## Basic Requirements
### Leave
Add a leave call button at each user's window
### Pin
Add eventListener on each side_bar. Once it is clicked, the corresponding user will be pinned and the originally pinned user will be unpinned. If there is no user being pinned, clicking the side_bar will pin the corresponding user.
### Unpin
Add eventListener on the main_bar. Once it is clicked, the pinned user will be unpinned.
### Full Screen Mode
If no user being pinned, I add a hidden class to main window with ***display: "none"***, and add full_screen class to side window to make its ***width: 100%*** and update blocks' layout.
If all the other users are remove from the meeting, the full_screen class will be added to main window to make its ***width: 100%***, which means I will fill up the whole screen.
## Advanced Requirement
### Initial User Num
Using ***prompt*** to ask user input the initial user num, ranging from 1 to 15. My original html code include six users. If user num > 6, I use a for loop to create new users. If user num < 6, I use a for loop to remove users instead.
### Window Size
I alter the window size dynamically with respect to user num.
### Add User
I place an add user button on the right footer. Once it is clicked, the ***prompt*** function will pop up a question asking new user's name at first, and pop up another question asking new user's img url after the first question is answered. Afterward, a new user will be placed on the side window.
### Time
Using ***Date()*** object with ***getHours()***, ***getMinutes()*** function to update current time.
## Other function
### User Num
The number above the ***show everyone*** button will be the same as current user num.
