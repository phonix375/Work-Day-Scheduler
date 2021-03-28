Work Day Scheduler

Application requirements : 

* the current day is displayed at the top of the calendar
	on the left side of the application on large screens, you have the calendar with the current day highlighted, and at the top of the application, you can see the day with a short month name (Mar), date, and the day of the week.
  
  ![alt text](https://github.com/phonix375/Work-Day-Scheduler/blob/main/dateDisplay.PNG?raw=true)

* time blocks for standard day hours
	because everyone has a different work time, the application is generating 24-hour time blocks (it can be modified to present only 9-5 in the initialrender function by changing the for loop to run from i=9 to i<18)

*the time block is color-coded to indicate whether it is in the past, 	present, or future
	the past blocks are marked in gray, the current block is marked in blue and the future blocks don't have the background and I'm running an interval to check this every minute 

*can enter an event on time blocks
	when you click a time block you will be focused on input for this time block

*When clicking the save button event is saved in local storage
	when clicking a time block you have the option to enter the task for this time block, to save this task you have 2 options : 
click anywhere in the app (blur) and the app will save the changes
Click the save button that will appear when you start to edit the block of time

*events persist after page refresh
	all events of this day are saved to local storage

