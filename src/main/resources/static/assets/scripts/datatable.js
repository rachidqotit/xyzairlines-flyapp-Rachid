$(document).ready(function() {

        $('#guestTable').DataTable( {
                "order": [[ 0, "asc" ]],
                "ajax": {
                        url: 'http://localhost:8080/api/persons',
                        dataSrc: ''
                    },
                "columns": [
                    { "data": "lastName" },
                    { "data": "firstName" },
                    { "data": "yearOfBirth" }
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
                apiGetSingleGuest(data.id);
                $('#myModal').modal('toggle');
            }
        });

} );

function getData() {
      var api = "http://localhost:8080/api/persons";
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

// Get the data of a guest using an id
function apiGetSingleGuest(id){
    var api = "http://localhost:8080/api/persons/" + id;
    $.get(api, function(data){
        if (data){
            fillUpdateDiv(data);
        }
    });
}

// Fill the form with guestdata when updating the guest
function fillUpdateDiv(guest){

    console.log(guest);
    $("#btndelete").attr('onclick', 'submitDelete(' + guest.id + ');');
    $("#btnsubmit").attr('onclick', 'submitEdit(' + guest.id + ');');
    document.getElementById("modal-title").innerHTML="Edit Guest";
    $("#firstName").val(guest.firstName);
    $("#lastName").val(guest.lastName);
    $("#address").val(guest.address);
     /*
    $("#postalCode").val(guest.postalCode);
    $("#city").val(guest.city);
    $("#country").val(guest.country);
    $("#phoneNumber").val(guest.phoneNumber);
    $("#mailAddress").val(guest.mailAddress);
    */
    $("#confirmbutton").css('display', 'inline-block');
    deleteID = guest.id;
    var elem = '<button type="button" class="btn btn-danger" onclick="submitDelete();">Confirm delete</button>';
    $('#confirmbutton').popover({
        animation:true,
        content:elem,
        html:true,
        container: myModal
    });
}

// Deselect all items in the table
function deselect(){
    $('#guestTable tr.selected').removeClass('selected');
    // rloman dit moet straks terug. ik denk dat dit het modal form is
    document.getElementById("guestForm").reset();
}

// Submit the edited data in the form to the database
function submitEdit(id){
// shortcut for filling the formData as a JavaScript object with the fields in the form
    console.log("Formdata");
    var formData = $("#guestForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
    console.log(formData);
    var guestNumber = id;
    for(var key in formData){
        if(formData[key] == "" || formData == null) delete formData[key];
    }
    $.ajax({
        url:"/api/persons/" + guestNumber,
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

// Delete the guest in the database with the corresponding id
function submitDelete(){
    console.log("Deleting");
    var formData = $("#guestForm").serializeArray().reduce(function(result, object){ result[object.name] = object.value; return result}, {});
    var guestNumber = deleteID;
    $.ajax({
        url:"/api/persons/" + guestNumber,
        type:"delete",
        data: JSON.stringify(formData),
        success: getData,
        contentType: "application/json; charset=utf-8"
    });

    $('#myModal').modal('toggle');
    deselect();
}