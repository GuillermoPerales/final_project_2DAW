<?php

namespace App\Http\Controllers\Permission;

use App\Http\Controllers\ApiController;
use App\Permission;
use Illuminate\Http\Request;

class PermissionController extends ApiController {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index() {
        $permissions = Permission::all();
        return $this->showAll( $permissions );
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
            'name'=>'required'
        ];
        $this->validator( $request, $rules );
        $permission = Permission::create( $request->all() );
        return $this->showOne( $permission, 201 );
    }

    /**
    * Display the specified resource.
    *
    * @param  \App\Permission  $permission
    * @return \Illuminate\Http\Response
    */

    public function show( Permission $permission ) {
        return $this->showOne($permission);
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\Permission  $permission
    * @return \Illuminate\Http\Response
    */

    public function edit( Permission $permission ) {
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Permission  $permission
    * @return \Illuminate\Http\Response
    */

    public function update( Request $request, Permission $permission ) {
        $permission->fill( $request->only( ['name'] ) );
        if ( $permission->isClean() ) {
            return $this->errorResponse( 'Nothing change', 422 );
        }
        $permission->save();
        return $this->showOne( $permission );
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Permission  $permission
    * @return \Illuminate\Http\Response
    */

    public function destroy( Permission $permission ) {
        $permission->delete();
        return $this->showOne( $permission );
    }
}
