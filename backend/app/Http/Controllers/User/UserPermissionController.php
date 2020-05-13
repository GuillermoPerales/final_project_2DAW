<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\ApiController;
use App\User;
use App\Permission;
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

    public function update(User $user,Permission $permission ) {       
        
        $user->permissions()->syncWithoutDetaching($permission);  

        $user->save();
        return $this->showAll($user->permissions);
    }

       /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function destroy( User $user, Permission $permission ) {
        $user->permissions()->detach($permission);  

        $user->save();
        return $this->showAll($user->permissions);
    }
}
