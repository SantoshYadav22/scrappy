const handleChangeOrderStatus=(order_id,status)=>{
    if(order_id !=null && status !=null){
        console.log(order_id,status)
        swal({
            title: "Are You Sure ?",
            text: "You Want to " + 'Change' + "  " + "This Order Status",
            icon: "warning",
            buttons: ["Cancel", "Confirm"],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                if (order_id) {
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                        url: API_URL + "orders/change-status",
                        method: "post",
                        dataType: "json",
                        data: { order_id, status },
                        method: "post",
    
                        success: function (data) {
                            // console.log(data)
                            if (data.status == "success") {
                                alertServiceFunction(
                                    "Success",
                                    data.msg,
                                    "success"
                                );
                                get_single_order_list(order_id);
                                handleLoadDetailsChef(this,order_id);
                            
                            } else {
                                alertServiceFunction("Error", data.msg, "error");
                            }
                        },
                        error: function (err) {
                            alertServiceFunction(
                                "Error",
                                "Failed to  Update Order Status",
                                "error"
                            );
                        },
                    });
                }
                else{
                    alertServiceFunction(
                        "Cancelled",
                        "Order status preserved",
                        "warning"
                    );
                }
            } else {
                // swal("Cancelled", "User status preserved", "warning");
                alertServiceFunction(
                    "Cancelled",
                    "Order status preserved",
                    "warning"
                );
            }
        });
    } 
    else{
        alertServiceFunction("Error", "Failed to Order Status Update.", "error");
    }
}

function get_single_order_list(order_id) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "post",
        url: API_URL + "orders/single-list",
        data: { order_id: order_id },
        success: function (res) {
            console.log(res);
            $(".employee_head_" + order_id).empty().html(res);
            // dish_details(user_id);
        },
        error: function (err) {
            // alert("Server did not Responded, Please Contact Administrator.");
            alertServiceFunction("Error", "Server did not Responded, Please Contact Administrator.", "error");
        },
    });
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
        url: API_URL + 'orders/single-data',
        dataType: 'html',
        data: { id: id },
        beforeSend: function () {
            $('#chef_detail_container').empty().html(
                `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`
            )
        },
        success: function (data) {
            console.log(data)
            // $('#detailsChefModalCloseButton').click();

            $('#chef_detail_container').empty().html(data)

        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Get Chef Details.", "error");
        },
    });
};




let page =0;
$("#overflow-container-list").scroll(function () { //detect page scroll
    var objDiv = document.getElementById("overflow-container-list");
    console.log($(this).scrollTop() + $(this).innerHeight(), $(this)[0].scrollHeight);
    if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) { //if user scrolled from top to bottom of the page
        load_more(page); //load content
    }
});


function load_more(page1) {
    page = page1+1;
     var chef_name  = $('#filter_chef_names').val();
     var mobile  = $('#filter_user_mobiles').val(); 
     var chef_city   = $("#filter_chef_citys").val();
     var user_name  = $("#filter_user_name").val();
     var filter_phone  = $("#filter_phone").val();
     var order_id = $("#filter_order_id").val();  
    //  var chef_status = $("#filter_chef_statuss").val();
     
      console.log(chef_name,mobile,chef_city);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url:API_URL +'order/search?page='+page,
        method: "post",
        dataType:'html',
        data: { chef_name,mobile,chef_city,user_name,filter_phone,order_id},
       
        }).done(function (data) {  
            // console.log(data)         
            if (!data) {               
                $('#list_end').empty().html("No more records!");
                return;
            }

            $("#chef_lists").append(data); //append data into #results element
            // console.log('data.length'); 
            $('#list_end').empty().html(`<button type="button" onclick="load_more(${page})" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)
        })
        .fail(function (jqXHR, ajaxOptions, thrownError) {
            alert('No response from server');
        });
}

function reset_filter(){
    $('#filter_chef_names').val('');  
    $("#filter_user_mobiles").val(''); 
    $("#filter_chef_citys").val(''); 
    $('#filter_user_name').val('');
    $('#filter_phone').val('');
    $('#filter_order_id').val('');

    location.reload();
    // user_list();
    // load_more(page)
}

function order_list() {    
    $(".dropdown-menu").removeClass('show');
    var chef_name = $("#filter_chef_names").val();
    var mobile = $("#filter_user_mobiles").val();
    var chef_city  = $("#filter_chef_citys").val();
    var user_name  = $("#filter_user_name").val();
    var filter_phone  = $("#filter_phone").val();
    var order_id = $("#filter_order_id").val();
 

    $("#list_end").empty();
    $("#chef_lists").empty().html(`<div class="row m-0"><div class="col-md-12 text-center"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait...</p></div></div>`);
    $("#chef_detail_container").empty().html(`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait for Details...</p></div></div>`);
    
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: API_URL+'order/search',
            method: "post",
            dataType:'html',
            data:  { chef_name,mobile,chef_city,user_name,filter_phone,order_id},
            success: function (data) {
                $("#overflow-container-list").animate({
                    scrollTop: 0
                }, 500);   
                // console.log(data)
                if (data.length == 0) {
              
                    $('#list_end').empty().html(`
                    <div class="text-center" style="margin-top:100px;"><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                        <h6 style="color:#262728;"><b>No Order Found!</b></h6>
                        </div>`);
                    $("#chef_lists").empty()
                    $("#chef_detail_container").empty().html(`<div class="text-center text-danger" style="margin-top:170px;font-size: 24px;">
                   <b>Order Details Not Found!</b>
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
                alertServiceFunction("Error", "Failed to Search Order.", "error");
            },
        });
}
const loadFristItem_cat = () => {    
    setTimeout(() => {
        let ele=document.getElementById("frist_element").click()
    }, 200);
}

loadFristItem_cat()