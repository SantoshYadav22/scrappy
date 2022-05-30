<?php
// pr($school_data);
// pr($uom_type);die();
?>
<div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle">{{ $title ?? '' }} </h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="modal-body">
    <div class="section-wrap add-employee-managment-wrap section-padding overflow-container">
        <div class="profile_container" style="padding: 10px 0px;">
            <form method="" action="javascript:void(0)" name="school_form" id="school_form">
                @csrf
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="position-relative row form-group">
                                    <label class="col-sm-5 col-form-label" for="sch_name">School Name<span style="color:red;">*</span></label>
                                    <div class="col-sm-7">
                                        <input type="text" value="{{ $school_data['sch_name'] ?? '' }}" placeholder="School Name" class="form-control alphabates" name="sch_name" id="sch_name" minlength="10" maxlength="60" required>
                                        <input type="hidden" name="sch_id" id="sch_id" value="{{ $school_data['sch_id'] ?? '' }}">

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="position-relative row form-group">
                                    <label class="col-sm-5 col-form-label" for="area"> Area<span style="color:red;">*</span></label>
                                    <div class="col-sm-7">
                                        <input type="text" value="{{ $school_data['area'] ?? '' }}" placeholder=" Area" class="form-control alphabates" name="area" id="area" minlength="10" maxlength="30" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="position-relative row form-group">
                                    <label class="col-sm-5 col-form-label" for="ward">Ward No.<span style="color:red;">*</span></label>
                                    <div class="col-sm-7">
                                        <input required type="text" value="{{ $school_data['ward'] ?? '' }}" placeholder="Ward No." class="form-control alphabates" name="ward" id="ward" >
                                      
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="position-relative row form-group">
                                    <label class="col-sm-5 col-form-label" for="pincode">Pincode<span style="color:red;">*</span></label>
                                    <div class="col-sm-7">
                                        <input required type="text" value="{{ $school_data['pincode'] ?? '' }}" placeholder="Pincode" class="form-control newmeric" maxlength="6" name="pincode" id="pincode" >
                                      
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="position-relative row form-group">
                                    <label class="col-sm-5 col-form-label" for="lat">Latitude<span style="color:red;">*</span></label>
                                    <div class="col-sm-7">
                                        <input required type="text" value="{{ $school_data['lat'] ?? '' }}" placeholder="lat" class="form-control newmeric" name="lat" id="lat" >
                                      
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="position-relative row form-group">
                                    <label class="col-sm-5 col-form-label" for="long">Longnitude<span style="color:red;">*</span></label>
                                    <div class="col-sm-7">
                                        <input required type="text" value="{{ $school_data['long'] ?? '' }}" placeholder="Longnitude" class="form-control newmeric" name="long" id="long" >
                                      
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                        
                        
                        <div class="row">
                            <input type="hidden" name="action" id="action" value="{{ $action }}">

                            <div class="col-lg-12 text-center" id="add_dish_submit_div">
                                <input type="submit" class="btn btn-success" id="form_submit_btn" name="form_submit_btn" value="Submit">
                                <button type="button" class="btn btn-secondary flex-center " data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!--  jquery script  -->
<script src="http://code.jquery.com/jquery-3.2.1.min.js"></script>
<!--  validation script  -->
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.19.0/jquery.validate.min.js"></script>

<!--  jsrender script  -->
<script src="http://cdn.syncfusion.com/js/assets/external/jsrender.min.js"></script>

<!-- Essential JS UI widget -->
<script src="http://cdn.syncfusion.com/16.4.0.52/js/web/ej.web.all.min.js"></script>
<script src="{{asset('js/jquery.alphanum.js')}}"></script>
<script>
    $(".alphabates").alphanum({
        allowSpace: true, // Allow the space character
        allowUpper: true,  // Allow Upper Case characters
        maxLength: 25,    // eg Max Length
        allowNumeric: false,  // Allow digits 0-9
    });

    $(".newmeric").alphanum({
        allowSpace: false, // Allow the space character
        allowUpper: false,  // Allow Upper Case characters
        maxLength: 10,    // eg Max Length
        allowLatin: false, // a-z A-Z
        // max:10,
        allowNumeric: true  // Allow digits 0-9
    });

    $(".decimal").numeric({
        allowDecSep: true,  //
        maxDigits: 7,
        maxDecimalPlaces: 2,
        maxPreDecimalPlaces: 4,
        max: 5000,
        min: 1,
        allowNumeric: true  // Allow digits 0-9
    });

    $(".priority").numeric({
        allowDecSep: false,  //
        maxDigits: 2,
        max: 10,
        min: 1,
        allowNumeric: true  // Allow digits 0-9
    });

    $(".time").numeric({
        allowDecSep: true,  //
        maxDigits: 5,
        maxDecimalPlaces: 2,
        maxPreDecimalPlaces: 2,
        max: 24,
        min: 1,
        allowNumeric: true  // Allow digits 0-9
    });

    $(".dish_qty").numeric({
        allowDecSep: true,  //
        maxDigits: 6,
        maxDecimalPlaces: 3,
        maxPreDecimalPlaces: 3,
        max: 999,
        min: 1,
        allowNumeric: true  // Allow digits 0-9
    });

    $(".max_qty").numeric({
        allowDecSep: true,  //
        maxDigits: 6,
        maxDecimalPlaces: 3,
        maxPreDecimalPlaces: 3,
        max: 999,
        min: 1,
        allowNumeric: true  // Allow digits 0-9
    });

    $(".spice_level").numeric({
        allowDecSep: false,  //
        maxDigits: 3,
        max: 5,
        allowPlus: false, // Allow the + sign
        allowMinus: false,
        min: 1,
        allowNumeric: true  // Allow digits 0-9
    });

    $(".serves_level").numeric({
        allowDecSep: false,  //
        maxDigits: 3,
        max: 100,
        allowPlus: false, // Allow the + sign
        allowMinus: false,
        min: 1,
        allowNumeric: true  // Allow digits 0-9
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
        maxLength: 50    // eg Max Length
    });

   


    $(document).ready(function () {

        $('#school_form').on('submit', function (event) {
            event.preventDefault();
            // console.log("ew");
            var form_data = new FormData($("#school_form")[0]);
            var sch_id = $("#sch_id").val();

            // let mobileRegx = /^([0|\+[0-9]{1,5})?([0-9]{10,13})$/;
     
            var action = $("#action").val();

                $.ajax({
                    method: "POST",
                    url: API_URL + "school/submit",
                    data: form_data,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status == "200") {
                            $('#add_form_modal').click();

                            alertServiceFunction("Success", res.message, "success");
                            // window.location.href = API_URL + 'users';
                            $('#school_form')[0].reset();
                            if (action == 'edit') {
                                // alert('hell')
                                get_single_dish_list(sch_id);
                                dish_details(sch_id);
                            } else dish_list();
                            $("#add_dish_submit_div")
                                .html(`<button type="submit" class="btn btn-success flex-center btn-sm">Submit</button>`);
                        } else {
                            alertServiceFunction("Error", res.message, "error");
                            $("#add_dish_submit_div").html(`
                                <input type="submit" class="btn btn-success" id="form_submit_btn" name="form_submit_btn" value="Submit">
                                <button type="button"  class="btn btn-secondary flex-center " data-dismiss="modal">Close</button>
                            </div>`);
                        }
                    },
                    error: function (err) {
                        alertServiceFunction("Error", "Data Upload Error, Please Contact Administrator .", "error");
                        $("#add_dish_submit_div").html(`
                                <input type="submit" class="btn btn-success" id="form_submit_btn" name="form_submit_btn" value="Submit">
                                <button type="button"  class="btn btn-secondary flex-center " data-dismiss="modal">Close</button>
                            </div>`);
                    },
                });
          
        });
    });



</script>
