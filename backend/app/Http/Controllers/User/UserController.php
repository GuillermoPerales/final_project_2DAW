<?php

namespace App\Http\Controllers\User;

use App\User;
use App\Role;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class UserController extends ApiController {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\ResponseSupport
    */

    public function index() {
        $users = User::all();
        return $this->showAll( $users );
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function create() {
        //
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */

    public function store( Request $request ) {
        $rules = [
            'name'=> 'required',
            'email'=> 'required|email|unique:users',
            'password'=> 'required|min:6|confirmed',
        ];

        $this->validate( $request, $rules );

        $fields = $request->all();
        $fields['password'] = bcrypt( $request->password );
        $fields['verified'] = User::USER_NOT_VERIFIED;
        $fields['verification_token'] = User::generateVerificationToken();
        $fields['role_id'] = 1;
        $fields['reseller'] = 1;

        $user = User::create( $fields );

        return $this->showOne( $user, 201 );
    }

    /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function show( User $user ) {

        return $this->showOne( $user );
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function edit( $id ) {
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function update( Request $request, User $user ) {

        $rules = [
            'user_email'=> '|email|unique:users,email,'. $user->id,
        ];
        $this->validate( $request, $rules );

        if ( $request->has( 'user_name' ) ) {
            $user->name = $request->user_name;
        }

        if ( $request->has( 'user_email' ) && $user->email != $request->user_email ) {
            $user->verified = User::USER_NOT_VERIFIED;
            $user->verification_token = User::generateVerificationToken();
            $user->email = $request->user_email;
        }

        if ( $request->has( 'password' ) ) {
            $user->password = bcrypt( $request->password );
        }

        if ( $request->has( 'role' ) ) {
            $user->permissions()->detach();
            $user->role_id = $request->role;
            $permissions = Role::find( $request->role )->permissions()->pluck( 'id' );
            $user->permissions()->attach( $permissions );
        }

        if ( !$user->isDirty() ) {
            return $this->errorResponse( 'Nothing change', 422 );
        }

        $user->save();
        return $this->showOne( $user );

    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( User $user ) {
        $user->delete();
        return $this->showOne( $user );
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function resellers( $reseller ) {
        $resellers = User::all()->where( 'reseller', $reseller )->where( 'role_id', '<>', 1 );
        return $this->showAll( $resellers );
    }
}
