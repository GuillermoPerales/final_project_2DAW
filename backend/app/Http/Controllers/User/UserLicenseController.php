<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\ApiController;
use App\User;
use App\License;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserLicenseController extends ApiController {
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    public function index( User $user ) {
        $licenses = $user->licenses;
        return $this->showAll( $licenses );
    }

    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */

    public function store( Request $request, User $user ) {
        $rules = [
            'name'=>'required',
            'type'=>'required',
            'price'=>'required|integer',
            'product_id'=>'required'

        ];
        $this->validate( $request, $rules );

        $data = $request->all();
        $data['license_key'] = 'LicenciaDePrueba123';
        $data['activation_date'] = now();
        $data['expiration_date'] = now()->addMonths( 3 );
        $data['user_id'] = $user->id;

        $license = License::create( $data );
        return $this->showOne( $license, 201 );
    }

    /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\User  $user
    * @return \Illuminate\Http\Response
    */

    public function update( Request $request, User $user, License $license ) {
        $rules = [
            'expiration_date'=>'required',
            'product_id'=>'required'
        ];
        $this->validate( $request, $rules );

        if ( $user->id !=  $license->user_id ) {
            return $this->errorResponse( 'User is not the owner of the license', 422 );
        }

        $request['expiration_date'] = now()->addMonths(1);

        $license->fill( $request->only( [
            'name',
            'type',
            'price',
            'license_key',
            'activation_date',
            'expiration_date',
            'user_id',
            'product_id',
        ] ) );

        if ( $license->isClean() ) {
            return $this->errorResponse( 'Nothing change', 422 );
        }
        $license->save();
        return $this->showOne($license);
    }

    /**
    * Remove the specified resource from storage.
    *
    * @param  \App\User  $user
    * @return \Illuminate\Http\Response
    */

    public function destroy( User $user , License $license ) {
        if ( $user->id !=  $license->user_id ) {
            throw new HttpException(422,"User is not the owner of the license");            
        }
        $license->delete();
        return $this->showOne($license);

    }
}
