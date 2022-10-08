# Web Programming HW#3
## Basic Requirements
### Layout
As long as there are no TODO items, the ***display_none*** class will be added to \<ul class="todo-app__list" id="todo-list"> and \<footer class="todo-app__footer" id="todo-footer">, which set their visibility to hidden.
### Add TODO item
Once user types in some text and presses enter, a new item will be added to the bottom of \<ul class="todo-app__list" id="todo-list">.
### Checkbox
Clicking checkbox of an uncompleted item will turn its color to green, and 'style="text-decoration: line-through; opacity: 0.5;"' will be added to \<h1 class="todo-app__item-detail">. On the otherhand, clicking checkbox of a completed item will turn its color back to gray and remove the style applied to \<h1>.
### Item left
If the number of TODO items > 0, the footer will be visible and shows the number of uncompleted TODO items.
## Advance Requirements
### Remove item
Clicking the 'X' button will remove the corresponding \<li class="todo-app__item">. Also, the number display on the button left will decrease by one.
### No items left
If all items are removed, the ***display_none*** class will be added to \<ul class="todo-app__list" id="todo-list"> and \<footer class="todo-app__footer" id="todo-footer">.
### All, Active, Completed
Clicking on 'All' button, all the items will be displayed. Clicking on 'Active' button, only items uncompleted will be displayed. Clicking on 'Completed' button, only items completed will be displayed.
### Clear completed
When the number of completed items > 0, the 'Clear completed' button will be visible. Pressing it can delete all the completed items.
