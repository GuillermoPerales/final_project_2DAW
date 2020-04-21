<?php

namespace App\Http\Controllers\Role;

use App\Role;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

class RoleController extends ApiController {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index() {
        $roles = Role::all();
        return $this->showAll( $roles );
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
        $this->validate( $request, $rules );
        $role = Role::create( $request->all() );
        return $this->showOne( $role, 201 );
    }

    /**
    * Display the specified resource.
    *
    * @param  \App\Role  $role
    * @return \Illuminate\Http\Response
    */

    public function show( Role $role ) {
        return $this->showOne( $role );
    }

    /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\Role  $role
    * @return \Illuminate\Http\Response
    */

    public function edit( Role $role ) {
        //
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\Role  $role
    * @return \Illuminate\Http\Response
    */

    public function update( Request $request, Role $role ) {
        $role->fill( $request->only( ['name'] ) );
        if ( $role->isClean() ) {
            return $this->errorResponse( 'Nothing change', 422 );
        }
        $role->save();
        return $this->showOne( $role );
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Role  $role
    * @return \Illuminate\Http\Response
    */

    public function destroy( Role $role ) {
        $role->delete();
        return $this->showOne( $role );
    }
}
