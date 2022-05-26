<?php

/** duplaicate  
 * curl call with access-token header and post fields
*/

//use DB;
//use Session;
use App\Models\PltCommon;
use App\Models\TransJob;
use App\Models\MapJobUser;
use App\Models\Role;
use Aws\S3\S3Client;
use Aws\Credentials\Credentials;


function _curl_response($url = "", $fields = "", $header = "")
{
    $fields = json_encode($fields);
//    echo $fields;die();
    if (isset($header) && $header!='') {
        $authorization = "access-token:".$header."";
        $headers = array(
            "Content-Type:"=>"application/json",
            "sourcename:php",
            $authorization
        );
    } else {
        $headers = array(
            'Content-Type: application/json',
        );
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    $result = curl_exec($ch);
    curl_close($ch);
    return json_decode($result, true);
}


/** curl call with access-token header and post fields  */
function curl_response($url = "", $fields = "", $header = "")
{
    if ($fields != '') {
        $fields = json_encode($fields);
    }
    // echo $fields;die();
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => $fields,
        CURLOPT_HTTPHEADER => array(
            "access-token:".$header,
            "sourcename:php",
            "cache-control: no-cache",
            "content-type: application/json",
            "postman-token: 939cd434-2123-c198-96f2-da7b3a861d30"
        ),
    ));

    $response = json_decode(curl_exec($curl),true);
    // pr($response) ;die();
    $err = curl_error($curl);
    // pr($response['status']) ;
    //
    curl_close($curl);

    if ($err ) {
        // return response()->json(array('status'=>'error','message'=>'Action Type Not Defined'));
        echo "<span style='color:red;'> Api Server did not Responded, Please Contact Administrator</span>";
        //    return array('status'=>1001,'message'=>'Api Server did not Responded, Please Contact Administrator') ;
      
     } 
     
     else if($response['status']==501){
        // return response()->json(array('status'=>'error','message'=>'Action Type Not Defined'));
        // return array('status'=>1002,'message'=>'DataBase did not Responded, Please Contact Administrator') ;
            echo "<span style='color:red;'>DataBase did not Responded, Please Contact Administrator</span>";
         }

     else {
        return $response;
    }
}

/** curl call with access-token header and post fields  */
function get_curl_response($url = "", $header = "")
{
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_HTTPHEADER => array(
            "access-token:".$header,
            "sourcename:php",
            "cache-control: no-cache",
            "content-type: application/json",
            "postman-token: 939cd434-2123-c198-96f2-da7b3a861d30"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        return json_decode($response, true);
    }
}
  
/** file upload with post json data */
function multiple_reponse($url = "", $postFields = "", $header = "", $filesArray= "", $param_name= "")
{
    // pr($header);die();
    $url_data = http_build_query($postFields);
    $boundary = uniqid();
    $delimiter = '-------------' . $boundary;
    $post_data = build_data_files($boundary, $postFields, $filesArray, $param_name);
    // pr($post_data);die();
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_SAFE_UPLOAD => true,
        CURLOPT_POSTFIELDS => $post_data,
        CURLOPT_HTTPHEADER => array(
            "access-token:".$header,
            "sourcename:android",
            "cache-control: no-cache",
            "Content-Type: multipart/form-data; boundary=" . $delimiter,
            "Content-Length: " . strlen($post_data)
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        return json_decode($response, true);
    }
}

function single_reponse($url = "", $postFields = "", $header = "", $filesArray= "", $param_name= "")
{
    $url_data = http_build_query($postFields);
    $boundary = uniqid();
    $delimiter = '-------------' . $boundary;
    $post_data = build_data_file($boundary, $postFields, $filesArray, $param_name);
    // pr($post_data);die();
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_SAFE_UPLOAD => true,
    CURLOPT_POSTFIELDS => $post_data,
    CURLOPT_HTTPHEADER => array(
        "access-token:".$header,
        "sourcename:android",
        "cache-control: no-cache",
        "Content-Type: multipart/form-data; boundary=" . $delimiter,
        "Content-Length: " . strlen($post_data)
    ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        return json_decode($response, true);
    }
}


/** file upload fix */
function build_data_files($boundary, $fields, $files, $param_name)
{
    $data = '';
    $eol = "\r\n";

    $delimiter = '-------------' . $boundary;

    foreach ($fields as $name => $content) {
        $data .= '--' . $delimiter . $eol
            . 'Content-Disposition: form-data; name="' . $name . '"'.$eol.$eol
            . $content . $eol;
    }
    
    if($files) {
        foreach ($files as $name => $contents) {
            foreach ($contents as $key4 => $content) {
            // pr($name);
            // pr( $contents);
            // $content = $contents;
            // pr($content);
            // pr(file_get_contents($content));
            $data .= "--" . $delimiter . $eol
                . 'Content-Disposition: form-data; name="'.$name.'"; filename="' . $content->getClientOriginalName() . '"' . $eol
                . 'Content-Type: '.$content->getClientMimeType().$eol
                . 'Content-Transfer-Encoding: binary'.$eol;
            $data .= $eol;
            $data .= file_get_contents($content) . $eol;
            }
        }
    }

    $data .= "--" . $delimiter . "--".$eol;
    return $data;
}
function build_data_file($boundary, $fields, $files, $param_name)
{
    $data = '';
    $eol = "\r\n";

    $delimiter = '-------------' . $boundary;

    foreach ($fields as $name => $content) {
        $data .= "--" . $delimiter . $eol
            . 'Content-Disposition: form-data; name="' . $name . "\"".$eol.$eol
            . $content . $eol;
    }

    // dd($files[$param_name]->getClientMimeType());

    $cfile = new CURLFile(
        $files[$param_name],
        $files[$param_name]->getClientOriginalExtension(),
        $files[$param_name]->getClientOriginalName()
    );

    $data .= "--" . $delimiter . $eol
            . 'Content-Disposition: form-data; name="' . $cfile;

    return $data;

    // $data = '';
    // $eol = "\r\n";

    // $delimiter = '-------------' . $boundary;

    // foreach ($fields as $name => $content) {
    //     $data .= "--" . $delimiter . $eol
    //         . 'Content-Disposition: form-data; name="' . $name . "\"".$eol.$eol
    //         . $content . $eol;
    // }
    // // dd($files);
    // if($files) {
    //     foreach ($files[$param_name] as $name => $content) {
    //         // pr(file_get_contents($content));die();
    //         $data .= "--" . $delimiter . $eol
    //             . 'Content-Disposition: form-data; name="'.$param_name.'"; filename="' . $content->getClientOriginalName() . '"' . $eol
    //             . 'Content-Type: '.$content->getClientMimeType().$eol
    //             . 'Content-Transfer-Encoding: binary'.$eol;
    //         $data .= $eol;
    //         $data .= file_get_contents($content) . $eol;
    //     }
    // }

    // $data .= "--" . $delimiter . "--".$eol;
    // // pr($data);
    // return $data;
}

function __getNotifications($access_token){
	$url =  env('API_URL').'tra/usr/notification';
	$headers =  array(
        		"authorization: Basic NmRiMTQ1Y2UtMzdhZS00YzJjLWE1YzMtN2JiYTY5NzRjZDNk",
                "cache-control: no-cache",
                "content-type: application/json; charset=utf-8",
        		"access-token: {$access_token}"
            );
	// dd($headers);
	 $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_HTTPHEADER =>$headers,
        ));

        $response = curl_exec($curl);
        return $response;
}

function uploadDocument($file){
        //  pr($file);
    $extsn = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
    // pr($extsn);die();
    $bucket = env('AWS_BUCKET');
    $fileName = (microtime(true)* 10000).'.'.$extsn;
    $keyname = str_replace(" ", "-", "{$fileName}");
    $keyname = str_replace('+','-',$keyname);
    $s3 = new Aws\S3\S3Client([
        'version' => 'latest',
        'region'  => env('AWS_DEFAULT_REGION'),
        'credentials' => [
            'key'    => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY')
        ]
    ]);
    try {
        // Upload data.
        $param = [
            'Bucket' => $bucket,
            'Key'    => 'callman/'.$keyname,
            'Body'   => file_get_contents($file),
            'ACL'    => 'public-read'
        ];

        if ($file->getClientOriginalExtension() == 'svg') {
            $param['ContentType'] = 'image/svg+xml';
        }
        $result = $s3->putObject($param);

        // Print the URL to the object.
        // echo $result['ObjectURL'] . PHP_EOL;
        $data['original_name']  = $file->getClientOriginalName();
        $data['img_path_name']  = $keyname;
        $data['img_name']       = $fileName;
        $data['extention']      = $file->getClientOriginalExtension();
        // pr($data);
    } catch (S3Exception $e) {
        $data['error'] = $e->getMessage();
    }
    return $data;
}

function deleteDocument($url)
{
    $obj_url = env('AWS_URL').$url;
    
    $bucket = env('AWS_BUCKET');
    $s3 = new Aws\S3\S3Client([
        'version' => 'latest',
        'region'  => env('AWS_DEFAULT_REGION')
    ]);
    try {
        // Upload data.
        
        $result = $s3->deleteObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => $url,
        ]);
        
        // pr($data);
    } catch (S3Exception $e) {
        $data['error'] = $e->getMessage();
    }
    // return $data;
}

function showS3Doc($url){
	return env('AWS_URL').trim($url);
}

function get_image($image){
    $image = trim($image,',');
    // $CI = & get_instance();
    // $s3 = new Aws\S3\S3Client([
    //     'version' => 'latest',
    //     'region'  => env('AWS_DEFAULT_REGION'),
    //     'credentials' => [
    //         'key'    => env('AWS_ACCESS_KEY_ID'),
    //         'secret' => env('AWS_SECRET_ACCESS_KEY')
    //     ]
    // ]);
    $cred = new Aws\Credentials\Credentials(env('AWS_ACCESS_KEY_ID'), env('AWS_SECRET_ACCESS_KEY'));

    //instantiate the class
    $s3 = new Aws\S3\S3Client(array('version'=>'latest','region'=>env('AWS_DEFAULT_REGION'),'credentials'=>$cred));
    
    $result = $s3->getCommand('GetObject',[
        'Bucket' => 'pics.test.mm',
        'Key' =>  'callman/'.$image
    ]);

    $request = $s3->createPresignedRequest($result, '+20 minutes'); // Get the actual presigned-url 
    $presignedUrl = (string)$request->getUri();
    //pr($presignedUrl);
    return $presignedUrl;
    
}

function showS3Docuser($url){
    $url = trim($url);
    // return 'http://pics.test.mm.s3.ap-south-1.amazonaws.com/upload/'.$url;
    $s3Client = new S3Client([
        'region' => 'ap-south-1',
        'version' => 'latest',
    ]);

    $cmd = $s3Client->getCommand('GetObject', [
        'Bucket' => 'pics.test.mm',
        'Key' => $url
    ]);

    $request = $s3Client->createPresignedRequest('+1440 minutes');
    // echo file_get_contents($request);
    return file_get_contents($request);
}

function pr($array){
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

function getAreaCity_byPin($pincode){
    $headers = array(
        'Content-Type:application/json',
    );
    // $maindata = array_merge($data2,$data);
    $ch = curl_init();
    curl_setopt_array($ch, array(
           CURLOPT_URL => 'https://api.postalpincode.in/pincode/'.$pincode,
           CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($ch);
    // pr($response);
    $responseDecoded['success'] = json_decode($response);
    $error = curl_error($ch);
    curl_close($ch);
    if ($error !== '') {
        throw new \Exception($error);
    }
    else {
        // pr($responseDecoded);exit;
        return array('status'=>'success','data'=>$responseDecoded);
    }
}

function save_notification($msg,$data,$noti_type,$user_id)
{
    $user_data = DB::table('mst_user')->where('user_id',$user_id)->where('is_active',1)->first();
    // pr($user_data);
    DB::table('notifications')->insert(
        ['msg' => $msg, 'user_id' => $user_id,'data'=>$data,'user_type'=>$user_data->profile,'noti_type'=>$noti_type,'is_active'=>1,'created_by'=>Session::get('user_id'),'createdAt'=>date('Y-m-d H:i:s',time()),'updatedAt'=>date('Y-m-d H:i:s',time())]
    );
}

function date_formate($date){
    return date('d-m-Y',strtotime($date));
}

function dateDifferDays($start_date,$end_date){
    $start_str = strtotime($start_date);
    $end_str = strtotime($end_date);
    $datediff = $end_str - $start_str;

    return ceil($datediff / (60 * 60 * 24));
    // return date('d-m-Y',$end_str-$start_str);
}
function current_week()
{
    $monday = strtotime("last monday");
    $monday = date('w', $monday)==date('w') ? $monday+7*86400 : $monday;
    $sunday = strtotime(date("Y-m-d",$monday)." +6 days");
    $dts = [];

    for ($i=0; $i <= 6; $i++) { 
        $dt = strtotime(date("Y-m-d",$monday)." +".$i." days");
        array_push($dts, date("Y-m-d",$dt)." 00:00:00");
    }
    return $dts;
}

function next_week()
{
    $monday = strtotime("last monday");
    $monday = date('w', $monday)==date('w') ? $monday+7*86400 : $monday;
    $sunday = strtotime(date("Y-m-d",$monday)." +6 days");
    $dts = [];

    for ($i=7; $i <= 13; $i++) { 
        $dt = strtotime(date("Y-m-d",$monday)." +".$i." days");
        array_push($dts, date("Y-m-d",$dt)." 00:00:00");
    }
    return $dts;
}
function current_month()
{
    for($i = 1; $i <=  date('t'); $i++)
    {
       $dates[] = date('Y') . "-" . date('m') . "-" . str_pad($i, 2, '0', STR_PAD_LEFT);
    }
    return $dates;
}

function get_job_location($id)
{
    $job_data = TransJob::where('job_id', $id)->first();
    $job_data_ar = explode(',', $job_data['location']);
    $res = [];
    foreach ($job_data_ar as $row) {
        $data = PltCommon::where('plt_val', trim($row))->first();
        if($data!="")
        {
            array_push($res, $data['plt_disp_val']);
        }
    }
    return implode(', ', $res);
}


function get_job_industry($id)
{
    $job_data = TransJob::where('job_id', $id)->first();
    $job_data_ar = explode(',', $job_data['industry']);
    $res = [];
    foreach ($job_data_ar as $row) {
        $data = PltCommon::where('plt_val', trim($row))->first();
        if($data!="")
        {
            array_push($res, $data['plt_disp_val']);
        }
    }
    return implode(', ', $res);
}

function get_user_industry($id)
{
    $job_data = \App\Models\User::where('user_id', $id)->first();
    if(!empty($job_data)){
        $job_data_ar = explode(',', $job_data['industry']);
        $res = [];
        foreach ($job_data_ar as $row) {
            $data = PltCommon::where('plt_val', trim($row))->first();
            if($data!="")
            {
                array_push($res, $data['plt_disp_val']);
            }
        }
        return implode(', ', $res);
    }
    else{
        return 'N/A';
    }
}

function get_job_trade($id)
{
    $job_data = TransJob::where('job_id', $id)->first();
    $job_data_ar = explode(',', $job_data['trade']);
    $res = [];
    foreach ($job_data_ar as $row) {
        $data = PltCommon::where('plt_val', trim($row))->first();
        if($data!="")
        {
            array_push($res, $data['plt_disp_val']);
        }
    }
    return implode(', ', $res);
}
function get_job_education($id)
{
    $job_data = TransJob::where('job_id', $id)->first();
    // $job_data_ar = explode(',', $job_data['trade']);
    // $res = [];
    
    $data = PltCommon::where('plt_val', trim($job_data['target_education']))->first();
    if($data!="")
    {
        return $data['plt_disp_val'];
    }
    return "";
}


function get_country_list(){
    $headers = array(
        'Content-Type:application/json',
    );
    // $maindata = array_merge($data2,$data);
    $ch = curl_init();
    curl_setopt_array($ch, array(
           CURLOPT_URL => 'https://location.wlfpt.co/api/v1/countries',
           CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($ch);
    // pr($response);die();
    $responseDecoded['success'] = json_decode($response);
    $error = curl_error($ch);
    curl_close($ch);
    if ($error !== '') {
        throw new \Exception($error);
    }
    else {
        // pr($responseDecoded);exit;
        return array('status'=>'success','data'=>$responseDecoded);
    }
}

function get_state_list($country_code){
    $headers = array(
        'Content-Type:application/json',
    );
    // $maindata = array_merge($data2,$data);
    $ch = curl_init();
    curl_setopt_array($ch, array(
           CURLOPT_URL => 'https://location.wlfpt.co/api/v1/states?filter='.$country_code.'&type=name',
           CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($ch);
    // pr($response);die();
    $responseDecoded['success'] = json_decode($response);
    $error = curl_error($ch);
    curl_close($ch);
    if ($error !== '') {
        throw new \Exception($error);
    }
    else {
        // pr($responseDecoded);exit;
        return array('status'=>'success','data'=>$responseDecoded);
    }
}

function get_city_list($state_name){
    $headers = array(
        'Content-Type:application/json',
    );
    // $maindata = array_merge($data2,$data);
    $ch = curl_init();
    curl_setopt_array($ch, array(
           CURLOPT_URL => 'https://location.wlfpt.co/api/v1/cities?filter='.$state_name.'&type=name',
           CURLOPT_RETURNTRANSFER => true
    ));
    $response = curl_exec($ch);
    // pr($response);die();
    $responseDecoded['success'] = json_decode($response);
    $error = curl_error($ch);
    curl_close($ch);
    if ($error !== '') {
        throw new \Exception($error);
    }
    else {
        // pr($responseDecoded);exit;
        return array('status'=>'success','data'=>$responseDecoded);
    }
}


function get_location_detail($location)
{
    $data_count = PltCommon::where('plt_val', trim($location))
            ->where('plt_name', 'location')->count();
    if($data_count>0)
    {
        $data = PltCommon::where('plt_val', trim($location))
            ->where('plt_name', 'location')->first();

        $res['plt_val'] = $data['plt_val'];
        $res['plt_disp_val'] = $data['plt_disp_val'];
    }
    else{
        $res['plt_val'] = "";
        $res['plt_disp_val'] = "";
    }
    return $res;
}

function get_job_trade_skill($id)
{
    $job_data = TransJob::where('job_id', $id)->first();
    $job_data_ar = explode(',', $job_data['target_skill']);
    $res = [];
    foreach ($job_data_ar as $row) {
        $data = PltCommon::where('plt_val', trim($row))->first();
        if($data!="")
        {
            array_push($res, $data['plt_disp_val']);
        }
    }
    return implode(', ', $res);
}

function get_assessment_sub_category($val)
{
    $data_count = PltCommon::where('plt_val', trim($val))->count();
    if($data_count>0)
    {
        $data = PltCommon::where('plt_val', trim($val))->first();

        $res = $data['plt_disp_val'];
    }
    else{
        $res = "";
    }
    return $res;
}

function get_shramik_data($val)
{
    $job_data_ar = explode(',', $val);
    $res = [];
    foreach ($job_data_ar as $row) {
        $data = PltCommon::where('plt_val', trim($row))->first();
        if($data!="")
        {
            array_push($res, $data['plt_disp_val']);
        }
    }
    return implode(', ', $res);
}


function menu_items(){
    $menu_detail = Role::where('role_id',Session::get('role_id'))->first();
    if(isset($menu_detail->php_access) && $menu_detail->php_access != '') return json_decode($menu_detail->php_access, true);
    else return array();
}

function role_wise_access($route){
    $menu_detail = Role::where('role_id',Session::get('role_id'))->first();
    
    if(strpos($menu_detail->php_access,'"route":"'.$route.'",') !== false) {
        return true;
    }
    else{
        return route('home');
        // return false;
    }
}
