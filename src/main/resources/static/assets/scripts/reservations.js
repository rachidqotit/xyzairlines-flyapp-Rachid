var baseUrl = "http://localhost:8080/api/reservations"

$(document).ready(function() {

        $('#dataTable').DataTable( {
                "order": [[ 0, "asc" ]],
                "ajax": {
                        url: baseUrl,
                        dataSrc: ''
                    },
                "columns": [
                    { "data": "guests" },
                    { "data": "rooms" },
                    { "data": "checkInDate" },
                    {"data": "checkOutDate"},
                    {"data": "comments"}

                ]
         } );


    // Functionality for interaction when clicking on rows of the table (MODAL in HTML)
        $('#dataTable tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                deselect();
                $(this).addClass('selected');
                var table = $('#dataTable').DataTable();
                var data = table.row(this).data();
                apiGetSingleReservation(data.ReservationID);
                $('#myModal').modal('toggle');
            }
        });

} );



$("#addReservation").click(function() {

            var jsonObject = {
                guests: $("#guests").val(),
                rooms: $("#rooms").val(),
                checkInDate: Number($("#checkInDate").val(),
                checkOutDate: $("#checkOutDate").val(),
                comments: $("#comments").val()


            };




             $.ajax({
                    contentType : "application/json",
                     // waar moet hij de request op uitvoeren
                     url : baseUrl,
                     // type actie
                     type : "post",
                     data: JSON.stringify(jsonObject),
                     // als de actie lukt, voer deze functie uit

                 });

                 location.reload();
          });


     function apiGetSingleReservation(id){
         var api = baseUrl + "/" + id;
         $.get(api, function(data){
             if (data){
                 fillUpdateDiv(data);
             }
         });
     }

function fillUpdateDiv(reservation){

    console.log(reservation);
    $("#btndelete").attr('onclick', 'submitDelete(' + reservation.ReservationID + ');');
    $("#btnsubmit").attr('onclick', 'submitEdit(' + reservation.ReservationID + ');');
    document.getElementById("modal-title").innerHTML="Edit Reservation";
    $("#modalGuests").val(reservation.guests);
    $("#modalRooms").val(reservation.rooms);
    $("#modalCheckInDate").val(reservation.checkInDate);
    $("#modalCheckOutDate").val(reservation.checkOutDate);
    $("#modalComments").val(reservation.comments);

    $("#confirmbutton").css('display', 'inline-block');
    deleteID = reservation.ReservationID;
    var elem = '<button type="button" class="btn btn-danger" onclick="submitDelete();">Confirm delete</button>';
    $('#confirmbutton').popover({
        animation:true,
        content:elem,
        html:true,
        container: myModal
    });
}

function deselect(){
    $('#dataTable tr.selected').removeClass('selected');
    // rloman dit moet straks terug. ik denk dat dit het modal form is
    document.getElementById("reservationForm").reset();
}


function submitEdit(id){
// shortcut for filling the formData as a JavaScript object with the fields in the form
    console.log("Formdata");
    var formData = $("#reservationForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
    console.log(formData);

    for(var key in formData){
        if(formData[key] == "" || formData == null) delete formData[key];
    }
    $.ajax({
        url:baseUrl +"/" + id,
        type:"put",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        success: getData,
        error: function(error){
            displayError(error);
        }
    });
    deselect();
    $('#myModal').modal('toggle');
}


function getData() {
      var api = baseUrl;
        $.get(api, function(data){
            if (data){
                setData(data);
            }
        });
}

function setData(data){
    $("#dataTable").DataTable().clear();
    $("#dataTable").DataTable().rows.add(data);
    $("#dataTable").DataTable().columns.adjust().draw();
}

function submitDelete(){
    console.log("Deleting");
    var formData = $("#reservationForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
    var reservationNumber = deleteID;
    $.ajax({
        url:baseUrl + "/" + reservationNumber,
        type:"delete",
        data: JSON.stringify(formData),
        success: getData,
        contentType: "application/json; charset=utf-8"
    });

    $('#myModal').modal('toggle');
    deselect();
}

