<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Role;
use App\Permission;
use App\License;
use App\Transformers\UserTransformer;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail {
    use Notifiable, SoftDeletes, HasApiTokens;

    const USER_VERIFIED = '1';
    const USER_NOT_VERIFIED = '0';

    public $transformer = UserTransformer::class;

    protected $dates = ['delete_at'];
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

    public function setNameAttribute( $value ) {
        $this->attributes['name'] = strtolower( $value );
    }

    public function setEmailAttribute( $value ) {
        $this->attributes['email'] = strtolower( $value );
    }

    public function getNameAttribute( $value ) {
        return ucfirst( $value );
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

    public function isVerified() {
        return $this->verified == User::USER_VERIFIED;
    }

    public static function generateVerificationToken() {
        return Str::random( 40 );
    }

    public function permissions() {
        return $this->belongsToMany( Permission::class );
    }

    public function licenses() {
        return $this->hasMany( License::class );
    }
}
