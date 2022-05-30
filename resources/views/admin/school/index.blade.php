@extends('layouts.admin_app')
    @section("site-title", "School Management")
    @section("main-content-title", "School Management")

@section('styles')
<style>
    .bulk_upload{
        position: relative;
        overflow: hidden;
    }
    .upload_file{
        position: absolute;
        font-size: 50px;
        opacity: 0;
        right: 0;
        top: 0;
    }
    .click-img:active {
            transform: scale(0.90);
    }
    .index_cuisine_list_containter{
        overflow:auto; 
        resize:horizontal;
    height: 75vh;
    /* widows: ; */
    width: 50%;
    min-width: 30%;
    max-width: 50%;
    position: relative;
 
    padding-right: 15px;
    padding-left: 15px;
}
.main_container{
    display: flex;
        flex-wrap: nowrap;
}
#cuisine_detail_container{
    overflow:hidden; 
        resize:horizontal;
    height: 75vh;
    /* widows: ; */
    width: 50%;
    min-width: 50%;
    max-width: auto;
    position: relative;
 
    padding-right: 15px;
    padding-left: 15px;
}
.cusinedetails{
    height: 86vh;
}
.card.mb-3 {
    margin-bottom: 5px !important;


}
.btn_color{
    background: #16aaff;
    color:white;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.cusinedetails_header {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    
}
.cuisine_banner_img {
    opacity: 0.6;

}
.cuisine_details_img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
}
@media only screen and (max-width: 768px) {
  .cuisine_details_img{
      height: 100px;
      width: 100px;

  }
}

.chip{
    display: inline-flex;
    flex-direction: row;
    background-color: #e5e5e5;
    border: none;
    cursor: default;
    height: 25px;
    outline: none;
    padding: 0;
    font-size: 14px;
    font-color: #333333;
    font-family:"Open Sans", sans-serif;
    white-space: nowrap;
    align-items: center;
    border-radius: 16px;
    vertical-align: middle;
    text-decoration: none;
    justify-content: center;
    background: linear-gradient(108.17deg, #16D9E3 28.33%, rgba(48, 199, 236, 0.96) 50.34%, #46AEF7 70.84%);

}

.chip-content{
    cursor: inherit;
    display: flex;
    align-items: center;
    user-select: none;
    white-space: nowrap;
    padding-left: 12px;
    padding-right: 12px;
    
}
.zoom {
        -webkit-transition: all 0.35s ease-in-out;
        -moz-transition: all 0.35s ease-in-out;
        transition: all 0.35s ease-in-out;
        cursor: -webkit-zoom-in;
        cursor: -moz-zoom-in;
        cursor: zoom-in;
    }

    .zoom:hover,
    .zoom:active,
    .zoom:focus {
        /**adjust scale to desired size, 
        add browser prefixes**/
        -ms-transform: scale(2.0);
        -moz-transform: scale(2.0);
        -webkit-transform: scale(2.0);
        -o-transform: scale(2.0);
        transform: scale(2.0);
        position: relative;
        z-index: 100000;
        box-shadow: 0px 10px 15px 15px rgba(157, 155, 155, 0.36) !important;
    }
    .title{
        /* font-weight: bold;
        display: inline-flex;
        width: 150px; */
        /* font-family: 'Roboto'; */
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;

        color: #555F78;
    }

    .title1{
        font-weight: bold;
        display: inline-flex;
        /* width: 100px; */
    }
    .border_color{
        border: 2px solid rgba(22, 217, 227, 1);
    }

    .incolor {
        background: #F3F0FF;
        justify-content: center;
        justify-items: center;
        padding-bottom: 3px;
        padding-left: 4px;
    
    }
</style>
@endsection

@section('content')
<?php

    $status = array(1=>"Active", 0=>"In-Active");
    $work_status = array("","Online", "Offline"); 
    // $status_list = array("","Draft", "New", "Confirmed / Assigned", "At pick up Location", "Picked Up", "At Drop Location", "Delivered", "Refused by SuperSnap", "Cancelled before Assignment by customer", "Cancelled by customer after cancellation", "Cancelled by Delivery Man", "Cancelled by customer after pickup", "Returned to customer");
?>
<div class="app-main__inner">          
    <div class="row">
        <div class="col-lg-5 col-padding-right-0 pr-1" style="border-right: 1px solid #DEDFE0;">
            <div class="employee__managment-container" style="padding-top: 0.5rem;">
                <div class="employee__managment-head d-flex align-items-center justify-content-between" style="padding-bottom: 0.5rem;">
                    <div class="employee__managment-left">
                        <button class="btn-shadow btn btn-info" onclick="get_add_dish()" data-toggle="modal" data-target="#add_form_modal" style="width:80px"> 
                            <span class="btn-icon-wrapper pr-2 opacity-7">
                                <i class="fa fa-plus fa-w-20"></i>
                            </span> Add </button>
                    </div>
                    <div class="employee__managment-right d-inline-flex align-items-center">
                        <div class="filters">
                            <button class="btn btn-light" id="dropdownMenuButton2" data-toggle="dropdown"><img
                                    src="{{asset('images/employees/filter.svg')}}" alt="filter"> FILTERS</button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2" style="padding: 15px;width: 550px;">

                                <form method="" action="javascript:void(0);">
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="filter_school_name">School Name</label>
                                                <input type="text" class="form-control alphabates" placeholder="School Name" id="filter_school_name" name="filter_school_name" maxlength="50">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="filter_ward_name">Ward No.</label>
                                                <input type="text" class="form-control newmwric" placeholder="Ward No." id="filter_ward_name" name="filter_ward_name" maxlength="10">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="filter_area">Area</label>
                                                <input type="text" class="form-control alphabates" placeholder="Area" id="filter_area" name="filter_area" maxlength="30">
                                            </div>
                                        </div>
                                       
                                  
                                        <div class="col-md-6">
                                            <div class="position-relative form-group">
                                                <label for="filter_pincode">Pincode</label>
                                                <input type="text" class="form-control newmeric" placeholder="Pincode" id="filter_pincode" name="filter_pincode" maxlength="6">

                                            </div>
                                        </div>
                                       
                                        
                                    </div>
                                
                                    <div class="filter__dropdown__footer text-center">
                                        <button class="clear btn btn_color" onclick="reset_dish_list()">CLEAR ALL</button>
                                        <button class="apply btn btn_color" onclick="dish_list()">APPLY FILTERS</button>
                                    </div>
                                    <div class="clearfix"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="type" id="type" value="notAssign">
                <input type="hidden" name="userType" id="userType" value="">
                <div class="scroll-area-md" style="height: calc(100vh - 122px);border-top: 1px solid #ddd;">
                    <div class="scrollbar-container ps--active-y ps" id="overflow-container-list" >
                        <div id="list_view" style="padding: 1px;">
                            
                        </div>
                        <div class="col-lg-12 text-center" id="list_end">
                            <button type="button" onclick="load_more(0)" id="load_more_btn" class=" btn btn-info add_emp_btn">Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-7 p-0" id="detail_view" >
                
        </div>
        </div> 
    </div>
</div>

@endsection

@section('footer')

<script src="{{asset('js/school.js')}}"></script>
    
<script>
    console.log(API_URL)
    dish_list();

</script>
        {{-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA51mrApyvcRKhbVTm5hQgpsWEUVF3aCTI&callback=getData" async defer></script> --}}
@endsection

<div class="modal fade bd-example-modal-lg" id="add_form_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body"id="add_form_view" style="padding:0;">
                
            </div>
        </div>
    </div>
</div>
