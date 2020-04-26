<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\License;
use App\Transformers\ProductTransformer;


class Product extends Model {
    use SoftDeletes;

    public $transformer = ProductTransformer::class;

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
