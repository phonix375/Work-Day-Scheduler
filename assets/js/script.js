//convert all current events in the calender to objects and save them to local storage
var saveToLocalStorage = function(){
  var arr = []
  $('.hour').each(function(){
    //convert to object to save in local storage
    var value = $(this).find('span').text().trim();
    var id  = $(this).data().hourId;
    console.log('here');
    console.log(value,id);
    //convert to object
    arr.push({
      'value' : value,
      'time' : id
    });
  });
  localStorage.setItem("dayTasks",JSON.stringify(arr));
}

//update the classes on every time block to represent past present or future
var checkCurrentHour = function(){
  var hourNow = parseInt(moment().format('H'));

  //loop over the time blocks and add the class
  $('.hour').each(function(){
    $(this).removeClass('past')
    .removeClass('present')
    .removeClass('future')
    if(parseInt($(this).data().hourId)  < hourNow){
      $(this).addClass('past');
    }
    else if(parseInt($(this).data().hourId)  === hourNow){
      $(this).addClass('present');
    }
    else{
      $(this).addClass('future');
    }
  });


};

//when first application load, create all the time block and pull data from local storage 
var inisialRender = function(){
  $( function() {
    $( "#calendar" ).datepicker();
  } );

var heading = $('<span>');
$(heading).addClass('headerDate')
.text(moment().format('MMM DD'));

var day = $('<p>').addClass('headerDay')
.text(moment().format('dddd'));

$(heading).append(day);

$('.header-main-date').append(heading);
var tasks = JSON.parse(localStorage.getItem('dayTasks'));
for(var i = 0; i<24;i++){
  var row = $('<div>').addClass('row');
  var column = $('<div>')
  .addClass('col-1 d-flex justify-content-center align-items-center');

  var span = $('<span>')
  .addClass('hoursLabel');

  if(i<10){
    span.text(`0${i}:00`);
  }
  else{
    span.text(i+':00');
  }
  var column2 = $('<div>').addClass(`col-11 hour`)
  .attr('data-hour-id', i);
  var span2 = $('<span>');
  if(tasks){
    span2.text(tasks[i].value);
  }
  
  $(column2).append(span2);



  column.append(span);
  row.append(column);
  row.append(column2);
$('main').append(row);
};
//check the hour now 
checkCurrentHour();
};

inisialRender();

//for every time block create on click function to create an input and handel brur and save event 
$('.hour').each(function(){
  $(this).click(function(){
  var oldValue = $(this).find('span').text();
   var input = $('<input>').attr('type','text')
   .addClass('taskInput')
   .attr('placeholder','type your task here');
   if(oldValue !== undefined){
    $(input).val(oldValue);
   }
   $(this).html('');
   $(input).on('blur',function(){
     var value = $(input).val().trim();
     var span = $('<span>').text(value);
     input.replaceWith(span);
     saveToLocalStorage();
     $('.btn-secondary').remove();
   })
   var saveBtn = $('<button>').addClass('btn btn-secondary').html('<span class="oi oi-check"></span>');
   $(saveBtn).on('click',function(){
    var value = $(input).val().trim();
    var span = $('<span>').text(value);
    input.replaceWith(span);
    saveToLocalStorage();
    $('.btn-secondary').remove();
   })
    $(this).append(input);
    $(this).append(saveBtn);
    $(input).focus();
  });
});

// check every minute to see if the current time is a new hour the change the color code on time blocks
setInterval(function(){
checkCurrentHour()
},60000)