<?php
namespace App\Http\Controllers\Auth;
use App\User;
use App\Role;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Auth;

class AuthController extends ApiController {
    public function login( Request $request ) {

        $request->validate( [
            'email' => 'required|string|email',
            'password' => 'required|string',
            //'remember_me' => 'boolean'
        ] );
        $credentials = request( ['email', 'password'] );
        if ( !Auth::attempt( $credentials ) )
        return response()->json( [
            'message' => 'Unauthorized'
        ], 401 );
        $user = $request->user();
        $tokenResult = $user->createToken( 'Personal Access Token' );
        $token = $tokenResult->token;
        if ( $request->remember_me )
        $token->expires_at = Carbon::now()->addWeeks( 1 );
        $token->save();
        return response()->json( [
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ] );
    }

    public function register( Request $request ) {

        $rules = [
            'username'=> 'required',
            'email'=> 'required|email|unique:users',
            'password'=> 'required|min:6|confirmed',
            'reseller'=>'required',
        ];

        $this->validate( $request, $rules );

        $fields = $request->except( ['username'] );
        $fields['name'] = $request['username'];
        $fields['password'] = bcrypt( $request->password );
        $fields['verified'] = User::USER_NOT_VERIFIED;
        $fields['verification_token'] = User::generateVerificationToken();
        $fields['role_id'] = $request['role'];
        $fields['reseller'] = $request->reseller;

        $user = User::create( $fields );

        $permissions = Role::find( $user->role_id )->permissions()->pluck( 'id' );
        $user->permissions()->attach( $permissions );

        return $this->showOne( $user, 201 );
    }

    public function logout( Request $request ) {
        $request->user()->token()->revoke();
        return $this->successResponse( 'Logged out', 200 );
        // return response()->json( [
        //     'message' => 'Successfully logged out'
        // ] );
    }

    /**
    * Get the authenticated User
    *
    * @return [json] user object
    */

    public function user( Request $request ) {
        return response()->json( $request->user() );
    }
}