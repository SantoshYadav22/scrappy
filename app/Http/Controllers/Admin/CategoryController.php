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
class CategoryController extends Controller
{
    function index(){
        $title = 'Category';
        // $course_type = PLTCommon::where('plt_name','course_type')->where('is_active',1)->get();
        return view('admin.category.index',['title'=>$title]);
    }
    function add(Request $request){
        // $token=Session::get('login_token');

        $title = 'Add Category';
        $action = 'add';
      

        // pr($result);die();
        return view('admin.category.add',['title'=>$title,'action'=>$action])->render();
        // return view('admin.dish.add',['title'=>$title,'action'=>$action])->render();
    }

    function submit(Request $request){
        $token=Session::get('token');
       // pr($token);die();
       $data = array(
           // 'sch_id' => trim($request->post('sch_id')),

           'cat_name' => trim($request->post('cat_name')),
           'cat_price' => trim($request->post('cat_price')),  
           "is_active"=>1,      
       );
       $file = array();

       if ($request->hasFile('cat_img')) {
           // $data['chef_cat_img'] = $request->file('chef_cat_img')->getClientOriginalName();
           $file['cat_img'][0] = $request->file('cat_img');
       }

       // pr($data);die();
       if(isset($request->action) && $request->action == 'add')
       {
           $result = multiple_reponse(env('API_URL').'v1/category/createCategory', $data,$token,$file);
           if ($result['status'] == 200) {
               $result['message'] = 'Category Created Successfully';
           }
           else{
               pr($result);
           }
       }
       elseif(isset($request->action) && $request->action == 'edit'){
          $data['cat_id'] = $request->post('cat_id');
          if ($request->hasFile('cat_img')) {
           // $data['chef_cat_img'] = $request->file('chef_cat_img')->getClientOriginalName();
           $file['cat_img'][0] = $request->file('cat_img');
       }
           // pr($data);die();
           $result = multiple_reponse(env('API_URL').'v1/category/editCategory', $data,$token,$file);
           if ($result['status'] == 200) {
               $result['message'] = 'Category Edited Successfully';
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
    $category_list = array();
    $data['per_page'] = 10;
    if(isset($request->page) && $request->page != '' && $request->page >= 1) $data['pageno'] = $request->page;
    else $data['pageno'] = 0;
  
    if(isset($request->filter_cat_name) && $request->filter_cat_name != '') $data['cat_name'] = $request->filter_cat_name;
    if(isset($request->filter_price) && $request->filter_price != '') $data['cat_price'] = $request->filter_price;    
    if(isset($request->is_active) && $request->is_active != '') $data['is_active'] = $request->is_active;
    

        // pr($data);
        // die();   
    $result = curl_response(env('API_URL').'v1/category/listCategory', $data,$token);
    // pr($result);die();
    if(isset($result['status']) && $result['status'] == '200' && isset($result['data'])){
        $category_list = $result['data'];
    }
    // $category_list = array(array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'));
    // pr($category_list);die();
    $html = view('admin.category.list',['category_list'=>$category_list,'data'=>$data])->render();
    return response()->json(array('html'=>$html));
}
function details(Request $request){
    $token=Session::get('token');
       $data = array();
       $category_data = array();
       $result = array();
       // pr($request->all());
       if(isset($request->cat_id) && $request->cat_id != '') $data['cat_id'] = $request->cat_id;
       // pr($data);
       $result = curl_response(env('API_URL').'v1/category/listCategory', $data,$token);
       // pr($result);die();
       if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
           $category_data = $result['data'][0];
       }
       else{
           return $result;
       }
       
       return view('admin.category.details',['category_data'=>$category_data])->render();
   }
   function edit(Request $request){
    $token=Session::get('token');
    $data = array();
    $category_data = array();
    $result = array();
    $title = 'Edit Category  ';
    $action = 'edit';
  

    // pr($request->all());
    if(isset($request->cat_id) && $request->cat_id != '') $data['cat_id'] = $request->cat_id;
    // pr($data);die();
    $result = multiple_reponse(env('API_URL').'v1/category/listCategory', $data,$token);
    // pr($result);die();
   
    // pr($result);die();
    if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
        $category_data = $result['data'][0];
    }
    else{
        return $result;
    }    
    if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
        $category_data = $result['data'][0];
           $title = 'Edit Challenge ';
    }
    return view('admin.category.add',['category_data'=>$category_data,'title'=>$title,'action'=>$action])->render();
}

function get_single_data(Request $request){
    $token=Session::get('token');
       $data = array();
       $chacategoryta = array();
       $result = array();
   
       if(isset($request->cat_id) && $request->cat_id != '') $data['cat_id'] = $request->cat_id;
   
       $result = curl_response(env('API_URL').'v1/category/listCategory', $data,$token);
    //    pr($result);die();
       if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
           $category_data = $result['data'][0];
       }
       else{
           return $result;
       }
       return view('admin.category.single_data',['category_data'=>$category_data])->render();
   }

   function change_status(Request $request){
    $token=Session::get('token');
       $data = $request->all();
       $result = curl_response(env('API_URL').'v1/category/changeCategoryStatus', $data,$token);
       // pr($result);
       if($result['status'] == '200'){
           return response()->json(array('status'=>'success','msg'=>'Category Status Update Successfully.'));
       }
       else{
           return response()->json(array('status'=>'error','msg'=>$result['message']));
       }
   }
}

