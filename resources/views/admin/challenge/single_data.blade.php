@if (isset($challenge_data) && !empty($challenge_data))
<?php 
    $status = array("In-Active","Active", "Registered", "Not Registered");
    $work_status = array("","Online", "Offline");
    $status_color = array("red","#25db25");
?>
    <div class="employee-head card-header remve_Active_color d-flex justify-content-between"
    id="employee_head_{{ $challenge_data['challenge_id'] ?? 'N/A' }}" style="background-image: linear-gradient(120deg, rgb(132, 250, 176) 0%, rgb(143, 211, 244) 100%);">
    <div class="name">
        <span class="value">{{ $challenge_data['name'] ?? 'N/A' }} ({{$challenge_data['challenge_id'] ?? ''}})</span>
    </div>
    <div class="id" >
        <span class="">Status : </span>
        <span class="value"> @if (isset($challenge_data['is_active']) && $challenge_data['is_active'] >0)  {{ $status[$challenge_data['is_active']] ?? 'N/A' }} <i class="fa fa-circle" aria-hidden="true" style="color:{{ $status_color[$challenge_data['is_active']] }}"></i>@else 
            
            In-Active <i class="fa fa-circle" aria-hidden="true" style="color:red"></i>@endif
        </span>
    </div>

</div>
<div class="detail justify-content-between p-2 ">
    <div class="corporate_logics_sub d-flex justify-content-between  align-items-center flex-wrap mb-2">
        
        <div>
            <span class="title1">Name : </span>
            <span class="value">
                @if(isset($challenge_data['name']) && !empty($challenge_data['name']))
                {{-- @foreach ($challenge_data['name'] as $key => $cat)
                @if($key == 0 ) {{ $cat['name'] ?? ''}} @endif            
                @endforeach --}}
                {{ $challenge_data['name'] ?? 'N/A' }}
                @endif
                {{-- {{ $challenge_data['dish_qty'] ?? 'N/A' }} gm --}}
            </span>
        </div>
        <div class="">
            <span class="title1">Category : </span> 
            <span class="value">{{ $challenge_data['category'] ?? 'N/A' }}</span>
        </div>
        
        
    </div>


    <div class="corporate_logics_sub d-flex justify-content-between flex-wrap mb-2">
        <div>
            <span class="title1">Area: </span>
            <span class="value">
             
                {{ $challenge_data['area'] ?? 'N/A' }}
               
            </span>
        </div>
        <div class="">
            <span class="title1">Ward :  </span>
            <span class="value">{{ $challenge_data['ward'] ?? 'N/A' }} </span>
        </div>
    </div>
</div>
@endif