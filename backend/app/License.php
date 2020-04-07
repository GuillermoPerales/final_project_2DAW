<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\product;

class License extends Model {
    protected $fillable = [
        'license_key',
        'user_id',
        'product_id',
        'name',
        'activation_date',
        'expiration_date'
    ];

public function user(){
    return $this->belongsTo(User::class);
}

public function product(){
    return $this->belongsTo(Product::class);
}

}
