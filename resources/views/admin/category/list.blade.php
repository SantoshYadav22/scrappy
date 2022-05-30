@if (isset($category_list) && !empty($category_list))
@php
    // pr($category_list);
    $status_color = array("red","#25db25");
@endphp
@foreach ($category_list as $key => $val)
@if(isset($data['pageno']) && $data['pageno'] == 0 && $key == 0)
    <input type="hidden" value="{{ $val['cat_id'] ?? '' }}" name="first_chef_dish_id" id="first_chef_dish_id">
@endif
<?php
    $status = array("In-Active","Active");
?>
<input type="hidden"   value="{{ $val['cat_id'] ?? '' }}" name="first_chef_dish_id" id="first_chef_dish_id">
<div class="employee-box main-card mb-3 mt-2 card" id="task_list_{{ $val['cat_id'] ?? '' }}" style="cursor: pointer;" onclick="dish_details('{{ $val['cat_id'] ?? '' }}')">
    <div class="employee-head card-header remve_Active_color d-flex justify-content-between"
        id="employee_head_{{ $val['cat_id'] ?? 'N/A' }}">
        <div class="name">
            <span class="value">{{ $val['cat_name'] ?? 'N/A' }} ({{$val['cat_id'] ?? ''}})</span>
        </div>
        <div class="id" >
            <span class="">Status : </span>
            <span class="value"> @if (isset($val['is_active']) && $val['is_active'] >0)  {{ $status[$val['is_active']] ?? 'N/A' }} <i class="fa fa-circle" aria-hidden="true" style="color:{{ $status_color[$val['is_active']] }}"></i>@else

                In-Active <i class="fa fa-circle" aria-hidden="true" style="color:red"></i>@endif
            </span>
        </div>

    </div>
    <div class="detail justify-content-between p-2 ">
        <div class="corporate_logics_sub d-flex justify-content-between  align-items-center flex-wrap mb-2">

            <div>
                <span class="title1">Category Name : </span>
                <span class="value">
                   
                    {{ $val['cat_name'] ?? 'N/A'}}
                 

                </span>
            </div>
            <div class="">
                <span class="title1">Category Price:  </span>
                <span class="value">{{ $val['cat_price'] ?? 'N/A' }}</span>
            </div>

        </div>
     </div>
</div>

@endforeach

<script>

    var called = false;
    var pageNo = "{{ $data['pageno'] ?? '0' }}";
        $(document).ready(function () {

            if (called === false && pageNo == 0){
                var first_chef_dish_id = $("#first_chef_dish_id").val();
                if (first_chef_dish_id != '') {
                    called = true;
                    dish_details(first_chef_dish_id);
                }
                else{
                    $("#detail_view").empty().html(`<div class="employee-user-container"><div class="text-center" style="margin-top:140px;">
                    <h4 style="color:#ff5656;">Dish Details Not Found</h4>
                    </div></div>`);
                }
            }
        });
    </script>
@else
@endif
