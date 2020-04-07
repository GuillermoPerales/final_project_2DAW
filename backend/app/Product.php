<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\License;

class Product extends Model
{
    protected $fillable =[
        'id',
        'name',
        'type',
        'price',
    ];

    public function licenses(){
        return $this->hasMany(License::class);
    }
}
