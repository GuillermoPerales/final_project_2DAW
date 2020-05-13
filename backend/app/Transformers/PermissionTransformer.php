<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Permission;

class PermissionTransformer extends TransformerAbstract {
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

    public function transform( Permission $permission ) {
        return [
            'permission_id'=>( int )$permission->id,
            'permission_name'=>( string )$permission->name,
        ];
    }
}
