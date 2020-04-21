<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\License;

class Product extends Model {
    use SoftDeletes;
    protected $dates = ['delete_at'];

    protected $fillable = [
        'name',
        'type',
        'price',
    ];

    public function licenses() {
        return $this->hasMany( License::class );
    }
}
