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

class ProductController extends Controller
{
    function index(){
        $title = 'Product Management';
        // $course_type = PLTCommon::where('plt_name','course_type')->where('is_active',1)->get();
        return view('admin.product.index',['title'=>$title]);
    }

    function add(Request $request){
        // $token=Session::get('login_token');

        $title = 'Add Product';
        $action = 'add';
      

        // pr($result);die();
        return view('admin.product.add',['title'=>$title,'action'=>$action])->render();
        // return view('admin.dish.add',['title'=>$title,'action'=>$action])->render();
    }

    function submit(Request $request){
        // dd(Session::all());die();
        // print_r($request->all());die();
     $token=Session::get('token');
        // pr($token);die();
        $data = array(
            // 'sch_id' => trim($request->post('sch_id')),

            'prod_name' => trim($request->post('prod_name')),
            'cat_id' => trim($request->post('cat_id')),
            "is_active"=>1,
             
        );
        $file = array();

        if ($request->hasFile('prod_img')) {
            // $data['chef_prod_img'] = $request->file('chef_prod_img')->getClientOriginalName();
            $file['prod_img'][0] = $request->file('prod_img');
        }

        // pr($data);die();
        if(isset($request->action) && $request->action == 'add')
        {
            $result = multiple_reponse(env('API_URL').'v1/product/createProduct', $data,$token,$file);
            if ($result['status'] == 200) {
                $result['message'] = 'Product Created Successfully';
            }
            else{
                pr($result);
            }
        }
        elseif(isset($request->action) && $request->action == 'edit'){
            if ($request->hasFile('prod_img')) {
                // $data['chef_prod_img'] = $request->file('chef_prod_img')->getClientOriginalName();
                $file['prod_img'][0] = $request->file('prod_img');
            }
           $data['prod_id'] = $request->post('prod_id');
            // pr($data);die();
            $result = multiple_reponse(env('API_URL').'v1/product/editProduct', $data,$token,$file);
            if ($result['status'] == 200) {
                $result['message'] = 'Product Edited Successfully';
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
        $product_list = array();
        $data['per_page'] = 10;
        if(isset($request->page) && $request->page != '' && $request->page >= 1) $data['pageno'] = $request->page;
        else $data['pageno'] = 0;
      
        if(isset($request->filter_product) && $request->filter_product != '') $data['prod_id'] = $request->filter_product;
        if(isset($request->filter_cat_id) && $request->filter_cat_id != '') $data['cat_id'] = $request->filter_cat_id;
        if(isset($request->filter_pro_name) && $request->filter_pro_name != '') $data['prod_name'] = $request->filter_pro_name;
        if(isset($request->filter_status) && $request->filter_status != '') $data['is_active'] = $request->filter_status;
        

            // pr($data);
            // die();   
        $result = curl_response(env('API_URL').'v1/product/listProduct', $data,$token);
        // pr($result);die();
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'])){
            $product_list = $result['data'];
        }
        // $product_list = array(array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'),array('data'=>'dsdf'));
        // pr($product_list);die();
        $html = view('admin.product.list',['product_list'=>$product_list,'data'=>$data])->render();
        return response()->json(array('html'=>$html));
    }

    
    function details(Request $request){
        $token=Session::get('token');
           $data = array();
           $product_data = array();
           $result = array();
           // pr($request->all());
           if(isset($request->prod_id) && $request->prod_id != '') $data['prod_id'] = $request->prod_id;
           // pr($data);
           $result = curl_response(env('API_URL').'v1/product/listProduct', $data,$token);
           // pr($result);die();
           if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
               $product_data = $result['data'][0];
           }
           else{
               return $result;
           }
           
           return view('admin.product.details',['product_data'=>$product_data])->render();
       }

       function edit(Request $request){
        $token=Session::get('token');
        $data = array();
        $product_data = array();
        $result = array();
        $title = 'Edit Product  ';
        $action = 'edit';
      

        // pr($request->all());
        if(isset($request->prod_id) && $request->prod_id != '') $data['prod_id'] = $request->prod_id;
        // pr($data);
        $result = curl_response(env('API_URL').'v1/product/listProduct', $data,$token);
        // pr($result);die();
       
        // pr($result);die();
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
            $product_data = $result['data'][0];
        }
        else{
            return $result;
        }    
        if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
            $product_data = $result['data'][0];
               $title = 'Edit Product ';
        }
        return view('admin.product.add',['product_data'=>$product_data,'title'=>$title,'action'=>$action])->render();
    }

    function get_single_data(Request $request){
        $token=Session::get('token');
           $data = array();
           $product_data = array();
           $result = array();
       
           if(isset($request->prod_id) && $request->prod_id != '') $data['prod_id'] = $request->prod_id;
       
           $result = curl_response(env('API_URL').'v1/product/listProduct', $data,$token);
        //    pr($result);die();
           if(isset($result['status']) && $result['status'] == '200' && isset($result['data'][0])){ 
               $product_data = $result['data'][0];
           }
           else{
               return $result;
           }
           return view('admin.product.single_data',['product_data'=>$product_data])->render();
       }
       function change_status(Request $request){
            $token=Session::get('token');
               $data = $request->all();
               $result = curl_response(env('API_URL').'v1/product/changeProductStatus', $data,$token);
               // pr($result);
               if($result['status'] == '200'){
                   return response()->json(array('status'=>'success','msg'=>'Product Status Update Successfully.'));
               }
               else{
                   return response()->json(array('status'=>'error','msg'=>$result['message']));
               }
           }
}
