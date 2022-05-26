@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" onsubmit="handleSubmit()"
                    id="login-form"
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

                        <div class="row mb-3">
                            <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

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
      const handleSubmit = () => {
            // event.preventDefault()
            let mobile = $("#mobile").val();
            let password = $("#password").val();
            var formData = $("#login-form").serialize();
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
                url: "attempt-login",
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
