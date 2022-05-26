@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Reset Password') }}</div>

                <div class="card-body">
                    <form method="POST" onsubmit="handle_submit_otp()"
                    id="submit_otp_form"
                    action="javascript:void(0);"
                    autocomplete="off"
                >
                    @csrf
                    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                        <div class="row mb-3">
                            <label for="mobile" class="col-md-4 col-form-label text-md-end">{{ __('Mobile') }}</label>

                            <div class="col-md-6">
                                <input id="mobile" type="mobile" class="form-control newmeric @error('mobile') is-invalid @enderror" name="mobile" value="{{ old('mobile') }}" required autocomplete="mobile" autofocus>

                                @error('mobile')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3" id="otp_div" style="display: none">
                            <label for="otp" class="col-md-4 col-form-label text-md-end">{{ __('OTP') }}</label>

                            <div class="col-md-6">
                                <input id="otp" type="text" class="form-control" name="otp"  >
                            </div>
                        </div>


                        <div class="row mb-3" id="pass_div" style="display: none">
                            <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" maxlength="10" minlength="6" class="form-control @error('password') is-invalid @enderror" name="password"  >

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-3" id="con_pass_div" style="display: none">
                            <label for="password_confirmation" class="col-md-4 col-form-label text-md-end">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password_confirmation" type="password" maxlength="10" minlength="6" class="form-control" name="password_confirmation"  >
                            </div>
                        </div>


                        {{-- <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div> --}}

                        <div class="row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary" id="login_submit_div">
                                    {{ __('Login') }}
                                </button>

                                {{-- @if (Route::has('password.request')) --}}
                                    <a class="btn btn-link" href="{{ url('reset-otp') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                {{-- @endif --}}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
      const handle_submit_otp = () => {
            // event.preventDefault()
            document.getElementById('otp_div').style.display="flex";
            document.getElementById('pass_div').style.display="flex"
            document.getElementById('con_pass_div').style.display="flex"
            document.getElementById('otp_div').required=true;
            document.getElementById('pass_div').required=true
            document.getElementById('con_pass_div').required=true

            var mobile = $("#mobile").val();
            // console.log(mobile,password)
            $("#login_submit_div").html(
                '<img height="30" width="30"  src="images/spinner.gif" alt=""> '
            );
            $("#login_submit_div").empty().html(
                `<button type="submit" class="btn btn-primary" onclick="submit_otp();">
                                    {{ __('Submit Otp') }}
                                </button>` 
            );
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                method: "POST",
                url: "reset_otp",
                data: {mobile},
                success: function (res) {
                    console.log(res);
                    if (res.status == "failed") {
                        
                        // $("#login_submit_div").html(` <button type="submit" class="btn btn-primary">
                        //             {{ __('Login') }}
                        //         </button>`);

                         }
                    if(res.status == "success"){
                        alert('your  password is reset')
                    //   window.location.href="home"
                    }
                    // $("#login_submit_div").html(`<button type="submit" class="btn btn-primary flex-center btn-sm">Login</button>`);
                },
              
                error: function (err) {
                    console.log(err);
                },
            });
          
        };




        const submit_otp=()=>{
            var formData = $("#submit_otp_form").serialize();
            // console.log(mobile,password)
            $("#login_submit_div").html(
                '<img height="30" width="30"  src="images/spinner.gif" alt=""> '
            );
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                method: "POST",
                url: "submit-data",
                data: formData,
                success: function (res) {
                    console.log(res);
                    if (res.status == "failed") {
                        
                        $("#login_submit_div").html(` <button type="submit" class="btn btn-primary" >
                                    {{ __('Login') }}
                                </button>`);

                      $("#alert_msg").html(res.message)
                        $("form").addClass("wrong-entry");
                        setTimeout(function () {
                            $("form").removeClass("wrong-entry");
                        }, 3000);
                    }
                    if(res.status == "success"){
                      window.location.href="home"
                    }
                    // $("#login_submit_div").html(`<button type="submit" class="btn btn-primary flex-center btn-sm">Login</button>`);
                },
              
                error: function (err) {
                    console.log(err);
                },
            });
        };

        $(".newmeric").alphanum({
            allowSpace: false, // Allow the space character
            allowUpper: false, // Allow Upper Case characters
            maxLength: 10, // eg Max Length
            allowLatin: false, // a-z A-Z
            allowNumeric: true, // Allow digits 0-9
        });
        
</script>
@endsection
