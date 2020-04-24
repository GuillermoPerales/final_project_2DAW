<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\ApiController;
use App\User;
use Illuminate\Http\Request;

class UserPermissionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {       
        $permissions= $user->permissions;
        return $this->showAll($permissions);
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
