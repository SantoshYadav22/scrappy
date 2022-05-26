var bnnr_temp_key = [];
var dish_temp_key = [];
enterKeyCountEdit = 0;

// handle click for submit
const SubmitAddForm = () => {
    document.getElementById("submitFormButton").click();
};
const loadFristItem = () => {
    setTimeout(() => {
        let ele = document.getElementById("frist_element").click();
    }, 200);
};

// var page = 1;
let del_cuisine_img = [];
let del_cuisine_banner_img = [];
// $("#overflow-container-Cuisine").scroll(function () {
//     //detect page scroll

//     var objDiv = document.getElementById("overflow-container-Cuisine");
//     console.log(
//         $(this).scrollTop() + $(this).innerHeight(),
//         $(this)[0].scrollHeight
//     );
//     if (
//         Math.ceil($(this).scrollTop() + $(this).innerHeight()) >=
//         $(this)[0].scrollHeight
//     ) {
       
     
//         load_more(page); //load content
//     }
// });
let page = 0;
$("#overflow-container-Cuisine").scroll(function () { //detect page scroll
    var objDiv = document.getElementById("overflow-container-Cuisine");
    console.log($(this).scrollTop() + $(this).innerHeight(), $(this)[0].scrollHeight);
    if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) { //if user scrolled from top to bottom of the page
       
        load_more(page); //load content
        
    }
});


function load_more(page1) {
    page=page1+1
    var cuisine_name = $("#filter_cuisine_name").val();
    var is_active = $("#filter_is_active").val();

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "cuisine/search?page=" + page,
        method: "post",
        dataType: "html",
        data: { cuisine_name, is_active },
    })
        .done(function (data) {
            if (data.length == 0) {
                $("#list_end").empty().html("No more records!");

                return;
            } else {
                $("#cuisine_lists").append(data); //append data into #results element
                // console.log('data.length');
                $("#list_end")
                    .empty()
                    .html(
                        `<button type="button" onclick="load_more(${
                            page + 1
                        })" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`
                    );
            }
        })
        .fail(function (jqXHR, ajaxOptions, thrownError) {
            alert("No response from server");
        });
}

const CuisineclearFilters = () => {
    $("#filter_cuisine_name").val("");
    $(".dropdown-menu").removeClass("show");
    $("#filter_is_active").val("");
    $('#filter_cuisine_id').val('');
    let cuisinelist = document.getElementById("cuisine_lists");
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "cuisine/clear-filters",
        method: "post",
        dataType: "html",
        beforeSend: function () {
            cuisinelist.innerHTML = `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"></div></div>`;
        },
        success: function (data) {
            // console.log(data)
            if (data !== null && data !== "") {
                document.getElementById("cuisine_lists").innerHTML = data;
                loadFristItem();
                // $("#list_end").html(
                //     `<button type="button" onclick="load_more(1)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`
                // );
                location.reload();

                // document.getElementById('cuisineSearchBar').value=''
            }
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Clear  Filters.", "error");
        },
    });
};

// loadlist
const handleList = (id) => {
    let singleList = document.getElementById(id);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "cuisine/list",
        method: "post",
        dataType: "json",
        data: { id: id },
        success: function (data) {
            console.log(data.data);
            // singleList.innerHTML=data.data.cuisine_name
            singleList.innerHTML = `
            <span>
             ${data.data.cuisine_name} (${data.data.cuisine_id})
        </span>
        <span>
       Status: ${
           data.data.is_active == 1 ? "Active" : "In-Active"
       }  <span style="color:${
                data.data.is_active == 1 ? "#25db25" : "red"
            };"> <i class="fa fa-circle" aria-hidden="true" style="font-size:14px; color:${
                data.data.is_active == 1 ? "#25db25" : "red"
            }"></i></span>
   </span>
        
            `;
        },
    });
    
};

// handle add cuisine
const handleCuisineSubmit = () => {
    event.preventDefault();
    var error = true;
    var form_data = new FormData($("#addCuisineForm")[0]);
    // let jump=true;
    // add loader
    let cuisine_img = document.getElementById("cuisine_img").files;
    let cuisine_banner_img =
        document.getElementById("cuisine_banner_img").files;
    if (cuisine_img.length > 5) {
        alertServiceFunction(
            "Error",
            "Maximum 5 Cuisine Images Are Allowed",
            "error"
        );
        error = false;
    }
    if (cuisine_banner_img.length > 5) {
        alertServiceFunction(
            "Error",
            "Maximum 5 Cuisine Banner Images Are Allowed",
            "error"
        );
        error = false;
    }

    if (error) {
        $("#add_cuisine_submit_div").html(
            `<img height="30" width="30"  src="images/spinner.gif" alt="">`
        );
        $.ajax({
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: API_URL + "cuisine/add",
            type: "POST",
            data: form_data,
            contentType: false,
            processData: false,

            success: function (data) {
                console.log(data);
                if (data.status == "success") {
                    alertServiceFunction("Success", data.msg, "success");
                    resetForm();
                    CuisineclearFilters();
                    $("#addCuisineModalCloseButton").click();
                } else {
                    alertServiceFunction("Error", data.msg, "error");
                    $("#add_cuisine_submit_div").html(`
                    <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                    <button type="button" class="btn btn-secondary flex-center btn-sm"
                        data-dismiss="modal">Close</button>`);
                }
                // $("#add_cuisine_submit_div")
                //     .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Add</button>
                // <button type="button" class="btn btn-secondary flex-center btn-sm"
                //     data-dismiss="modal">Close</button>`);
                // remove loader
            },
            error: function (err) {
                alertServiceFunction(
                    "Error",
                    "Failed to Cuisine Creation.",
                    "error"
                );
                $("#add_cuisine_submit_div").html(`
                <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
                <button type="button" class="btn btn-secondary flex-center btn-sm"
                    data-dismiss="modal">Close</button>`);
            },
        });
    }
};
// edit cuisine details
const handleEditCuisine = (id) => {
    // console.log(id)
    let modal = document.getElementById("modal_body_cuisine");
    let add_modal = document.getElementById("add_modal_body_cuisine");
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "cuisine/edit",
        method: "post",
        dataType: "html",
        data: { id: id },
        success: function (data) {
            modal.innerHTML = data;
            add_modal.innerHTML = '';
        },
    });
};

// add cuisine details
const handleAddCuisine = () => {
    // console.log(id)
    let modal = document.getElementById("add_modal_body_cuisine");
    let edit_modal = document.getElementById("modal_body_cuisine");
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "cuisine/add-view",
        method: "post",
        dataType: "html",
        data: {},
        success: function (data) {
            modal.innerHTML = data;
            edit_modal.innerHTML = '';
        },
    });
};

// load details cuisine

const handleLoadDetails = (ele, id) => {
    // console.log(id)
    if (ele !== null) {
        let allcuisnes = document.getElementsByClassName("remve_Active_color");

        for (let index = 0; index < allcuisnes.length; index++) {
            const element = allcuisnes[index];
            element.style.backgroundImage = "none";
        }
        ele.style.backgroundImage =
            "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";
    }

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "post",
        url: API_URL + "cuisine/single-data",

        dataType: "html",
        data: { id: id },

        beforeSend: function () {
            $("#cuisine_detail_container")
                .empty()
                .html(
                    `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`
                );
        },
        success: function (data) {
            // console.log(data)
            $("#cuisine_detail_container").empty().html(data);
        },
    });
};

//handleCuisineEditSubmit
const handleCuisineEditSubmit = (id) => {
    event.preventDefault();

    var form_data = new FormData($("#EditCuisineForm")[0]);
    form_data.append("cuisine_id", id);
    if (del_cuisine_img.length > 0) {
        form_data.append("del_cuisine_img", del_cuisine_img.toString());
    }
    if (del_cuisine_banner_img.length > 0) {
        form_data.append(
            "del_cuisine_banner_img",
            del_cuisine_banner_img.toString()
        );
    }
    // if(del_cuis)
    $("#edit_cuisine_submit_div").html(
        `<img height="30" width="30"  src="images/spinner.gif" alt="">`
    );
    $.ajax({
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "cuisine/submit",
        type: "POST",
        data: form_data,
        contentType: false,
        processData: false,
        success: function (data) {
            // console.log(data)
            if (data.status == "success") {
                alertServiceFunction("Success", data.msg, "success");
                resetForm();
                handleList(id);
                handleLoadDetails(null, id);
                del_cuisine_img = [];
                del_cuisine_banner_img = [];
                $("#EditCuisineModalCloseButton").click();
            } else {
                alertServiceFunction("Error", data.msg, "error");
                del_cuisine_img = [];
                del_cuisine_banner_img = [];
            }
            $("#edit_cuisine_submit_div").html(`
            <button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
            <button type="button" class="btn btn-secondary flex-center btn-sm" data-dismiss="modal">Close</button>
            `);
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Edit  Cuisine.", "error");
        },
    });
};

// const handleDeleteCuisineImages = (img) => {
//     // console.log()
//     // $(`#img${img}`).remove();
//     document.getElementById(`img${img}`).style.opacity = "0.5";

//     console.log(img);
//     del_cuisine_img.push(img);
// };
// const handleDeleteCuisineBannerImages = (img) => {
//     console.log(img);
//     document.getElementById(`banner${img}`).style.opacity = "0.5";
//     del_cuisine_banner_img.push(img);
// };


function preview_img(id,div){
    //on file input change
    if (
        window.File &&
        window.FileReader &&
        window.FileList &&
        window.Blob
    ) {
        console.log(id)
        var data = $("#" + id)[0].files; //this file data
        let alreadyUploaded = $(`#${div}`).find('img[src^="https:\/\/"]').length ?? 0;
        if((alreadyUploaded + data.length) > 5){
            $("#" + id).val('');
            if (alreadyUploaded > 0) {
                if (alreadyUploaded == 5) {
                    alertServiceFunction("Error", `Image Upload Limit Reached`, "error");
                    return;
                }
                alertServiceFunction("Error", `You can only add ${5-alreadyUploaded} more images for Cuisine.`, "error");
            } else {
                alertServiceFunction("Error", "You can only add 5 images for Cuisine.", "error");
            }
        }
        // var img_length = document.getElementById('img_div').getElementsByTagName('img');
        // if((img_length+data.length) > 5){
        //     alertServiceFunction("Error", "You can upload 5 Images only.", "error");
        // }
        else{
            //check File API supported browser
            console.log("length->",data.length);
            console.log("bnnr_temp_key-->",dish_temp_key);
            console.log("length->",data);
            $.each(dish_temp_key, function (index, val1) {
                $("#cuisine_img_"+val1).remove();
                $("#cuisine_img_btn_"+val1).remove();
            });

            // $("#thumb-output").empty();
            $.each(data, function (index, file) {
                //loop though each file
                console.log("file-->",file);
                if (/(\.|\/)(gif|jpe?g|png|svg)$/i.test(file.type)) {
                    //check supported file type
                    if (data[0].size <= 5144000) {
                        var fRead = new FileReader(); //new filereader
                        fRead.onload = (function (file) {
                            //trigger function on successful read
                            return function (e) {
                                $("#" + div).append(`<img  class="m-1 dishEditImg thumbnail" id="cuisine_img_${file.lastModified}" src="${e.target.result}" alt="" style="height:80px;width:80;">
                                <i class="fas fa-trash-alt" id="cuisine_img_btn_${file.lastModified}" onclick="DeleteCuisineTempImages('${file.lastModified}')"></i>`);
                                // $("#" + div).css({ "background-image": "url(" + e.target.result + ")", "background-size": "70px", "cursor": "pointer" });
                                // $('#' + div).attr('onclick', 'zoom_image("' + e.target.result + '")');
                                dish_temp_key.push(file.lastModified);
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
        }
    } else {
        alertServiceFunction("Error", "Your browser doesn't support File API!", "error"); //if File API is absent
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
                alertServiceFunction("Error", `You can only add ${5-alreadyUploaded} more images for Cuisine Banner.`, "error");
            } else {
                alertServiceFunction("Error", "You can only add 5 images for Cuisine Banner.", "error");
            }
        }
        // var img_length = document.getElementById('bnnr_img_div').getElementsByTagName('img');
        // if((img_length+data.length) > 5){
        //     alertServiceFunction("Error", "You can upload 5 Images only.", "error");
        //     return;
        // }
        else{
            //check File API supported browser
            // console.log(data);

            $.each(bnnr_temp_key, function (index, val1) {
                $("#cuisine_banner_img_"+val1).remove();
                $("#cuisine_banner_img_btn_"+val1).remove();
            });

            // $("#thumb-output").empty();
            $.each(data, function (index, file) {
                //loop though each file
                if (/(\.|\/)(gif|jpe?g|png|svg)$/i.test(file.type)) {
                    //check supported file type
                    if (data[0].size <= 5144000) {
                        var fRead = new FileReader(); //new filereader
                        fRead.onload = (function (file) {
                            //trigger function on successful read
                            return function (e) {
                                $("#" + div).append(`<img  class="m-1 dishEditImg thumbnail" id="cuisine_banner_img_${file.lastModified}" src="${e.target.result}" alt="" style="height:80px;width:80;">
                                <i class="fas fa-trash-alt" id="cuisine_banner_img_btn_${file.lastModified}" onclick="DeleteCuisineTempBannerImages('${file.lastModified}')"></i>`);
                                // $("#" + div).css({ "background-image": "url(" + e.target.result + ")", "background-size": "70px", "cursor": "pointer" });
                                // $('#' + div).attr('onclick', 'zoom_image("' + e.target.result + '")');
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
        }
    } else {
        alertServiceFunction("Error", "Your browser doesn't support File API!", "error"); //if File API is absent
    }
}


const handleDeleteCuisineImages=(img)=>{
    if(img != ''){
        // console.log('deelting',img)
        var name = img.split('.')[0];
        var str_name = name.replace(/[\(\)\- ]/gm, '');
        $("#cuisine_img_"+str_name).remove();
        $("#cuisine_img_btn_"+str_name).remove();
        var prev_img = $("#del_cuisine_img").val();
        if(prev_img != '') var images = prev_img.split(',');
        else var images = [];
        images.push(img);
        del_cuisine_img.push(img);
        $("#del_cuisine_img").val(images.join(","));
        var img_length = document.getElementById('img_div').getElementsByTagName('img');
        console.log(img_length.length);
        if(img_length.length > 0){
            $("#dish_img").prop('required',false);
        }
        else{
            $("#dish_img").prop('required',true);
            $("#dish_img").val('');
        }
    }
}
const handleDeleteCuisineBannerImages=(img)=>{
    if(img != ''){
        // console.log('deelting Banner',img)
        var name = img.split('.')[0];
        var str_name = name.replace(/[\(\)\- ]/gm, '');
        // console.log("cuisine_banner_img_"+str_name);
        $("#cuisine_banner_img_"+str_name).remove();
        $("#cuisine_banner_img_btn_"+str_name).remove();
        var prev_img = $("#del_cuisine_banner_img").val();
        if(prev_img != '') var images = prev_img.split(',');
        else var images = [];
        images.push(img);
        del_cuisine_banner_img.push(img);
        $("#del_cuisine_banner_img").val(images.join(","));
        var img_length = document.getElementById('bnnr_img_div').getElementsByTagName('img');
        console.log(img_length);
        if(img_length.length > 0){
            $("#dish_banner_img").prop('required',false);
        }
        else{
            $("#dish_banner_img").prop('required',true);
            $("#dish_banner_img").val('');
        }

    }
}

function DeleteCuisineTempImages(img){
    // console.log("img->",img);
    $("#cuisine_img_"+img).remove();
    $("#cuisine_img_btn_"+img).remove();
    del_cuisine_img.push(img);
    var img_length = document.getElementById('img_div').getElementsByTagName('img');
    console.log(img_length.length);
    if(img_length.length > 0){
        $("#dish_img").prop('required',false);
    }
    else{
        $("#dish_img").prop('required',true);
        $("#dish_img").val('');
    }
}

function DeleteCuisineTempBannerImages(img){
    $("#cuisine_banner_img_"+img).remove();
    $("#cuisine_banner_img_btn_"+img).remove();
    del_cuisine_banner_img.push(img);
    var img_length = document.getElementById('bnnr_img_div').getElementsByTagName('img');
    console.log(img_length.length);
    if(img_length.length > 0){
        $("#dish_banner_img").prop('required',false);
    }
    else{
        $("#dish_banner_img").prop('required',true);
        $("#dish_banner_img").val('');
    }
}

const handleSearchbar = () => {
    $(".dropdown-menu").removeClass("show");
    var cuisine_name = $("#filter_cuisine_name").val();
    var is_active = $("#filter_is_active").val();
    let cuisinelist = document.getElementById("cuisine_lists");
    var filter_cuisine_id = $("#filter_cuisine_id").val();


    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL + "cuisine/search",
        method: "post",
        dataType: "html",
        data: { cuisine_name, is_active ,filter_cuisine_id},
        beforeSend: function () {
            $("#list_end").empty();
            cuisinelist.innerHTML = `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"></div></div>`;
        },

        success: function (data) {
              $("#overflow-container-Cuisine").animate({
                scrollTop: 0
            }, 500);   
            // console.log(data)
            if (data.length == 0) {
                $("#list_end").empty().html(`
                <div class="text-center" style="margin-top:100px;"><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                    <h6 style="color:#262728;"><b>There is no such Cuisine!</b></h6>
                    </div>`);
                $("#cuisine_lists").empty();
                $("#cuisine_detail_container").empty()
                    .html(`    <div class="text-center" style="margin-top:100px;">
                    <h4 style="color:#d92550; padding-top:130px;"><b>Cuisine Details Not Found!</b></h4>                 
               </div>`);
                return;
            }
            loadFristItem();
            cuisinelist.innerHTML = data;
            page=1 
            $("#list_end").html(
                `<button type="button" onclick="load_more(1)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`
            );
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Search Cuisine.", "error");
        },
    });
};

// delete cuisine details
const handleDeleteCuisine = (cuisine_id, status) => {
    if (status == 1) var action = "Active";
    else var action = "In-Active";
    // console.log(cuisine_id)

    swal({
        title: "Are You Sure ?",
        text: "You Want to " + action + "  " + "This Cuisine",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            if (cuisine_id) {
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                            "content"
                        ),
                    },
                    url: API_URL + "cuisine/change-status",
                    method: "post",
                    dataType: "json",
                    data: { cuisine_id, status },
                    method: "post",

                    success: function (data) {
                        // console.log(data)
                        if (data.status == "success") {
                            alertServiceFunction(
                                "Success",
                                data.msg,
                                "success"
                            );
                            // CuisineclearFilters()
                            handleList(cuisine_id);
                            // handleLoadDetails(null,id)

                            handleLoadDetails(null, cuisine_id);
                            // document.getElementById('cuisine_detail_container').innerHTML=`<h6 style="text-align: center;"> Please Select Category</h6>`
                        } else {
                            alertServiceFunction("Error", data.msg, "error");
                        }
                    },
                    error: function (err) {
                        alertServiceFunction(
                            "Error",
                            "Failed to Delete  Cuisine.",
                            "error"
                        );
                    },
                });
            }
        } else {
            // swal("Cancelled", "User status preserved", "warning");
            alertServiceFunction(
                "Cancelled",
                "Cuisine status preserved",
                "warning"
            );
        }
    });
};


// $('#cuisine_detail_container').empty().html(
//     `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`
// )
loadFristItem();


function countDesc(e, _this) {
    $('#count').text(_this.value.length);
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

function limitNumber(_this, _event, limit = 0) {
    let keyCode = [69, 109, 107, 110, 187, 189];
    if (keyCode.includes(_event.keyCode)) _event.preventDefault();
    let oldVal = parseInt(_this.value);
    let newVal = (oldVal * 10) + parseInt(_event.key);
    if (newVal > limit || newVal == 0) _event.preventDefault();
}