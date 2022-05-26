var map2;
var marker2 = false;
let geocoder2;
let page = 0;
var enterKeyCountEdit = 0;
var pincodeFlag = true;
$("#overflow-container-list").scroll(function () { //detect page scroll
    var objDiv = document.getElementById("overflow-container-list");
    console.log($(this).scrollTop() + $(this).innerHeight(), $(this)[0].scrollHeight);
    if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) { //if user scrolled from top to bottom of the page

        load_more(page); //load content

    }
});


function load_more(page1) {
    page = page1 + 1;
    var chef_name = $("#filter_chef_name").val();
    var chef_phone = $("#filter_chef_mobile").val();
    var chef_city = $("#filter_chef_city").val();
    var is_active = $("#filter_chef_status").val();
    var filter_chef_title = $("#filter_chef_title").val();



    console.log(chef_name, chef_phone);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + 'chef/search?page=' + page,
        method: "post",
        dataType: 'html',
        data: { chef_name, chef_phone, chef_city,filter_chef_title, is_active },

    }).done(function (data) {

        if (!data) {
            $('#list_end').empty().html("No more records!");
            return;
        }

        $("#chef_lists").append(data); //append data into #results element
        // console.log('data.length');
        $('#list_end').empty().html(`<button type="button" onclick="load_more(${page + 1})" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)
    })
        .fail(function (jqXHR, ajaxOptions, thrownError) {
            alert('No response from server');
        });
}
let del_chef_banner_img = [];
let bnnr_temp_key = [];

const handleAddChefSubmit = () => {
    // console.log('hello')
    event.preventDefault();
    if(!pincodeFlag) { 
        alertServiceFunction("Error", "Invalid Pincode", "error");
        return false;
    }
    let formData = new FormData(document.getElementById('addchefForm'));
    // var cuisine_name = formData.get("cuisine_name");
        $("#add_chef_submit_div").html(
            `<img height="30" width="30"  src="images/spinner.gif" alt="">`
        );

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + 'chef/add',
        type: 'POST',
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            // console.log(data)
            if (data.status == "Success") {
                reset_chef_details();
                user_list();
                loadFristItem_cat()
                $('#addChefModalCloseButton').click();
                alertServiceFunction("Success", data.msg, "success");
                $("#add_chef_submit_div")
                .html(`<button type="submit"onclick="handleAddChefSubmit();"  class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                data-dismiss="modal">Close</button>`);
            }
            else {
                alertServiceFunction("Error", data.msg, "error");
                $("#add_chef_submit_div")
                .html(`<button type="submit" onclick="handleAddChefSubmit();" class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                data-dismiss="modal">Close</button>`);
            }
        //     $("#add_chef_submit_div")
        //     .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
        //  <button type="button" class="btn btn-secondary flex-center btn-sm"
        //     data-dismiss="modal">Close</button>`);
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Add  Chef.", "error");
            $("#add_chef_submit_div")
            .html(`<button type="submit" onclick="handleAddChefSubmit();" class="btn btn-success flex-center btn-sm">Submit</button>
             <button type="button" class="btn btn-secondary flex-center btn-sm"
            data-dismiss="modal">Close</button>`);
        },

    });
}

function reset_filter() {
    $('#filter_chef_name').val('');
    $('#filter_chef_mobile').val('');
    $('#filter_chef_city').val('');
    $("#filter_chef_status").val('');
    $('#filter_chef_title').val('');

    location.reload();
}

function reset_chef_details() {
    $("#addchefForm").get(0).reset();
    $('#count').html('0');
    // console.log("reset all detail from chef form");
}

function handleLoadDetailsChef(ele, id) {
    let allchef = document.getElementsByClassName('remve_Active_color')
    for (let index = 0; index < allchef.length; index++) {
        const element = allchef[index];
        element.style.backgroundImage = "none";
    }
    document.getElementById(`employee_head1_${id}`).style.backgroundImage = "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";
    // console.log(ele,id);5
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "POST",
        url: API_URL + 'chef/single-data',
        dataType: 'html',
        data: { id: id },
        beforeSend: function () {
            $('#chef_detail_container').empty().html(
                `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`
            )
        },
        success: function (data) {
            // console.log(data)
            // $('#detailsChefModalCloseButton').click();

            $('#chef_detail_container').empty().html(data)

        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Get Chef Details.", "error");
        },
    });
};


function handleEditChef(id) {
    // console.log(id)
    let modal = document.getElementById('modal_body_chef')
    modal.innerHTML=`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + 'chef/edit',
        method: "post",
        dataType: 'html',
        data: { id: id },

        success: function (data) {
            // initMap2()
            let res=JSON.parse(data)
            // console.log(res)
            modal.innerHTML = res.html;
            if(res.data.chef_geo_lat!='' && res.data.chef_geo_long !=''){
                let lat=parseFloat(res.data.chef_geo_lat)
                let long=parseFloat( res.data.chef_geo_long)

                // const uluru = { lat: -25.344, lng: 131.036 };
                map2 = new google.maps.Map(document.getElementById("mapEdit"), {
                    zoom: 15,
                    center: { lat:lat , lng:long },
                    mapTypeControl: false,
                });
                marker2 = new google.maps.Marker({
                    position: { lat:lat , lng:long },
                    map: map2,
                    draggable: true
                });
                google.maps.event.addListener(map2, 'click', function(event) {

                    var clickedLocation = event.latLng;

                    if(marker2 === false){

                        marker2 = new google.maps.Marker({
                            position: { lat:lat , lng:long },
                            map: map2,
                            draggable: true
                        });

                        google.maps.event.addListener(marker2, 'dragend', function(event){
                            markerLocation2();
                        });
                    } else{

                        marker2.setPosition(clickedLocation);
                    }

                    markerLocation2();
                });
            }
            else{
                map2 = new google.maps.Map(document.getElementById("mapEdit"), {
                    zoom: 15,
                    center: { lat: 19.0760, lng: 72.8777 },
                    mapTypeControl: false,
                });
                google.maps.event.addListener(map2, 'click', function(event) {

                    var clickedLocation = event.latLng;
                    // console.log(clickedLocation)
                    if(marker2 === false){

                        marker2 = new google.maps.Marker({
                            position: clickedLocation,
                            map: map2,
                            draggable: true
                        });

                        google.maps.event.addListener(marker2, 'dragend', function(event){
                            markerLocation2();
                        });
                    } else{

                        marker2.setPosition(clickedLocation);
                    }

                    markerLocation2();
                });
            }


            //    $('#detailsChefModalCloseButton').click();
            //    $('#editChefModalCloseButton').triger(click();

        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Edit  Chef.", "error");
        },
    });
}
const handleEditChefSubmit = (id) => {
    event.preventDefault();
    if(!pincodeFlag) { 
        alertServiceFunction("Error", "Invalid Pincode", "error");
        return false;
    }
    if($('#chef_start_time_val_edit').text() == $('#chef_end_time_val_edit').text()) {
        alertServiceFunction("Error", "Chef Opening & Closing Time Can't be Same", "error");
        return false;
    }
    //  console.log("hello edit add");
    var form_data = new FormData($("#EditChefForm")[0]);
    form_data.append('chef_id', id)
    if (del_chef_banner_img.length > 0) {
        form_data.append('del_chef_banner_img', del_chef_banner_img.toLocaleString())
        del_chef_banner_img = []
    }
    $("#edit_banner_submit_div").html(
        '<img height="30" width="30"  src="images/spinner.gif" alt=""> '
    );

    $.ajax({
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + 'chef/edit_add',
        type: 'POST',
        data: form_data,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            // console.log(data)
            if (data.status == "Success") {
                reset_chef_details();

                $('#editChefModalCloseButton').click();
                get_single_chef_list(id);
                alertServiceFunction("Success", data.msg, "success");


                setTimeout(() => {
                    handleLoadDetailsChef(null, id);
                }, 800);
                $("#edit_banner_submit_div")
                .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                data-dismiss="modal">Close</button>`);

            }
            else {
                alertServiceFunction("Error", data.msg, "error");
                $("#edit_banner_submit_div")
                .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                data-dismiss="modal">Close</button>`);

            }
        //     $("#edit_banner_submit_div")
        //     .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
        // <button type="button" class="btn btn-secondary flex-center btn-sm"
        //     data-dismiss="modal">Close</button>`);
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Edit  Chef.", "error");
            $("#edit_banner_submit_div")
            .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
            <button type="button" class="btn btn-secondary flex-center btn-sm"
            data-dismiss="modal">Close</button>`);
        },
    });
}

const handleActiveChef = (chef_id, status) => {
    if (status == 0) var action = 'In-Active';
    else var action = 'Active';
    // console.log(cuisine_id)

    swal({
        title: "Are You Sure ?",
        text: "You Want to " + action + "  " + "This Chef",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            if (chef_id) {
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                    },
                    url: API_URL + 'chef/active',
                    method: "post",
                    dataType: 'json',
                    data: { chef_id, status },
                    method: "post",

                    success: function (data) {
                        // console.log(data)
                        if (data.status == 'success') {
                            get_single_chef_list(chef_id);
                            alertServiceFunction("Success", data.msg, "success");
                            // handleLoadDetailsChef(null,chef_id);

                            setTimeout(() => {
                                handleLoadDetailsChef(null, chef_id);
                            }, 800);

                        }
                        else {
                            alertServiceFunction("Error", data.msg, "error");
                        }
                    },
                    error: function (err) {
                        alertServiceFunction("Error", "Failed to Active  Chef.", "error");
                    },
                });
            }
        }
        else {
            // swal("Cancelled", "User status preserved", "warning");
            alertServiceFunction("Cancelled", "Chef status preserved", "warning");
        }
    });
}

const handleDeleteChef = (chef_id, status) => {
    // console.log(cat_id,status)
    if (status == 1) var action = 'Active';
    else var action = 'In-Active';
    // console.log(cuisine_id)

    swal({
        title: "Are You Sure ?",
        text: "You Want to " + action + "  " + "This Chef",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            if (chef_id) {
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                    },
                    url: API_URL + 'chef/delete',
                    method: "post",
                    dataType: 'json',
                    data: { chef_id, status },
                    method: "post",

                    success: function (data) {
                        // console.log(data)
                        if (data.status == 'success') {
                            // user_list();
                            get_single_chef_list(chef_id);
                            alertServiceFunction("Success", data.msg, "success");
                            // handleLoadDetailsChef(null,chef_id);

                            setTimeout(() => {
                                handleLoadDetailsChef(null, chef_id);
                            }, 800);

                        }
                        else {
                            alertServiceFunction("Error", data.msg, "error");
                        }

                    },
                    error: function (err) {
                        alertServiceFunction("Error", "Failed to Delete  Chef.", "error");
                    },
                });
            }
        }
        else {
            // swal("Cancelled", "User status preserved", "warning");
            alertServiceFunction("Cancelled", "Chef status preserved", "warning");
        }
    });

}
function get_single_chef_list(chef_id) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "post",
        url: API_URL + "chef/list",
        data: { chef_id: chef_id },
        success: function (res) {
            $(".employee_head_" + chef_id).empty().html(res);
            // dish_details(user_id);
        },
        error: function (err) {
            // alert("Server did not Responded, Please Contact Administrator.");
            alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
        },
    });
}

function user_list() {
    $(".dropdown-menu").removeClass('show');
    var chef_name = $("#filter_chef_name").val();
    var chef_phone = $("#filter_chef_mobile").val();
    var chef_city = $("#filter_chef_city").val();
    var is_active = $("#filter_chef_status").val();
    var filter_chef_title=$('#filter_chef_title').val();

    $("#list_end").empty();
    $("#chef_lists").empty().html(`<div class="row m-0"><div class="col-md-12 text-center"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait...</p></div></div>`);
    $("#chef_detail_container").empty().html(`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait for Details...</p></div></div>`);

    $.ajax({

        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + 'chef/search',
        method: "post",
        dataType: 'html',
        data: { chef_name, chef_phone, chef_city,filter_chef_title, is_active },

        success: function (data) {
            $("#overflow-container-list").animate({
                scrollTop: 0
            }, 500);
            // console.log(data)
            // if (data !== null && data !== '') {
            //     document.getElementById('chef_lists').innerHTML = data;
            //     loadFristItem_cat()
            //     page = 0
            //     $("#list_end").empty().html(
            //         `  <button type="button" onclick="load_more(1)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>
            //                 `
            //     )
            // }

            // else {
            //     alertServiceFunction("No Match Found", data.msg, "error");
            // }
            if (data.length == 0) {

                $('#list_end').empty().html(`
                <div class="text-center" style="margin-top:100px;  "><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                    <h6 style="color:#262728;"><b>There is no such Chef!</b></h6>
                   </div>`);
                $("#chef_lists").empty()
                $("#chef_detail_container").empty().html(`<div class="text-center" style="margin-top:100px;">
                <h4 style="color:#d92550; padding-top:130px;"><b>Chef Details Not Found!</b></h4>
                </div>`)
                return;
            }
            loadFristItem_cat()
            $("#chef_lists").html(data)
            // $("#list_end").html(`<button type="button" onclick="cat_load_more(1)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)

                $("#list_end").empty().html(
                    `<button type="button" onclick="load_more(page)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`
                )
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Search chef.", "error");
        },
    });
}

const loadFristItem_cat = () => {

    setTimeout(() => {
        let ele = document.getElementById("frist_element").click()
    }, 200);
}



const handleLocationmap = () => {
    let pincode = $("#chef_pincode").val()

    if (pincode.length == 6) {
        geocode({ address: pincode })
    }
}
const handleLocationmapedit = () => {
    let pincode = $("#chef_pincode_edit").val()

    if (pincode.length == 6) {
        geocode2({ address: pincode })
    }
    if (pincode.length <= 5) {
        var city=$('#chef_city_edit').val('');
        var state=$('#chef_state_edit').val('');
    }
}

// const resetval=()=>{
//     let pincode_val = $(".chef_pincode_edit").val()
//     if(pincode_val.length == ''){
//         var city=document.getElementById('chef_city_edit').value;
//         var state=document.getElementById('chef_state_edit').value;

//         console.log(city,state);
//     }

// }
loadFristItem_cat()

var map;
var marker = false;
let geocoder;
geocoder = new google.maps.Geocoder();

function initMap() {


    var centerOfMap = new google.maps.LatLng(19.0760, 72.8777);


    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 19.0760, lng: 72.8777 },
        mapTypeControl: false,
    });

    google.maps.event.addListener(map, 'click', function (event) {

        var clickedLocation = event.latLng;

        if (marker === false) {

            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true
            });

            google.maps.event.addListener(marker, 'dragend', function (event) {
                markerLocation();
            });
        } else {

            marker.setPosition(clickedLocation);
        }

        markerLocation();
    });
}

function markerLocation() {
    //Get location.
    var currentLocation = marker.getPosition();

    document.getElementById('chef_geo_lat').value = currentLocation.lat(); //latitude
    document.getElementById('chef_geo_long').value = currentLocation.lng(); //longitude
}



google.maps.event.addDomListener(window, 'load', initMap);

async function geocode(request) {

    geocoder
        .geocode(request)
        .then(async (result) => {
            const { results } = result;

            map.setCenter(results[0].geometry.location);
            map.setZoom(14)
            await Promise.all(
                results[0].address_components.map(element => {
                    if (element.types.includes("administrative_area_level_1")) {

                        $("#chef_state").val(element.long_name)
                    }
                    if (element.types.includes("locality")) {

                        $("#chef_city").val(element.long_name)
                    }
                })
            )
            pincodeFlag = true;
            return results;
        })
        .catch((e) => {
            pincodeFlat = false;
            console.log("Geocode was not successful for the following reason: " + e)
            // alert("Geocode was not successful for the following reason: " + e);
            alertServiceFunction("Error", "Failed to get Location with this pincode.", "error");
        });
}


//   edit map









geocoder2 = new google.maps.Geocoder();

function initMap2(lat, long) {



}

function markerLocation2() {
    //Get location.
    var currentLocation = marker2.getPosition();

    document.getElementById('chef_geo_lat_edit').value = currentLocation.lat(); //latitude
    document.getElementById('chef_geo_long_edit').value = currentLocation.lng(); //longitude
}



// google.maps.event.addDomListener(window, 'load', initMap2);

async function geocode2(request) {

    geocoder2.geocode(request).then(async (result) => {
            const { results } = result;

            map2.setCenter(results[0].geometry.location);
            map2.setZoom(14)
            await Promise.all(
                results[0].address_components.map(element => {
                    if (element.types.includes("administrative_area_level_1")) {

                        $("#chef_state_edit").val(element.long_name)
                    }
                    if (element.types.includes("locality")) {

                        $("#chef_city_edit").val(element.long_name)
                    }
                })
            )
            pincodeFlag = true;
            return results;
        })
        .catch((e) => {
            pincodeFlag = false;
            console.log("Geocode was not successful for the following reason: " + e)
            // alert("Geocode was not successful for the following reason: " + e);
            alertServiceFunction("Error", "Failed to get Location with this pincode.", "error");
        });
}


$(".alphabates").alphanum({
    allowSpace: true, // Allow the space character
    allowUpper: true,  // Allow Upper Case characters
    maxLength: 30,    // eg Max Length
    allowNumeric: false  // Allow digits 0-9
});

$(".newmeric").alphanum({
    allowSpace: false, // Allow the space character
    allowUpper: false,  // Allow Upper Case characters
    maxLength: 10,    // eg Max Length
    allowLatin: false, // a-z A-Z
    allowNumeric: true  // Allow digits 0-9
});

$(".hour-input").alphanum({
    allowSpace: false, // Allow the space character
    allowUpper: false,  // Allow Upper Case characters
    maxLength: 2,    // eg Max Length
    allowLatin: false, // a-z A-Z
    allowNumeric: true,  // Allow digits 0-9
    max: 23
});

$(".minute-input").alphanum({
    allowSpace: false, // Allow the space character
    allowUpper: false,  // Allow Upper Case characters
    maxLength: 2,    // eg Max Length
    allowLatin: false, // a-z A-Z
    allowNumeric: true,  // Allow digits 0-9
    max: 59
});

$(".Geo_newmeric").alphanum({
    allowSpace: false, // Allow the space character
    allowUpper: false,  // Allow Upper Case characters
    maxLength: 10,    // eg Max Length
    allowLatin: false, // a-z A-Z
    allowNumeric: true,  // Allow digits 0-9
    allow: '.'
});

$(".alphanewmeric").alphanum({
    allowSpace: true,  // Allow the space character
    allowNewline: true,  // Allow the newline character \n ascii 10
    allowNumeric: true,  // Allow digits 0-9
    allowUpper: true,  // Allow upper case characters
    allowLower: true,  // Allow lower case characters
    allowLatin: true,  // a-z A-Z
    forceUpper: false, // Convert lower case characters to upper case
    forceLower: false, // Convert upper case characters to lower case
    maxLength: 20    // eg Max Length
});

$(".alpha_newmeric").alphanum({
    allowSpace: true,  // Allow the space character
    allow: '_',  // Allow
    allowNewline: true,  // Allow the newline character \n ascii 10
    allowNumeric: true,  // Allow digits 0-9
    allowUpper: true,  // Allow upper case characters
    allowLower: true,  // Allow lower case characters
    allowLatin: true,  // a-z A-Z
    forceUpper: false, // Convert lower case characters to upper case
    forceLower: false, // Convert upper case characters to lower case
    maxLength: 50,  // eg Max Length
    allow: '-',
    allow: '.',
    allow: '/(){}[]|'
});


$(".alphanewmeric_desc").alphanum({
    allowSpace: true,  // Allow the space character
    allowNewline: true,  // Allow the newline character \n ascii 10
    allowNumeric: true,  // Allow digits 0-9
    allowUpper: true,  // Allow upper case characters
    allowLower: true,  // Allow lower case characters
    allowLatin: true,  // a-z A-Z
    forceUpper: false, // Convert lower case characters to upper case
    forceLower: false, // Convert upper case characters to lower case
    maxLength: 400    // eg Max Length
});

//add modal


function countDesc(e) {
    // $('#count').text(this.value.length);
    if (e.keyCode == 8) enterKeyCountEdit = 0;
};
function blockEnter(e) {
    if (e.keyCode == 13) enterKeyCountEdit++;
    else enterKeyCountEdit = 0;
    if (enterKeyCountEdit == 2) {
        e.preventDefault();
        enterKeyCountEdit--;
    }
};


function checkStartTime(_this) {
    $('#chef_start_time_val_edit').text(_this.value);
    if (_this.value == $('#chef_end_time_val_edit').text()) {
        $('#chef_start_time_error_edit').fadeIn('slow').delay(2000).fadeOut('slow');
        _this.value = '';
    }
};
function checkEndTime(_this) {
    $('#chef_end_time_val_edit').text(_this.value);
    if (_this.value == $('#chef_start_time_val_edit').text()) {
        $('#chef_end_time_error_edit').fadeIn('slow').delay(2000).fadeOut('slow');
        _this.value = '';
    }
};

function limitNumber(_this, _event, limit = 0) {
    let keyCode = [69, 109, 110, 189];
    if (keyCode.includes(_event.keyCode)) _event.preventDefault();
    if (_this.value.length == 2 && !([8, 46].includes(_event.keyCode))) _event.preventDefault();
    let oldVal = parseInt(_this.value);
    let newVal = (oldVal * 10) + parseInt(_event.key);
    if (newVal > limit || newVal == 0) _event.preventDefault();
}

function isImageFile(_this) {
    for (let i=0; i<_this.files.length; i++) {
        if(!(/(\.|\/)(gif|jpe?g|png|svg)$/i.test(_this.files[i].type))) {
            alertServiceFunction("Error", "File Type must be Image.", "error");
            _this.value = '';
            return false;
        }
    }
}

function isUploadLimitReached(_this, limit = null) {
    if (limit && _this.files.length > limit) {
        alertServiceFunction("Error", "You can only add " + limit + " images for Chef Banner.", "error");
        _this.value = '';
        return false;
    }
}

function previewImg(_this, div = null) {
    isImageFile(_this);
    if (_this.files.length == 1) {
        let reader = new FileReader();
        reader.onload = function () {
            $('#' + div).attr("src", reader.result);
        }
        reader.readAsDataURL(_this.files[0]);
        $('#' + div).fadeIn('slow');
    } else {
        $('#' + div).fadeOut('slow');
    }
}

function handleDeleteChefBannerImages(img, id="chef_banner_img", div="chef_banner_img_divEdit") {
    if(img != ''){
        var name = img.split('.')[0];
        var str_name = name.replace(/[\(\)\- ]/gm, '');
        $("#chef_banner_img_"+str_name).remove();
        var prev_img = $("#del_chef_banner_img").val();
        if(prev_img != '') var images = prev_img.split(',');
        else var images = [];
        images.push(img);
        del_chef_banner_img.push(img);
        $("#del_chef_banner_img").val(images.join(","));
        var img_length = document.getElementById(div).getElementsByTagName('div');
        if(img_length.length > 0){
            $("#"+id).prop('required',false);
        }
        else{
            $("#"+id).prop('required',true);
            $("#"+id).val('');
        }
    }
}

function preview_bnnr_img(id,div){
    //on file input change
    if (
        window.File &&
        window.FileReader &&
        window.FileList &&
        window.Blob
    ) {
        var data = $("#" + id)[0].files; //this file data
        let alreadyUploaded = $(`#${div}`).find('img[src^="https:\/\/"]').length ?? 0;
        if((alreadyUploaded + data.length) > 5){
            $("#" + id).val('');
            if (alreadyUploaded > 0) {
                if (alreadyUploaded == 5) {
                    alertServiceFunction("Error", `Image Upload Limit Reached`, "error");
                    return;
                }
                alertServiceFunction("Error", `You can only add ${5-alreadyUploaded} more images for Chef Banner.`, "error");
            } else {
                alertServiceFunction("Error", "You can only add 5 images for Chef Banner.", "error");
            }
            return;
        }
        $.each(bnnr_temp_key, function (index, val1) {
            $("#chef_banner_img_"+val1).remove();
        });

        $.each(data, function (index, file) {
            //loop though each file
            if (/(\.|\/)(gif|jpe?g|png|svg)$/i.test(file.type)) {
                //check supported file type
                if (data[0].size <= 5144000) {
                    var fRead = new FileReader(); //new filereader
                    fRead.onload = (function (file) {
                        //trigger function on successful read
                        return function (e) {
                            $("#" + div).append(`
                              <div id="chef_banner_img_${file.lastModified}">
                                <img class="mx-1 chefEditImg" src="${e.target.result}" alt="">
                                <i class="fas fa-trash-alt" role='button' onclick="DeleteChefTempBannerImages('${file.lastModified}','${id}','${div}')"></i>
                              </div>
                            `);
                            bnnr_temp_key.push(file.lastModified);
                        };
                    })(file);
                    fRead.readAsDataURL(file); //URL representing the file's data.
                } else {
                    $('#upload_content').val("");
                    alertServiceFunction("Error", "Image size must upto 5 MB", "error");
                    return false;
                }
            }
            else{
                $('#upload_content').val("");
                alertServiceFunction("Error", "File Type must be Image.", "error");
                return false;
            }
        });
    } else {
        alertServiceFunction("Error", "Your browser doesn't support File API!", "error"); //if File API is absent
    }
}

function DeleteChefTempBannerImages(img, id, div){
    $("#chef_banner_img_"+img).remove();
    del_chef_banner_img.push(img);
    var img_length = document.getElementById(div).getElementsByTagName('div');
    if(img_length.length > 0){
        $('#'+id).prop('required',false);
    }
    else{
        $('#'+id).prop('required',true);
        $('#'+id).val('');
    }
}
