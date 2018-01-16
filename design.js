

//Updates number of active items
function updateCounter() {
    var tasksNumber = $("#tasks input:not(:checked)").length;
    if(tasksNumber>0) {
        $(".count span").text(tasksNumber);
    } else {
        $(".count span").text('');
    }   
}

//Creates app form
$("#newTaskForm").on("submit", function(event) {
  //Prevent default reloding the website
  event.preventDefault();

  //Get the value of new task
  var newTask = $("#newTask").val();
  var minLength = 3;

  //Validates the correct number of characters in the text input
  if (newTask.length < minLength) {
    alert("Your task must have at least " + minLength + " characters");
    return;
  }

  //Creates new task with checkbox and trash icon
  var checkbox = '<div class="center"><label class="label"><input  class="label__checkbox" type="checkbox" /><span class="label__text"><span class="label__check"><i class="fa fa-check icon"></i></span></span></label></div>';
  var removeTask = '<div class="remove"><a href"#" class="button_delete"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div>';

  $("#tasks").append("<li>" + checkbox + newTask + removeTask + "</li>");
  $("#newTaskForm")[0].reset();

  updateCounter();

  //Deletes chosen task
  $(".button_delete").click(function(e) {
    e.preventDefault();
    console.log($(this));
    if(confirm('Are you sure you want to delete this item? There is no turning back after that.')) {
      var task = $(this).parent().parent();
      task.toggle("slide", function() {
        task.remove();
        updateCounter();
      });
    }
  });

});

//Adds all checked items to the list "Completed"
$(function() {
  $("#tasks").change(function() {
    $("#tasks input:checked").parent().parent().parent().addClass("completedTask");
    $("#tasks input:not(:checked)").parent().parent().parent().removeClass("completedTask");
    updateCounter();
  });
})

//When user clicks button "All", filtes tasks and shows all tasks
$("#All").click(function() {
  $("#tasks li").each(function() {
    $(this).show();
  });
   $("#clearCompleted").prop("disabled", false);
});

//When user clicks button "Active", filtes tasks and shows only active tasks
$("#Active").click(function() {
  $("#tasks input:checked").each(function() {
    $(this).parent().parent().parent().hide();
  });
  $("#tasks input:not(:checked)").each(function() {
    $(this).parent().parent().parent().show();
  });
  $("#clearCompleted").prop("disabled", true);
});

//When user clicks button "Completed", filtes tasks and shows only checked tasks
$("#Completed").click(function() {
  $("#tasks input:checked").each(function() {
    $(this).parent().parent().parent().show();
  });
  $("#tasks input:not(:checked)").each(function() {
    $(this).parent().parent().parent().hide();
  });
  $("#clearCompleted").prop("disabled", false);
});

//Deletes all checked task 
$("#clearCompleted").click(function() {

  //Checking users choise
  if(confirm('Are you sure you want to delete all the items in the list? There is no turning back after that.'))
  $("#tasks input:checked").each(function() {
    var allTask = $(this).parent().parent().parent();
    allTask.toggle("slide", function() {
      allTask.remove();
    });
  });
  $("#clearCompleted").prop("disabled", false);

});

