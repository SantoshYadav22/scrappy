

// function get_category() {
//     var cat_id = $("#cat_id").val();
//     var cuisine_id = $("#cuisine_id").val();
//     $.ajax({
//         headers: {
//             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//         },
//         method: "post",
//         url: API_URL + "dish/get-category",
//         data: {cuisine_id},
//         success: function (res) {
//             $("#cat_id").empty().html(res.str);
//             if (cuisine_id != '') $("#cat_id").val(cat_id)
//             // emp_details(user_id);
//         },
//         error: function (err) {
//             // alert("Server did not Responded, Please Contact Administrator.");
//             alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
//         },
//     });
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let page = 0;
$("#overflow-container-list").scroll(function () { //detect page scroll
    var objDiv = document.getElementById("overflow-container-list");
    console.log($(this).scrollTop() + $(this).innerHeight(), $(this)[0].scrollHeight);
    if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) { //if user scrolled from top to bottom of the page

        load_more(page); //load content

    }
});

function load_more(page1) {
    page = page1 + 1;
    var filter_school_name = $("#filter_school_name").val();
    var filter_ward_name = $("#filter_ward_name").val();
    var filter_area = $("#filter_area").val();
    var filter_pincode = $("#filter_pincode").val();
   
    console.log(filter_area);

    $("#list_end").empty().html(`<div class="row m-0"><div class="col-md-12 text-center"><img src="${API_URL}images/icon/spinner.gif" style="width:24px;"></div></div>`);

    $.ajax({
        url: API_URL + "school/list?page=" + page,
        type: "get",
        datatype: "html",
        data: {
            filter_school_name,
            filter_ward_name,
            filter_area,
            filter_pincode,
            
        },
        beforeSend: function () {
            $('.ajax-loading').show();
        }
    })
        .done(function (data) {

            if (data.html == 0) {

                $('#list_end').empty().html("No more records!");
                return;
            }
            // page++; //page number increment
            $('.ajax-loading').hide(); //hide loading animation once data is received
            var load_btn = `<button type="button" onclick="load_more(${page})" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`;
            $("#list_end").html(load_btn);
            $("#list_view").append(data.html); //append data into #results element
            // console.log('data.length');
        })
        .fail(function (jqXHR, ajaxOptions, thrownError) {
            alert('No response from server');
        });
}


function get_add_dish(user_id) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "GET",
        url: API_URL + "school/add",
        data: {user_id: user_id},
        success: function (res) {
            // var obj = JSON.parse(res);
            // console.log(res);
            $("#add_form_view").empty().html(res);
        },
        error: function (err) {
            // alert("Server did not Responded, Please Contact Administrator.");
            alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
        },
    });
}

function reset_dish_list() {

    $("#filter_school_name").val('');
    $("#filter_ward_name").val('');
    $("#filter_area").val('');
    $("#filter_pincode").val('');
  

    dish_list();
}
function dish_list() {
    $(".dropdown-menu").removeClass('show');
    page = 0;
  
    var filter_school_name = $("#filter_school_name").val();
    var filter_ward_name = $("#filter_ward_name").val();
    var filter_area = $("#filter_area").val();
    var filter_pincode = $("#filter_pincode").val();
  

    console.log(filter_school_name,filter_ward_name,filter_area,filter_pincode);
    // var filter_work_status = $("#filter_work_status").val();
    $("#list_end").empty();
    $("#list_view").empty().html(`<div class="row m-0"><div class="col-md-12 text-center"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait...</p></div></div>`);
    $("#detail_view").empty().html(`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait for Details...</p></div></div>`);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "GET",
        url: API_URL + "school/list",
        data: {
         
            filter_ward_name,
            filter_school_name,
            filter_area,
            filter_pincode,
          
        },
        success: function (res) {
            $("#overflow-container-list").animate({
                scrollTop: 0
            }, 500);
            // var obj = JSON.parse(res);
            console.log(res);
            if (res.html.length == 0) {
                // console.log(data.length);
                //notify user if nothing to load
                $('#list_end').empty().html(`<div class="text-center" style="margin-top:100px;"><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                        <h6 style="color:#262728;"><b>There is no such School!</b></h6>
                       </div>`);
                $("#list_view").empty();
                $("#detail_view").empty().html(`<div class="text-center" style="margin-top:140px;">

                <h4 style="color:#d92550; padding-top:130px;"><b>School Details Not Found!</b></h4>
                    </div>`);
                return;
            }
            var load_btn = `<button type="button" onclick="load_more(0)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`;
            $("#list_end").html(load_btn);
            $("#list_view").empty().html(res.html);
        },
        error: function (err) {
            // alert("Server did not Responded, Please Contact Administrator.");
            alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
            $("#list_view").empty().html(`<div class="text-center" style="margin-top:100px;">
                                            <h4 style="color:#ff5656;">School Data Not Found</h4>
                                        </div>`);
        },
    });
}

function dish_details(sch_id) {
    // $(".alice-blue").removeClass('alice-blue');
    // $("#employee_head_" + sch_id).addClass('alice-blue');
    $("#detail_view").empty().html(`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`);
    let allcuisnes = document.getElementsByClassName('remve_Active_color')

    for (let index = 0; index < allcuisnes.length; index++) {
        const element = allcuisnes[index];
        element.style.backgroundImage = "none";

    }
    document.getElementById(`employee_head_${sch_id}`).style.backgroundImage = "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "POST",
        url: API_URL + "school/details",
        data: {sch_id: sch_id},
        success: function (res) {
            // var obj = JSON.parse(res);
            // console.log(res);
            $("#detail_view").empty().html(res);
        },
        error: function (err) {
            // alert("Server did not Responded, Please Contact Administrator.");
            alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
        },
    });
}

function get_edit_dish(sch_id) {
    $("#add_form_view").empty().html(`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "GET",
        url: API_URL + "school/edit",
        data: {sch_id: sch_id},
        success: function (res) {
            // var obj = JSON.parse(res);
            // console.log(res);
            $("#add_form_view").empty().html(res);
            setTimeout(() => {
                cut_off_time_validation()
            }, 1000);
        },
        error: function (err) {
            // alert("Server did not Responded, Please Contact Administrator.");
            alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
        },
    });
}

function get_single_dish_list(sch_id) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            method: "post",
            url: API_URL + "school/single-data",
            data: {sch_id: sch_id},
            success: function (res) {
                $("#task_list_" + sch_id).empty().html(res);
                dish_details(user_id);
            },
            error: function (err) {
                // alert("Server did not Responded, Please Contact Administrator.");
                alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
            },
        });
    }


function handleDeleteDeish(sch_id, status) {
    if (status == 1) var action = 'Active';
    else var action = 'In-Active';
    swal({
        title: "Are You Sure ?",
        text: "You Want to " + action + "  " + " This School.",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                method: "POST",
                url: API_URL + "school/change-status",
                data: {sch_id: sch_id, status: status},
                success: function (res) {
                    // var obj = JSON.parse(res);
                    console.log(res);
                    if (res.status == "success") {
                        alertServiceFunction("Success", res.msg, "success");
                        get_single_dish_list(sch_id);

                        // dish_list();
                        dish_details(sch_id);
                    } else alertServiceFunction("Error", res.msg, "error");
                },
                error: function (err) {
                    alertServiceFunction("Error", "Failed to user Status Update.", "error");
                },
            });
        } else {
            // swal("Cancelled", "User status preserved", "warning");
            alertServiceFunction("Cancelled", "User status preserved", "warning");
        }
    });
}

