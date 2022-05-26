// console.log('hello from catogary')
let cuisineArr=[]
let del_cuisine_id=[]
let del_cat_banner_img =[]
let del_cat_img =[]
var bnnr_temp_key = []
var cat_temp_key = []
var page=0
var enterKeyCountEdit = 0;

// $("#overflow-container-Cuisine").scroll(function () { //detect page scroll
//     var objDiv = document.getElementById("overflow-container-Cuisine");
//     console.log($(this).scrollTop() + $(this).innerHeight(), $(this)[0].scrollHeight);
//     if (Math.ceil($(this).scrollTop() + $(this).innerHeight()) >= $(this)[0].scrollHeight) { //if user scrolled from top to bottom of the page

//         cat_load_more(page); //load content

//     }
// });

// function cat_load_more(page1) {
//  page=page1+1
//     var cuisine_name = $("#filter_cuisine_name").val();
//     var is_active = $("#filter_is_active").val();
//     var cat_name=$("#filter_cat_name").val();


//     $.ajax({
//         headers: {
//             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//         },
//         url: API_URL +'category/search?page='+page,
//         method: "post",
//         dataType:'html',
//         data: { cuisine_name, is_active,cat_name},

//     }).done(function (data) {

//             if (data.length==0) {

//                 $('#list_end').empty().html("No more records!");
//                 return;
//             }

//             $("#cat_list").append(data); //append data into #results element
//             // console.log('data.length');
//             $('#list_end').empty().html(`<button type="button" onclick="cat_load_more(${page+1})" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)
//         })
//         .fail(function (jqXHR, ajaxOptions, thrownError) {
//             alert('No response from server');
//         });
// }
const loadFristItem_cat = () => {


    setTimeout(() => {
        let ele=document.getElementById("fristelement_cat").click()
    }, 200);
}


const handleLoadDetailsCategory=(ele,id)=>{
    if(ele !==null){

    let allcuisnes=document.getElementsByClassName('remve_Active_color')

    for (let index = 0; index < allcuisnes.length; index++) {
        const element = allcuisnes[index];
        // console.log(allcuisnes[index])
        element.style.backgroundImage = "none";

    }
    ele.style.backgroundImage = "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)";

    }

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        method: "post",
        url: API_URL+'category/single-data',


        dataType:'html',
        data:  {id:id},
        beforeSend: function () {
            $('#category_detail_container').empty().html(
                `<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"><br /><p>Please Wait Details...</p></div></div>`
            )
        },
        success: function (data) {

             $('#category_detail_container').empty().html(data)
        }
    });
}


// clear filetrs
const CatogeryclearFilters =()=>{
    $(".dropdown-menu").removeClass('show');
    $("#filter_cuisine_name").val('')
    $("#filter_cat_name").val('')
    $('#filter_is_active').val('')
    $("#filter_cuisine_id").val('')

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL +'category/clear-filters',
        method: "post",
        dataType:'html',

        success: function (data) {
            // console.log(data)
            if(data !==null && data !==''){
                document.getElementById('cat_list').innerHTML=data
                loadFristItem_cat()
                // cat_load_more=1
                page=0
                $("#list_end").html(`<button type="button" onclick="cat_load_more(${page+1})" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)
            }

        },  error: function (err) {
            alertServiceFunction("Error", "Failed to Clear  Filters.", "error");
        },
    });
}


// loadlist
const handleCatogeryList=(id)=>{
    let singleList=document.getElementById(id)
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL +'category/list',
        method: "post",
        dataType:'json',
        data:  {id:id},
        success: function (data) {
            console.log(data.data)
            singleList.innerHTML=`<span>
            ${data.data.cat_name} (${data.data.cat_id})
       </span>


       <span>
       Status: ${data.data.is_active==1 ?'Active':'In-active'}  <span style="color:${
        data.data.is_active==1 ?"#25db25":"red"

 };"> <i class=" fa fa-circle" aria-hidden="true" style="font-size:14px; color:${
    data.data.is_active==1 ?"#25db25":"red"

}"></i></span>
   </span>
       `
        }
    });
}

const handleAddCategorySubmit=()=>{

    // console.log('hello')
    event.preventDefault();
    var error=true

    let formData=new FormData(document.getElementById('addCategoryForm'));
    // var cuisine_name = formData.get("cuisine_name");
    let cuisine_id=document.getElementById('cuisine_id').value;
    if(!cuisine_id.length >  0){
        // document.getElementById('cuisine_id').required=true;
        $('#cuisine_id_error').fadeIn('slow').delay(4000).fadeOut('slow');
        // alertServiceFunction("Error", "Cuisine is Required", "error");
        return;
    }

    let cuisine_img=document.getElementById('cat_img').files
    let cuisine_banner_img=document.getElementById('cat_banner_img').files
    if(cuisine_img.length>5){

        alertServiceFunction("Error", "maximum 5 Catogery images allowd", "error");
        error=false
    }
    if(cuisine_banner_img.length>5){


        alertServiceFunction("Error", "maximum 5 Banner images allowd", "error");
        error=false
    }
    if(error){
        $('#add_cate_submit_div').html(`<img height="" width=""  src="images/spinner.gif" alt="">`);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL+'category/add',
        type: 'POST',
        data:  formData,
        dataType:'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data)

            if(data.status=='success'){
                alertServiceFunction("Success", data.msg, "success");
                // resetForm()
                // CuisineclearFilters()
                CatogeryclearFilters()

                $('#addCatogery_close_modal').click()
                resetForm();

            }
            // else if(data.status=='Unsuccess'){
            //     alertServiceFunction("Unsuccess", data.msg, "error");
            //     $('#add_cate_submit_div').html(`
            //     <button type="submit" onsubmit="handleAddCategorySubmit();" class="btn btn-success flex-center btn-sm">Add</button>
            //     <button type="button" class="btn btn-secondary flex-center btn-sm"
            //         data-dismiss="modal">Close</button>
            //     `)

            // }
            else {
                alertServiceFunction("Error", data.msg, "error");
                document.getElementsByClassName("cuisine_id").required =true;

            }
            $('#add_cate_submit_div').html(`
            <button type="submit" class="btn btn-success  flex-center btn-sm">Submit</button>
            <button type="button" class="btn btn-secondary flex-center btn-sm"
                data-dismiss="modal">Close</button>
            `)
        }
    });
}

}

const handleCusineInputList=()=>{
    let cuisine_id=document.getElementById('cuisine_id').value

    if(!cuisineArr.includes(cuisine_id)){
        cuisineArr.push(cuisine_id)
    }




}






const handleEditCategory=(id)=>{

    console.log(id)
   let modal=document.getElementById('modal_body_category')
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url:API_URL+ 'category/edit',
        method: "post",
        dataType:'html',
        data:  {id:id},
        success: function (data) {
            modal.innerHTML=data
            $("#cuisine_idEdit").chosen({no_results_text: "Oops, No Cuisine Found!"})
            // $("#cuisine_idEdit").chosen({no_results_text: "Oops, No Cuisine Found!"})

        }
    });
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL +'category/list',
        method: "post",
        dataType:'json',
        data:  {id:id},
        success: function (data) {
            // console.log(data.data)
            var arr=data.data.cuisine_id.split(",")

            if(arr.length>0){

                // $("#cuisine_idEdit").chosen("destroy");
                $("#cuisine_idEdit").chosen({no_results_text: "Oops, No Cuisine Found!"})


                setTimeout(() => {
                    $('#cuisine_idEdit').val(arr).trigger("chosen:updated");
                }, 500);

            // console.log("updated")
            }
            // $('#cuisine_idEdit').val(arr).trigger("chosen:updated");
        }

    });

}

const handleUnmapCusineFromCat =(id)=>{
    console.log(id)
    del_cuisine_id.push(id)
    document.getElementById(id).style.opacity="0.5"
}

const handleDeleteCatogeryImages=(id)=>{
    document.getElementById(`img${id}`).style.opacity="0.5";
    console.log(id)
    del_cat_img.push(id)
}
const handleDeleteCatogeryBannerImages=(id)=>{
    document.getElementById(`banner${id}`).style.opacity="0.5";
    del_cat_banner_img.push(id)

    console.log(id)

}



const handleEditCategorySubmit=(id)=>{
    event.preventDefault();
    let formData=new FormData(document.getElementById('EditCatogery'));
    let cuisine_id=document.getElementById('cuisine_idEdit').value;
    if(!cuisine_id.length >  0){
        // document.getElementById('cuisine_id').required=true;
        $('#cuisine_edit_id_error').fadeIn('slow').delay(4000).fadeOut('slow');
        // alertServiceFunction("Error", "Cuisine is Required", "error");
        return;
    }
    formData.append('cat_id',id)
    if(del_cat_img.length>0){
        formData.append('del_cat_img',del_cat_img.toString())

    }
    if(del_cat_banner_img.length>0){
        formData.append('del_cat_banner_img',del_cat_banner_img.toString())

    }
    if(del_cuisine_id.length>0){
        formData.append('del_cuisine_id',del_cuisine_id.toString())

    }

    $("#add_cate_submit_div").html(
        `<img height="30" width="30"  src="images/spinner.gif" alt="">`
    );
    // var cuisine_name = formData.get("cuisine_name");
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: API_URL+'category/submit',
        type: 'POST',
        data:  formData,
        dataType:'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            // console.log(data)
            if(data.status=='success'){
                alertServiceFunction("Success", data.msg, "success");
                // resetForm()

                handleCatogeryList(id)
                handleLoadDetailsCategory(null,id)
                del_cat_img=[]
                del_cat_banner_img=[]
                del_cuisine_id=[]
                $('#EditCatogeryModalCloseButton').click()
            }
            else {
                alertServiceFunction("Error", data.msg, "error");
            }
            $("#add_cate_submit_div")
    .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>
<button type="button" class="btn btn-secondary flex-center btn-sm"
    data-dismiss="modal">Close</button>`);
        },
        error: function (err) {
            alertServiceFunction("Error", "Failed to Edit  Cuisine.", "error");
        },

    });

}

const handleSearchbarCatogery=()=>{
    $(".dropdown-menu").removeClass('show');
    var cuisine_name = $("#filter_cuisine_name").val();
    var is_active = $("#filter_is_active").val();
    var cat_name=$("#filter_cat_name").val();
    var filter_cuisine_id = $("#filter_cuisine_id").val();




        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: API_URL +'category/search',
            method: "post",
            dataType:'html',
            data:  {cuisine_name,is_active,cat_name,filter_cuisine_id},
            beforeSend:function (){
                $('#list_end').empty()
                document.getElementById('cat_list').innerHTML=`<div class="employee-user-container"><div class="text-center" style="margin-top:100px;"><img src="${API_URL}images/icon/spinner.gif"></div></div>`
            },
            success: function (data) {
                // console.log(data)
                $("#overflow-container-Cuisine").animate({
                    scrollTop: 0
                }, 500);
                if (data.length == 0) {

                    $('#list_end_add').empty().html(`
                    <div class="text-center" style="margin-top:100px;"><img style="width:200px; height:200px;" src="${API_URL}images/no_user.png">
                        <h6 style="color:#262728;"><b>There is no such Category!</b></h6>
                        </div>`);
                    $("#cat_list").empty()
                    $("#category_detail_container").empty().html(`<div class="text-center" style="margin-top:100px;">
                    <h4 style="color:#d92550; padding-top:130px;"><b>Category Details Not Found!</b></h4>                                     </div>`)
                    return;
                }
                loadFristItem_cat()
                $("#cat_list").html(data)
                $("#list_end").html(`<button type="button" onclick="cat_load_more(1)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>`)



            },  error: function (err) {
                alertServiceFunction("Error", "Failed to Search Cuisine.", "error");
            },
        });
}


// delete category details
const handleDeleteCategory=(cat_id,status)=>{

    if (status == 1) var action = 'Active';
    else var action = 'In-Active';


    swal({
        title: "Are You Sure ?",
        text: "You Want to " + action +"  "+ "This Category",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
        if(cat_id  ){
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: API_URL +'category/change-status',
                method: "post",
                dataType:'json',
                data:  {cat_id,status},
                method: "post",

                success: function (data) {
                    // console.log(data)
                    if(data.status=='success'){
                        alertServiceFunction("Success", data.msg, "success");
                        // CatogeryclearFilters()
                        handleCatogeryList(cat_id)
                        handleLoadDetailsCategory(null,cat_id)
                        // document.getElementById('cuisine_detail_container').innerHTML=`<h6 style="text-align: center;"> Please Select Category</h6>`

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

    alertServiceFunction("Cancelled", "Category status preserved", "warning");
}
});



}


let errorStack=[]

const handleFileSize=(type)=>{
    if(type==1){
        let input_files=document.getElementById("cat_img").files;
        if(input_files.length>0){
            for (let index = 0; index < input_files.length; index++) {
                const element = input_files[index];
                if(element.size>1000*1024){
                    console.log(element.size)
                    // errorStack.push(`You exced Max File size,(max Size 1mb)  ${element.name}`)
                    document.getElementById('cat_img_error').innerHTML=`You exced Max File size,(max Size 1mb)  ${element.name}`
                    setTimeout(() => {
                        document.getElementById('cat_img_error').innerHTML=""
                    }, 3000);
                }


            }
        }

    }
    if(type==2){
        let input_files=document.getElementById("cat_banner_img").files
    }


}



const handleDeleteCatImages=(img, id="cat_img", div="img_div")=>{
    if(img != ''){
        // console.log('deelting',img)
        var name = img.split('.')[0];
        var str_name = name.replace(/[\(\)\- ]/gm, '');
        $("#cat_img_"+str_name).remove();
        $("#cat_img_btn_"+str_name).remove();
        var prev_img = $("#del_cat_img").val();
        if(prev_img != '') var images = prev_img.split(',');
        else var images = [];
        images.push(img);
        del_cat_img.push(img);
        $("#del_cat_img").val(images.join(","));
        var img_length = document.getElementById(div).getElementsByTagName('img');
        console.log(img_length.length);
        if(img_length.length > 0){
            $("#"+id).prop('required',false);
        }
        else{
            $("#"+id).prop('required',true);
            $("#"+id).val('');
        }
    }
}

const handleDeleteCatBannerImages=(img, id="cat_banner_img", div="bnnr_img_div")=>{
    if(img != ''){
        // console.log('deelting Banner',img)
        var name = img.split('.')[0];
        var str_name = name.replace(/[\(\)\- ]/gm, '');
        // console.log("chef_dish_banner_img_"+str_name);
        $("#cat_banner_img_"+str_name).remove();
        $("#cat_banner_img_btn_"+str_name).remove();
        var prev_img = $("#del_cat_banner_img").val();
        if(prev_img != '') var images = prev_img.split(',');
        else var images = [];
        images.push(img);
        del_cat_banner_img.push(img);
        $("#del_cat_banner_img").val(images.join(","));
        var img_length = document.getElementById(div).getElementsByTagName('img');
        console.log(img_length);
        if(img_length.length > 0){
            $("#"+id).prop('required',false);
        }
        else{
            $("#"+id).prop('required',true);
            $("#"+id).val('');
        }

    }
}

function preview_img(id,div){
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
                alertServiceFunction("Error", `You can only add ${5-alreadyUploaded} more images for Category.`, "error");
            } else {
                alertServiceFunction("Error", "You can only add 5 images for Category.", "error");
            }
            return;
        }
        $.each(cat_temp_key, function (index, val1) {
            $("#cat_img_"+val1).remove();
            $("#cat_img_btn_"+val1).remove();
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
                            $("#" + div).append(`<img  class="m-1 dishEditImg thumbnail" id="cat_img_${file.lastModified}" src="${e.target.result}" alt="" style="height:80px;width:80;">
                            <i class="fas fa-trash-alt" id="cat_img_btn_${file.lastModified}" onclick="DeleteCatTempImages('${file.lastModified}','${id}','${div}')"></i>`);
                            // $("#" + div).css({ "background-image": "url(" + e.target.result + ")", "background-size": "70px", "cursor": "pointer" });
                            // $('#' + div).attr('onclick', 'zoom_image("' + e.target.result + '")');
                            cat_temp_key.push(file.lastModified);
                        };
                    })(file);
                    fRead.readAsDataURL(file); //URL representing the file's data.
                } else {
                    $('#upload_content').val("");
                    alertServiceFunction("Error", "Image size must upto 5 MB", "error");
                    return false;
                }
            } else {
                $('#upload_content').val("");
                alertServiceFunction("Error", "File Type must be Image.", "error");
                return false;
            }
        });
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
                alertServiceFunction("Error", `You can only add ${5-alreadyUploaded} more images for Category Banner.`, "error");
            } else {
                alertServiceFunction("Error", "You can only add 5 images for Category Banner.", "error");
            }
            return;
        }
        // var img_length = document.getElementById('bnnr_img_div').getElementsByTagName('img');
        // if((img_length+data.length) > 5){
        //     alertServiceFunction("Error", "You can upload 5 Images only.", "error");
        //     return;
        // }
        // else{
            //check File API supported browser
            // console.log(data);

            $.each(bnnr_temp_key, function (index, val1) {
                $("#cat_banner_img_"+val1).remove();
                $("#cat_banner_img_btn_"+val1).remove();
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
                                $("#" + div).append(`<img  class="m-1 dishEditImg thumbnail" id="cat_banner_img_${file.lastModified}" src="${e.target.result}" alt="" style="height:80px;width:80;">
                                <i class="fas fa-trash-alt" id="cat_banner_img_btn_${file.lastModified}" onclick="DeleteCatTempBannerImages('${file.lastModified}','${id}','${div}')"></i>`);
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
    } else {
        alertServiceFunction("Error", "Your browser doesn't support File API!", "error"); //if File API is absent
    }
}

function DeleteCatTempImages(img, id, div){
    // console.log("img->",img);
    $("#cat_img_"+img).remove();
    $("#cat_img_btn_"+img).remove();
    del_cat_img.push(img);
    var img_length = document.getElementById(div).getElementsByTagName('img');
    console.log(img_length.length);
    if(img_length.length > 0){
        $('#'+id).prop('required',false);
    }
    else{
        $('#'+id).prop('required',true);
        $('#'+id).val('');
    }
}

function DeleteCatTempBannerImages(img, id, div){
    $("#cat_banner_img_"+img).remove();
    $("#cat_banner_img_btn_"+img).remove();
    del_cat_banner_img.push(img);
    var img_length = document.getElementById(div).getElementsByTagName('img');
    console.log(img_length.length);
    if(img_length.length > 0){
        $('#'+id).prop('required',false);
    }
    else{
        $('#'+id).prop('required',true);
        $('#'+id).val('');
    }
}

loadFristItem_cat()





$(".alphabates").alphanum({
allowSpace: true, // Allow the space character
allowUpper: true,  // Allow Upper Case characters
maxLength : 30,    // eg Max Length
allowNumeric : false  // Allow digits 0-9
});

$(".newmeric").alphanum({
allowSpace: false, // Allow the space character
allowUpper: false,  // Allow Upper Case characters
maxLength : 10,    // eg Max Length
allowLatin : false, // a-z A-Z
allowNumeric : true  // Allow digits 0-9
});

$(".Geo_newmeric").alphanum({
    allowSpace: false, // Allow the space character
    allowUpper: false,  // Allow Upper Case characters
    maxLength : 10,    // eg Max Length
    allowLatin : false, // a-z A-Z
    allowNumeric : true,  // Allow digits 0-9
    allow:'.'
    });

$(".alphanewmeric").alphanum({
allowSpace         : true,  // Allow the space character
allowNewline       : true,  // Allow the newline character \n ascii 10
allowNumeric       : true,  // Allow digits 0-9
allowUpper         : true,  // Allow upper case characters
allowLower         : true,  // Allow lower case characters
allowLatin         : true,  // a-z A-Z
forceUpper         : false, // Convert lower case characters to upper case
forceLower         : false, // Convert upper case characters to lower case
maxLength          : 20    // eg Max Length
});

$(".alpha_newmeric").alphanum({
allowSpace         : true,  // Allow the space character
allow              : '_',  // Allow
allowNewline       : true,  // Allow the newline character \n ascii 10
allowNumeric       : true,  // Allow digits 0-9
allowUpper         : true,  // Allow upper case characters
allowLower         : true,  // Allow lower case characters
allowLatin         : true,  // a-z A-Z
forceUpper         : false, // Convert lower case characters to upper case
forceLower         : false, // Convert upper case characters to lower case
maxLength          : 50  ,  // eg Max Length
allow              : '-',
allow              : '.',
allow              : '/(){}[]|'
});


$(".alphanewmeric_desc").alphanum({
    allowSpace         : true,  // Allow the space character
    allowNewline       : true,  // Allow the newline character \n ascii 10
    allowNumeric       : true,  // Allow digits 0-9
    allowUpper         : true,  // Allow upper case characters
    allowLower         : true,  // Allow lower case characters
    allowLatin         : true,  // a-z A-Z
    forceUpper         : false, // Convert lower case characters to upper case
    forceLower         : false, // Convert upper case characters to lower case
    maxLength          : 300    // eg Max Length
    });


function countDesc(e, _this) {
    $('#count2').text(_this.value.length);
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
    let keyCode = [69, 109, 110, 189];
    if (keyCode.includes(_event.keyCode)) _event.preventDefault();
    let oldVal = parseInt(_this.value);
    let newVal = (oldVal * 10) + parseInt(_event.key);
    if (newVal > limit || newVal == 0) _event.preventDefault();
}
