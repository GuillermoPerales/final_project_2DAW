<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Permission;
use App\Transformers\RoleTransformer;

class Role extends Model {

    use SoftDeletes;
    
    public $transformer = RoleTransformer::class;
    
    protected $dates = ['delete_at'];

    protected $fillable = [
        'name',
    ];

    public function permissions() {
        return $this->belongsToMany( Permission::class );
    }
}
