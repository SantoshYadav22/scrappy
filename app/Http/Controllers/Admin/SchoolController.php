<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use DB;
use Session;
use App\Models\user;

use Illuminate\Support\Str;
use Aws\S3\S3Client;
class SchoolController extends Controller
{
    function index(){
        $title = 'School Management';
        // $course_type = PLTCommon::where('plt_name','course_type')->where('is_active',1)->get();
        return view('admin.school.index',['title'=>$title]);
    }

    function add(Request $request){
        // $token=Session::get('login_token');

        $title = 'Add School';
        $action = 'add';
      

        // pr($result);die();
        return view('admin.school.add',['title'=>$title,'action'=>$action])->render();
        // return view('admin.dish.add',['title'=>$title,'action'=>$action])->render();
    }

    function submit(Request $request){
        // dd(Session::all());die();
        // print_r($request->all());die();
     $token=Session::get('token');
        // pr($token);die();
        $data = array(
            // 'sch_id' => trim($request->post('sch_id')),

            'sch_name' => trim($request->post('sch_name')),
            'ward' => trim($request->post('ward')),
            'area' => trim($request->post('area')),
            'lat'=> trim($request->post('lat')),
            'long' => trim($request->post('long')),
            'pincode' => trim($request->post('pincode'))
          
        );

        // pr($data);die();
        if(isset($request->action) && $request->action == 'add')
        {
            $result = curl_response(env('API_URL').'v1/school/createSchool', $data,$token);
            if ($result['status'] == 200) {
                $result['message'] = 'School Created Successfully';
            }
            else{
                pr($result);
            }
        }
        elseif(isset($request->action) && $request->action == 'edit'){
           $data['sch_id'] = $request->post('sch_id');
            // pr($data);die();
            $result = curl_response(env('API_URL').'v1/school/editSchool', $data,$token);
            if ($result['status'] == 200) {
                $result['message'] = 'School Edited Successfully';
            }
        }
        else{
            return response()->json(array('status'=>'error','message'=>'Action Type Not Defined'));
        }
        // pr($result);die();
        return $result;
        
    }

    function list(Request $request){
        $token=Session::get('token');
        
        // echo $token;die();
        // pr($request->all());die();
        $result = array();
        $data = array();
        $school_list = array();
        $data['per_page'] = 10;
        if(isset($request->page) && $request->page != '' && $request->page >= 1) $data['pageno'] = $request->page;
        else $data['pageno'] = 0;
      
        if(isset($request->filter_ward_name) && $request->filter_ward_name != '') $data['ward'] = $request->filter_ward_name;
        if(isset($request->filter_school_name) && $request->filter_school_name != '') $data['sch_name'] = $request->filter_school_name;
        if(isset($request->filter_area) && $request->filter_area != '') $data['area'] = $request->filter_area;
        if(isset($request->filter_pincode) && $request->filter_pincode != '') $data['pincode'] = $request->filter_pincode;
        

            // pr($data);
            // die();   
        $result = curl_response(env('API_URL').'v1/school/listSchool', $data,$token);
        // pr($result);die();
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'])){
            $school_list = $result['data'];
        }
        // $school_list = array(array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'));
        // pr($school_list);die();
        $html = view('admin.school.list',['school_list'=>$school_list,'data'=>$data])->render();
        return response()->json(array('html'=>$html));
    }

    function details(Request $request){
        $token=Session::get('token');
           $data = array();
           $school_data = array();
           $result = array();
           // pr($request->all());
           if(isset($request->sch_id) && $request->sch_id != '') $data['sch_id'] = $request->sch_id;
           // pr($data);
           $result = curl_response(env('API_URL').'v1/school/listSchool', $data,$token);
           // pr($result);die();
           if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
               $school_data = $result['data'][0];
           }
           else{
               return $result;
           }
           
           return view('admin.school.details',['school_data'=>$school_data])->render();
       }


       function edit(Request $request){
        $token=Session::get('token');
        $data = array();
        $school_data = array();
        $result = array();
        $title = 'Edit School  ';
        $action = 'edit';
      

        // pr($request->all());
        if(isset($request->sch_id) && $request->sch_id != '') $data['sch_id'] = $request->sch_id;
        // pr($data);
        $result = curl_response(env('API_URL').'v1/school/listSchool', $data,$token);
        // pr($result);die();
       
        // pr($result);die();
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
            $school_data = $result['data'][0];
        }
        else{
            return $result;
        }    
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
            $school_data = $result['data'][0];
               $title = 'Edit School ';
        }
        return view('admin.school.add',['school_data'=>$school_data,'title'=>$title,'action'=>$action])->render();
    }

    function get_single_data(Request $request){
        $token=Session::get('token');
           $data = array();
           $school_data = array();
           $result = array();
       
           if(isset($request->sch_id) && $request->sch_id != '') $data['sch_id'] = $request->sch_id;
       
           $result = curl_response(env('API_URL').'v1/school/listSchool', $data,$token);
        //    pr($result);die();
           if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
               $school_data = $result['data'][0];
           }
           else{
               return $result;
           }
           return view('admin.school.single_data',['school_data'=>$school_data])->render();
       }

    
       function change_status(Request $request){
        $token=Session::get('token');
           $data = $request->all();
           $result = curl_response(env('API_URL').'v1/school/changeSchoolStatus', $data,$token);
           // pr($result);
           if($result['status'] == '200'){
               return response()->json(array('status'=>'success','msg'=>'school Status Update Successfully.'));
           }
           else{
               return response()->json(array('status'=>'error','msg'=>$result['message']));
           }
       }
   
   
   

}
