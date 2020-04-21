<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Role;
use App\Permission;
use App\Licenses;

class User extends Authenticatable {
    use Notifiable, SoftDeletes;

    const USER_VERIFIED = '1';
    const USER_NOT_VERIFIED = '0';
    
    protected $dates=['delete_at'];
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [        
        'name',
        'email',
        'password',
        'verified',
        'verification_token',
        'reseller',
        'role_id'
    ];

    public function setNameAttribute($value){
        $this->attributes['name']= strtolower($value);
    }
    public function setEmailAttribute($value){
        $this->attributes['email']= strtolower($value);
    }
    public function getNameAttribute($value){
        return ucfirst($value);
    }

    /**
    * The attributes that should be hidden for arrays.
    *
    * @var array
    */
    protected $hidden = [
        'password',
        'remember_token',
        'verification_token',
    ];

    // /**
    // * The attributes that should be cast to native types.
    // *
    // * @var array
    // */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    public function isVerified(){
        return $this->verified == User::USER_VERIFIED;
    }

public static function generateVerificationToken(){
    return Str::random(40);
}

public function rol(){
    return $this->hasOne(Role::class);
}

public function permissions(){
    return $this->hasMany(Permission::class);
}

public function licenses(){
    return $this->hasMany(Licenses::class);
}
}
