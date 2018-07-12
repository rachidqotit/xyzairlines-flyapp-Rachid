var baseUrl = "http://localhost:8080/api/guests"


$(document).ready(function() {

        $('#guestTable').DataTable( {
                "order": [[ 0, "asc" ]],
                "ajax": {
                        url: baseUrl,
                        dataSrc: ''
                    },
                "columns": [
//                    { "data": "guestID" },
                    { "data": "firstName" },
                    { "data": "lastName" },
                    { "data": "address" },
                    { "data": "postalCode" },
                    { "data": "city" },
                    { "data": "country" },
                    { "data": "telephoneNumber" },
                    { "data": "emailAddress" },
                    { "data": "passportNumber" }


                ]
         } );


    // Functionality for interaction when clicking on rows of the table
        $('#guestTable tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                deselect();
                $(this).addClass('selected');
                var table = $('#guestTable').DataTable();
                var data = table.row(this).data();
                apiGetSingleGuest(data.guestID);
                $('#guestModal').modal('toggle');
            }
        });

} );

$("#addGuestButton").click(function() {

            var jsonObject = {
                guestID: $("#guestID").val(),
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                address: $("#address").val(),
                postalCode: $("#postalCode").val(),
                city: $("#city").val(),
                country: $("#country").val(),
                telephoneNumber: $("#telephoneNumber").val(),
                emailAddress: $("#emailAddress").val(),
                passportNumber: $("#passportNumber").val()


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
//                 location.reload();
          });


          $("#deleteGuestButton").click(function() {
                      var guestID = Number($("#guestToDelete").val())

                       $.ajax({
                              contentType : "application/json",
                               // waar moet hij de request op uitvoeren
                               url : baseUrl+"/" + guestID,
                               // type actie
                               type : "delete",

                               // als de actie lukt, voer deze functie uit

                           });
                           location.reload();
                    });


                    $("#updateGuestButton").click(function() {

                                var roomID = Number($("#guestToUpdate").val())

                                var jsonObject = {

                                    firstName: $("#updateFirstName").val(),
                                    lastName: $("#updateLastName").val(),
                                    address: $("#updateAddress").val(),
                                    postalCode: $("#updatePostalCode").val(),
                                    city: $("#updateCity").val(),
                                    country: $("#updateCountry").val(),
                                    telephoneNumber: $("#updateTelephoneNumber").val(),
                                    emailAddress: $("#updateEmailAddress").val(),
                                    passportNumber: $("#updatePassportNumber").val()

                                };
                                 $.ajax({
                                        contentType : "application/json",
                                         // waar moet hij de request op uitvoeren
                                         url : baseUrl+"/" + roomID,
                                         // type actie
                                         type : "put",
                                         data: JSON.stringify(jsonObject),
                                         // als de actie lukt, voer deze functie uit

                                     });
                                     location.reload();
                              });

function apiGetSingleGuest(id){
         var api = baseUrl + "/" + id;
         $.get(api, function(data){
             if (data){
                 fillUpdateDiv(data);
             }
         });
     }

function fillUpdateDiv(guest){

    console.log(guest);
    $("#btndelete").attr('onclick', 'submitDelete(' + guest.guestID + ');');
    $("#btnsubmit").attr('onclick', 'submitEdit(' + guest.guestID + ');');
    document.getElementById("modal-title").innerHTML="Edit Guest";
    $("#modalFirstName").val(guest.firstName);
    $("#modalLastName").val(guest.lastName);
    $("#modalAddress").val(guest.address);
    $("#modalPostalCode").val(guest.postalCode);
    $("#modalCity").val(guest.city);
    $("#modalCountry").val(guest.country);
    $("#modalTelephoneNumber").val(guest.telephoneNumber);
    $("#modalEmailAddress").val(guest.emailAddress);
    $("#modalPassportNumber").val(guest.passportNumber);


    $("#confirmbutton").css('display', 'inline-block');
    deleteID = guest.guestID;
    var elem = '<button type="button" class="btn btn-danger" onclick="submitDelete();">Confirm delete</button>';
    $('#confirmbutton').popover({
        animation:true,
        content:elem,
        html:true,
        container: guestModal
    });
}

function deselect(){
    $('#guestTable tr.selected').removeClass('selected');
    // rloman dit moet straks terug. ik denk dat dit het modal form is
    document.getElementById("guestForm").reset();
}


function submitEdit(id){
// shortcut for filling the formData as a JavaScript object with the fields in the form
    console.log("Formdata");
    var formData = $("#guestForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
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
    $('#guestModal').modal('toggle');
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
    $("#guestTable").DataTable().clear();
    $("#guestTable").DataTable().rows.add(data);
    $("#guestTable").DataTable().columns.adjust().draw();
}

function submitDelete(){
    console.log("Deleting");
    var formData = $("#guestForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
    var guestNumber = deleteID;
    $.ajax({
        url:baseUrl + "/" + guestNumber,
        type:"delete",
        data: JSON.stringify(formData),
        success: getData,
        contentType: "application/json; charset=utf-8"
    });

    $('#guestModal').modal('toggle');
    deselect();
}