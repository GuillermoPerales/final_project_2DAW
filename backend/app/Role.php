<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Permission;

class Role extends Model {
    protected $fillable = [
        'id',
        'name',
    ];

    public function permissions(){
        return $this->belongsToMany(Permission::class);
    }
}
