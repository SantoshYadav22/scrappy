@if (isset($product_data) && !empty($product_data))
<?php 
    $status = array("In-Active","Active", "Registered", "Not Registered");
    $work_status = array("","Online", "Offline");
    $status_color = array("red","#25db25");
?>
    <div class="employee-head card-header remve_Active_color d-flex justify-content-between"
    id="employee_head_{{ $product_data['prod_id'] ?? 'N/A' }}" style="background-image: linear-gradient(120deg, rgb(132, 250, 176) 0%, rgb(143, 211, 244) 100%);">
    <div class="name">
        <span class="value">{{ $product_data['prod_name'] ?? 'N/A' }} ({{$product_data['prod_id'] ?? ''}})</span>
    </div>
    <div class="id" >
        <span class="">Status : </span>
        <span class="value"> @if (isset($product_data['is_active']) && $product_data['is_active'] >0)  {{ $status[$product_data['is_active']] ?? 'N/A' }} <i class="fa fa-circle" aria-hidden="true" style="color:{{ $status_color[$product_data['is_active']] }}"></i>@else 
            
            In-Active <i class="fa fa-circle" aria-hidden="true" style="color:red"></i>@endif
        </span>
    </div>

</div>
<div class="detail justify-content-between p-2 ">
    <div class="corporate_logics_sub d-flex justify-content-between  align-items-center flex-wrap mb-2">
        
        <div>
            <span class="title1">Product Name : </span>
            <span class="value">
                @if(isset($product_data['prod_name']) && !empty($product_data['prod_name']))
                {{-- @foreach ($product_data['prod_name'] as $key => $cat)
                @if($key == 0 ) {{ $cat['name'] ?? ''}} @endif            
                @endforeach --}}
                {{ $product_data['prod_name'] ?? 'N/A' }}
                @endif
                {{-- {{ $product_data['dish_qty'] ?? 'N/A' }} gm --}}
            </span>
        </div>
        <div class="">
            <span class="title1">Category ID:  </span>
            <span class="value">{{ $product_data['cat_id'] ?? 'N/A' }} </span>
        </div>
        
    </div>


    <div class="corporate_logics_sub d-flex justify-content-between flex-wrap mb-2">
        <div>
            <span class="title1">Product ID: </span>
            <span class="value">
             
                {{ $product_data['prod_id'] ?? 'N/A' }}
               
            </span>
        </div>
        <div class="">
            {{-- <span class="title1">Course Type : </span>  --}}
            {{-- <span class="value">{{ $product_data['pincode'] ?? 'N/A' }}</span> --}}
        </div>
    </div>
</div>
@endif