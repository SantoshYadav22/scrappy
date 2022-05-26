<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;
use Session;
use Validator;

use DB;
use App\Models\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function attemptLogin(Request $request)
	{
         
            $serverInfo=array('ip',$_SERVER['REMOTE_ADDR'],'browser',$_SERVER['HTTP_USER_AGENT']);
			$post = $_POST;
			$data['mobile']=$post['mobile'];
			$data['password']=$post['password'];
			$data['fcm_token']='50f6604b-274a-4b67-ae72-e81ba552c975';
			$data['otherinfo']=json_encode($serverInfo);
			$data['versioninfo']='wewfewfwfwwfwwef';
            $data['envinfo']=env("ENV_INFO")."Admin";
			$data['fcm']=$post['_token'];
            // pr($data);
            // die();
			$result = _curl_response(env('API_URL').'v1/user/adminLogin', $data);
			// pr($result);die();
			if (isset($result['status']) && $result['status'] == '200' ) {
				// pr($result);die();
				if(isset($result['data']['role_id']) && in_array($result['data']['role_id'],array(1)) ){
					\Session::put($result['data']);
					// \Session::put('login_token', $result['data']['token']);
					Auth::loginUsingId($result['data']['user_id']);
						// pr(Auth::user());die();
					if (Auth::user()) {
						return response()->json(["status"=>"success",'auth'=>Auth::user()]);
					}
					else{
						Auth::logout();
						return response()->json(["status"=>"failed",'message'=>$result['message']]);	
					}
				}
				else {
					return response()->json(["status"=>"failed",'message'=>'You are not Authrised to access ']);	
				}
			
			} else {
				// dd("in else");
				// dd(json_encode($result));
				return response()->json(["status"=>"failed",'message'=>$result['message']]);	
				// return $result;


			}
		
	}
    public function reset_otp(Request $request){
        $validator =Validator::make($request->all(),[  
            'mobile' => 'required',
           
         ]);   
         if(!$validator->passes()){
            return response()->json(['status'=>0, 'msg'=>$validator->errors()->toArray()['mobile'][0]]);
         }else{
            $serverInfo=array('ip',$_SERVER['REMOTE_ADDR'],'browser',$_SERVER['HTTP_USER_AGENT']);
			$post = $_POST;
			$data['mobile']=$post['mobile'];
			// $data['fcm_token']='50f6604b-274a-4b67-ae72-e81ba552c975';
			// $data['otherinfo']=json_encode($serverInfo);
			// $data['versioninfo']='wewfewfwfwwfwwef';
            // $data['envinfo']=env("ENV_INFO")."Admin";
			// $data['fcm']=$post['_token'];
            // pr($data); die();
            $result = _curl_response(env('API_URL').'v1/user/resetPassword', $data);
			if (isset($result['status']) && $result['status'] == '200' ) {
                return response()->json(["status"=>"success",'message'=>$result['message']]);	

            }

            else{
                return response()->json(["status"=>"failed",'message'=>$result['message']]);	

            }

         }
       
    }





    public function submit_reset_otp(Request $request){
        $validator =Validator::make($request->all(),[  
            'mobile' => 'required',
            'otp' => 'required',     
            'password' => 'required| min:6| max:12 | same:password_confirmation',
            'password_confirmation' => 'required| min:6 | max:10'
         ]);        
         if(!$validator->passes()){
            return response()->json(['status'=>0, 'msg'=>$validator->errors()->toArray()['password'][0]]);
         }else{
            $serverInfo=array('ip',$_SERVER['REMOTE_ADDR'],'browser',$_SERVER['HTTP_USER_AGENT']);
			$post = $_POST;
			$data['mobile']=$post['mobile'];
            $data['otp']=$post['otp'];

			$data['password']=$post['password'];
			// $data['fcm_token']='50f6604b-274a-4b67-ae72-e81ba552c975';
			// $data['otherinfo']=json_encode($serverInfo);
			// $data['versioninfo']='wewfewfwfwwfwwef';
            // $data['envinfo']=env("ENV_INFO")."Admin";
			// $data['fcm']=$post['_token'];
            // pr($data);
            // die();
            $result = _curl_response(env('API_URL').'v1/user/resetPassword', $data);
			if (isset($result['status']) && $result['status'] == '200' ) {
                return response()->json(["status"=>"success"]);	

            }

            else{
                return response()->json(["status"=>"failed",'message'=>$result['message']]);	

            }


         }
        

    }
}
