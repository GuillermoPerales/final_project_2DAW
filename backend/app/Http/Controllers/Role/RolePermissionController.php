<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\ApiController;
use App\Role;
use Illuminate\Http\Request;

class RolePermissionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Role $role)
    {
        $permissions= $role->permissions;
        return $this->showAll($permissions); 
    }

  
}
