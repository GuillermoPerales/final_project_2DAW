<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Role;
use App\User;

class Permission extends Model {
    use SoftDeletes;
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
