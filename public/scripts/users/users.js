console.log('hello from users')
const handleLoadDetailsUsers =(ele,id)=>{
    if(ele !==null){  
        
        let allcuisnes=document.getElementsByClassName('remve_Active_color')
    
        for (let index = 0; index < allcuisnes.length; index++) {
            const element = allcuisnes[index];
            element.style.backgroundImage = "none";
            
            
        } 
        ele.style.backgroundImage = "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";
        
    
        }
        $('#users_detail_container').empty().html(`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"></div></div>`)
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            method: "post",
            url: API_URL+'users/single-data',
         
            
            dataType:'html',
            data:  {id:id},
            
            success: function (data) {
                // console.log(data)
                 $('#users_detail_container').empty().html(data)
            },error: function (error) {
                $('#users_detail_container').empty().html(`  <h6 style="text-align: center;"> Failed To Load User Details</h6>`)

            }
        });
    // console.log(id)
}

const loadFristItem_users = () => {
  
    
    setTimeout(() => {
        let ele=document.getElementById("frist_element_users").click()
    }, 200);
}



let page = 0;
$("#overflow-container-list").scroll(function () { //detect page scroll
    var objDiv = document.getElementById("overflow-container-list");
    console.log($(this).scrollTop() + $(this).innerHeight(), $(this)[0].scrollHeight);
    if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) { //if user scrolled from top to bottom of the page
       
        user_load_more(page); //load content
        
    }
});

function user_load_more(page1) {
    page = page1+1;

    var user_name = $("#filter_user_name").val();
    var user_state = $("#filter_user_state").val();
    var user_pincode = $("#filter_user_pincode").val();
    var user_city=$("#filter_user_city").val();
    var is_active = $("#filter_is_active").val();
    var user_phone=$("#filter_user_phone").val();
    var user_email=$("#filter_user_email").val();
    var filter_user_id=$('#filter_user_id').val();

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL +'users/search?page='+page,
        method: "post",
        dataType:'html',
        data: { user_name, is_active,user_state,user_pincode,user_city,user_phone,user_email,filter_user_id},
       
    }).done(function (data) {
           
            if (data.length==0) {
               
                $('#list_end').empty().html("No more records!");
                return;
            }
            
            $("#cat_list").append(data); //append data into #results element
            // console.log('data.length');
            $('#list_end').empty().html(`<button type="button" onclick="user_load_more(${page+1})" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)
        })
        .fail(function (jqXHR, ajaxOptions, thrownError) {
            alert('No response from server');
        });
}

// loadlist 
const handleUserList=(id)=>{
    let singleList=document.getElementById(id)
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL +'users/list',
        method: "post",
        dataType:'json',
        data:  {id:id},
        success: function (data) {
            console.log(data.data)
            singleList.innerHTML=`<span>
            ${data.data.user_name}:${data.data.user_id}
       </span>
       <span>
       Status:${data.data.is_active==1 ?'Active':'In-Active'} <span style="font-size: 13px; color:${data.data.is_active==1 ?"25db25":"red"};"> <i class="fa fa-circle" aria-hidden="true" style="font-size: 13px;color:${
        data.data.is_active==1 ?"#25db25":"red"
    
    }"></i></span>
       </span>
       `
        }
    });
}

const handleUserStatus=(id,status)=>{
    if (status == 1) var action = 'Active';
    else var action = 'In-Active';
 
   
    swal({
        title: "Are You Sure ?",
        text: "You Want to " + action +"  "+ "This User",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
        if(id){
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: API_URL +'users/change-status',
                method: "post",
                dataType:'json',
                data:  {id,status},
                method: "post",
                
                success: function (data) {
                   
                    if(data.status=='success'){
                        alertServiceFunction("Success", data.msg, "success");
                        handleLoadDetailsUsers(null,id)
                         
                        handleUserList(id)
                    }
                    else {
                        alertServiceFunction("Error", data.msg, "error");
                    }
                
                },
                error: function (err) {
                    alertServiceFunction("Error", "Failed to Delete  Cuisine.", "error");
                },
            });
        }

    }
else {
    
    alertServiceFunction("Cancelled", "User status preserved", "warning");
}
});

    
}


const UsersclearFilters =()=>{
    page = 0;
    $(".dropdown-menu").removeClass('show');
    $('#filter_user_name').val('')
    $('#filter_user_state').val('')
    $('#filter_user_pincode').val('')
    $('#filter_user_city').val('')
    $('#filter_user_phone').val('')
    $('#filter_user_email').val('')
    $('#filter_is_active').val('')
    $("#filter_user_id").val('');
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL +'users/clear-filters',
        method: "post",
        dataType:'html',
        beforeSend:function (){
            document.getElementById('cat_list').innerHTML=`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"></div></div>`
        },
        // 
        success: function (data) {
            // console.log(data)
            if(data !==null && data !==''){
                document.getElementById('cat_list').innerHTML=data
                loadFristItem_users()
                $('#list_end').empty().html(`  <button type="button" onclick="user_load_more(0)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)
               
            }
            
        },  error: function (err) {
            alertServiceFunction("Error", "Failed to Clear  Filters.", "error");
        },
    });
}

const handleSearchbarUsers =()=>{
    $(".dropdown-menu").removeClass('show');
    page = 0;
    var user_name=$('#filter_user_name').val()
    var user_state=$('#filter_user_state').val()
    var user_pincode=$('#filter_user_pincode').val()
    var user_city=$('#filter_user_city').val()
    var user_phone=$('#filter_user_phone').val()
    var user_email=$('#filter_user_email').val()
    var is_active=$('#filter_is_active').val() 
    var filter_user_id=$('#filter_user_id').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL +'users/search',
        method: "post",
        dataType:'html',
        data:  {is_active,user_city,user_email,user_name,user_phone,user_state,user_pincode,filter_user_id},
        beforeSend:function (){
            $('#list_end').empty()
            document.getElementById('cat_list').innerHTML=`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"></div></div>`
        },
        success: function (data) {
            console.log(data)
            if(data !==null && data !==''){
                loadFristItem_users()
                document.getElementById('cat_list').innerHTML=data
                $('#list_end').empty().html(`  <button type="button" onclick="user_load_more(0)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)
            }
            else {
                    $("#cat_list").empty()

                //     $('# ').html(`<div class="text-center" style="margin-top:100px;"><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                //     <h6 style="color:#262728;"><b>There is no such Users!</b></h6>
                //  </div>`)
                $('#users_detail_container').empty().html(`<div class="text-center text-danger" style="margin-top:170px;font-size: 24px;"><b>User Details Not Found!</b></div>`);
                    $("#list_end").empty().html(`<div class="text-center" style="margin-top:100px;"><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                    <h6 style="color:#262728;"><b>There is no such User!</b></h6>
                 </div>`)
                }
            
        },  error: function (err) {
            alertServiceFunction("Error", "Failed to Search Cuisine.", "error");
        },
    });
}
loadFristItem_users()