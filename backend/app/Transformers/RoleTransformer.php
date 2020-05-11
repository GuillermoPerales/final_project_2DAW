<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Role;

class RoleTransformer extends TransformerAbstract
{
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
    public function transform(Role $role)
    {
        return [
            'role_id'=>(int)$role->id,
            'role_name'=>(string)$role->name
        ];
    }
}
