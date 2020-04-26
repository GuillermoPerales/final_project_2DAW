<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Role;
use App\User;
use App\Transformers\PermissionTransformer;

class Permission extends Model {
    use SoftDeletes;

    public $transformer = PermissionTransformer::class;

    protected $dates = ['delete_at'];

    protected $fillable = [
        'name',
    ];

    public function roles() {
        return $this->belongsToMany( Role::class );
    }

    public function users() {
        return $this->belongsToMany( User::class );
    }
}
