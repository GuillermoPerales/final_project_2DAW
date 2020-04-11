<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use App\Role;
use App\Permission;

class User extends Authenticatable {
    use Notifiable;

    const USER_VERIFIED = '1';
    const USER_NOT_VERIFIED = '0';
    
    
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'verified',
        'verification_token',
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

public function Permissions(){
    return $this->hasMany(Permission::class);
}

}
