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

class ChallengeController extends Controller
{
    function index(){
        $title = 'Challenges';
        // $course_type = PLTCommon::where('plt_name','course_type')->where('is_active',1)->get();
        return view('admin.challenge.index',['title'=>$title]);
    }
    function add(Request $request){
        // $token=Session::get('login_token');

        $title = 'Add School';
        $action = 'add';
      

        // pr($result);die();
        return view('admin.challenge.add',['title'=>$title,'action'=>$action])->render();
        // return view('admin.dish.add',['title'=>$title,'action'=>$action])->render();
    }

   
    function submit(Request $request){
         $token=Session::get('token');
        // pr($token);die();
        $data = array(
            // 'sch_id' => trim($request->post('sch_id')),

            'name' => trim($request->post('name')),
            'ward' => trim($request->post('ward')),
            'area' => trim($request->post('area')),
            'category'=> trim($request->post('category')),
            'duration' => trim($request->post('duration')),
            'rewards' => trim($request->post('rewards')),
            'approval_status' => trim($request->post('approval_status')),
            'challenge_owner' => trim($request->post('challenge_owner')),
            'creation_type' => trim($request->post('creation_type')),

          
        );
        $file = array();

        if ($request->hasFile('challenge_img')) {
            // $data['chef_challenge_img'] = $request->file('chef_challenge_img')->getClientOriginalName();
            $file['challenge_img'][0] = $request->file('challenge_img');
        }

        // pr($data);die();
        if(isset($request->action) && $request->action == 'add')
        {
            $result = multiple_reponse(env('API_URL').'v1/challenge/createChallenge', $data,$token,$file);
            if ($result['status'] == 200) {
                $result['message'] = 'Challenge Created Successfully';
            }
            else{
                pr($result);
            }
        }
        elseif(isset($request->action) && $request->action == 'edit'){
           $data['challenge_id'] = $request->post('challenge_id');
           if ($request->hasFile('challenge_img')) {
            // $data['chef_challenge_img'] = $request->file('chef_challenge_img')->getClientOriginalName();
            $file['challenge_img'][0] = $request->file('challenge_img');
        }
            // pr($data);die();
            $result = multiple_reponse(env('API_URL').'v1/challenge/editChallenge', $data,$token,$file);
            if ($result['status'] == 200) {
                $result['message'] = 'Challenge Edited Successfully';
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
        $challenge_list = array();
        $data['per_page'] = 10;
        if(isset($request->page) && $request->page != '' && $request->page >= 1) $data['pageno'] = $request->page;
        else $data['pageno'] = 0;
      
        if(isset($request->filter_challenge_id) && $request->filter_challenge_id != '') $data['challenge_id'] = $request->filter_challenge_id;
        if(isset($request->filter_name) && $request->filter_name != '') $data['ame'] = $request->filter_name;
        if(isset($request->filter_challenge) && $request->filter_challenge != '') $data['challenge'] = $request->filter_challenge;
        if(isset($request->is_active) && $request->is_active != '') $data['is_active'] = $request->is_active;
        

            // pr($data);
            // die();   
        $result = curl_response(env('API_URL').'v1/challenge/listChallenge', $data,$token);
        // pr($result);die();
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'])){
            $challenge_list = $result['data'];
        }
        // $challenge_list = array(array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'));
        // pr($challenge_list);die();
        $html = view('admin.challenge.list',['challenge_list'=>$challenge_list,'data'=>$data])->render();
        return response()->json(array('html'=>$html));
    }

    function details(Request $request){
        $token=Session::get('token');
           $data = array();
           $schchallengeta = array();
           $result = array();
           // pr($request->all());
           if(isset($request->challenge_id) && $request->challenge_id != '') $data['challenge_id'] = $request->challenge_id;
           // pr($data);
           $result = curl_response(env('API_URL').'v1/challenge/listChallenge', $data,$token);
           // pr($result);die();
           if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
               $challenge_data = $result['data'][0];
           }
           else{
               return $result;
           }
           
           return view('admin.challenge.details',['challenge_data'=>$challenge_data])->render();
       }

    //    function change_status(Request $request){
    //     $token=Session::get('token');
    //        $data = $request->all();
    //        $result = curl_response(env('API_URL').'v1/challenge/changeChallengeStatus', $data,$token);
    //        // pr($result);
    //        if($result['status'] == '200'){
    //            return response()->json(array('status'=>'success','msg'=>'challenge Status Update Successfully.'));
    //        }
    //        else{
    //            return response()->json(array('status'=>'error','msg'=>$result['message']));
    //        }
    //    }
    function edit(Request $request){
        $token=Session::get('token');
        $data = array();
        $challenge_data = array();
        $result = array();
        $title = 'Edit Challenge  ';
        $action = 'edit';
      

        // pr($request->all());
        if(isset($request->challenge_id) && $request->challenge_id != '') $data['challenge_id'] = $request->challenge_id;
        // pr($data);die();
        $result = curl_response(env('API_URL').'v1/challenge/listChallenge', $data,$token);
        // pr($result);die();
       
        // pr($result);die();
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
            $challenge_data = $result['data'][0];
        }
        else{
            return $result;
        }    
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
            $challenge_data = $result['data'][0];
               $title = 'Edit Challenge ';
        }
        return view('admin.challenge.add',['challenge_data'=>$challenge_data,'title'=>$title,'action'=>$action])->render();
    }

    function get_single_data(Request $request){
        $token=Session::get('token');
           $data = array();
           $challenge_data = array();
           $result = array();
       
           if(isset($request->challenge_id) && $request->challenge_id != '') $data['challenge_id'] = $request->challenge_id;
       
           $result = curl_response(env('API_URL').'v1/challenge/listChallenge', $data,$token);
        //    pr($result);die();
           if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
               $challenge_data = $result['data'][0];
           }
           else{
               return $result;
           }
           return view('admin.challenge.single_data',['challenge_data'=>$challenge_data])->render();
       }


}
