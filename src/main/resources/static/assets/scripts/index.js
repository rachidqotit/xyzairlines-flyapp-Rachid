//$(document).ready(started);

// instead of started .. and mostly done ...

var baseUrl = "http://localhost:8080/api/"

$(document).ready(function() {
     console.log("Ready ... page loaded");

     $("#testButton").click(function() { // register (more the jQuery way) the function (event handler) to the button
        $("#test").hide();
     });

     $("#addedPerson").hide();

     $("#updateButton").click(function() {
        $.ajax({
                // waar moet hij de request op uitvoeren
                url : baseUrl+"persons",
                // type actie
                type : "get",
                // als de actie lukt, voer deze functie uit
                success: function(data){ // so the data is the bulb of the response of the Spring Boot REST controller

                	guestList = "";

                	$.each(data, function(index, current){ // index (the index starting from 0, current: the current object of the iterable

                		guestList += createGuestString(current);

                	});

                	$("#guestList").html(guestList);
                }
            });
     });

     $("#addButton").click(function() {

            var jsonObject = {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                yearOfBirth: Number($("#yearOfBirth").val())
            };
             $.ajax({
                    contentType : "application/json",
                     // waar moet hij de request op uitvoeren
                     url : baseUrl+"persons",
                     // type actie
                     type : "post",
                     data: JSON.stringify(jsonObject),
                     // als de actie lukt, voer deze functie uit
                     success: function(data){ // so the data is the bulb of the response of the Spring Boot REST controller

                            $("#newId").html(data.id);
                            $("#newFirstName").html(data.firstName);
                            $("#newLastName").html(data.lastName);

                            $("#addedPerson").show(2000);

                            $("#addedPerson").hide(2000);

                          console.log(data);
                     }
                 });
          });
});

function started() {
      console.log("Ready ... page loaded");
}

function hideSome() {

$("p").hide();

}

function createGuestString(guest) {
 result = "<tr><td>"+guest.firstName+"</td><td>"+guest.lastName+"</td><td>"+guest.yearOfBirth+"</td></tr>";

  return result;
}

function hideAllParagraphsWithIntroOrSlot() {

    $("p.intro").hide();
    $("p.slot").hide();

}

function showAll() {
    $("p").show();
}

function toggleEpilog() {
    $("#epilog").toggle();
}

