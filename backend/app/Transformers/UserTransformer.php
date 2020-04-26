<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\User;

class UserTransformer extends TransformerAbstract {
    /**
    * List of resources to automatically include
    *
    * @var array
    */
    protected $defaultIncludes = [
        //
    ];

    /**
    * List of resources possible to include
    *
    * @var array
    */
    protected $availableIncludes = [
        //
    ];

    /**
    * A Fractal transformer.
    *
    * @return array
    */

    public function transform( User $user ) {
        return [
            'identifier'=>( int )$user->id,
            'user_name'=>( string )$user->name,
            'user_email'=>( string )$user->email,
            'verified'=>( int )$user->verified,
            'reseller'=>( int )$user->reseller,
            'role'=>( int )$user->role_id,
            'creation_date'=>( string )$user->created_at,
            'update_date'=>( string )$user->updated_at,
            'delete_date'=>isset( $user->deleted_at ) ? ( string )$user->deleted_at : null,
        ];
    }
}
