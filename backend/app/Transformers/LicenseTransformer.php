<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\License;

class LicenseTransformer extends TransformerAbstract
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
    public function transform(License $license)
    {
        return [
            'identifier'=>(int)$license->id,
            'product_id'=>(string)$license->product_id,
            'key'=>(string)$license->license_key,     
            'purchase_date'=>(string)$license->activation_date,
            'renovation_date'=>(string)$license->expiration_date,
            'owner'=>(int)$license->user_id,
            
        ];
    }
}
