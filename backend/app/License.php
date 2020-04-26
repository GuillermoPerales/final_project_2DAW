<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use App\User;
use App\Product;
use App\Transformers\LicenseTransformer;

class License extends Product {

    use SoftDeletes;

    public $transformer = LicenseTransformer::class;

    protected $dates=['delete_at'];

    protected $fillable = [        
        'license_key',     
        'activation_date',
        'expiration_date',
        'user_id',
        'product_id',
    ];

public function user(){
    return $this->belongsTo(User::class);
}

public function product(){
    return $this->belongsTo(Product::class);
}

}
