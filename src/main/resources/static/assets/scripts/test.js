//$(document).ready(started);

// instead of started .. and mostly done ...

var baseUrl = "http://localhost:8080/api"

function showOurRooms() {

     $.ajax({
                    // waar moet hij de request op uitvoeren
                    url : baseUrl+"/rooms",
                    // type actie
                    type : "get", // zelfde commandos als in rest controller?
                    // als de actie lukt, voer deze functie uit
                    success: function(data){ // so the data is the bulb of the response of the Spring Boot REST controller

                    	roomList = "";

                    	$.each(data, function(index, current){ // index (the index starting from 0, current: the current object of the iterable

                    		roomList += createRoomString(current);

                    	});

                    	$("#roomList").html(roomList);
                    }
                });


}

function createRoomString(room) {
 result = "<table><tr><td>id "+room.roomID+"</td><td>number "+room.roomNumber+"</td><td>guests "+room.numberOfGuests+"</td><td>price "+room.price+"</td><td>reserved "+room.reserved+"</td></tr></table>";

  return result;
}

$("#addButton").click(function() {

            var jsonObject = {
                roomNumber: $("#roomNumber").val(),
                numberOfGuests: $("#numberOfGuests").val(),
                price: Number($("#price").val())

            };
             $.ajax({
                    contentType : "application/json",
                     // waar moet hij de request op uitvoeren
                     url : baseUrl+"/rooms",
                     // type actie
                     type : "post",
                     data: JSON.stringify(jsonObject),
                     // als de actie lukt, voer deze functie uit

                 });
          });


$("#deleteButton").click(function() {
            var roomID = Number($("#roomToDelete").val())

             $.ajax({
                    contentType : "application/json",
                     // waar moet hij de request op uitvoeren
                     url : baseUrl+"/rooms/" + roomID,
                     // type actie
                     type : "delete",

                     // als de actie lukt, voer deze functie uit

                 });
          });


$("#updateButton").click(function() {

            var roomID = Number($("#roomToUpdate").val())

            var jsonObject = {
                roomNumber: $("#updateRoomNumber").val(),
                numberOfGuests: $("#updateNumberOfGuests").val(),
                price: Number($("#updatePrice").val())

            };
             $.ajax({
                    contentType : "application/json",
                     // waar moet hij de request op uitvoeren
                     url : baseUrl+"/rooms/" + roomID,
                     // type actie
                     type : "put",
                     data: JSON.stringify(jsonObject),
                     // als de actie lukt, voer deze functie uit

                 });
          });



