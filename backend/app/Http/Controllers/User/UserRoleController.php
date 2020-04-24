<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\ApiController;
use App\User;
use App\Role;
use Illuminate\Http\Request;

class UserRoleController extends ApiController {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index( User $user ) {
        $rol = $user->role_id;
        $result = Role::find( $rol );
        return $this->showOne( $result );
    }
 

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\User  $user
    * @return \Illuminate\Http\Response
    */

    public function update( Request $request, User $user ) {
        $rules = [
            'role_id'=>'required | integer'
        ];
        $this->validate( $request, $rules );
        
        $user->fill( $request->only( ['role_id'] ) );
            
        
        if ( $user->isClean() ) {
            return $this->errorResponse( 'Nothing change', 422 );
        }

        $user->save();
        return $this->showOne($user);
    }


}
