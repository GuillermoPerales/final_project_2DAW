<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Role;
use App\Permission;
use App\Product;
use App\License;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    static $password;
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        // 'email_verified_at' => now(),
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => Str::random(10),
        'verified'=> $verified = $faker->randomElement([User::USER_VERIFIED,User::USER_NOT_VERIFIED]),
        'verification_token'=> $verified == User::USER_VERIFIED ? null : User::generateVerificationToken(),
        'role_id'=>Role::all()->random()->id,
        'reseller'=>$faker->numberBetween(1,3)
    ];
});

 $factory->define(Role::class, function (Faker $faker) {  
    return [
        'name' => $faker->word,       
    ];
}); 

$factory->define(Permission::class, function (Faker $faker) {  
    return [
        'name' => $faker->word,       
    ];
});

$factory->define(Product::class, function (Faker $faker) {  
    return [
        'name' => $faker->word,
        'type' => $faker->word,
        'price' => $faker->numberBetween(1,500),   
    ];
});

$factory->define(License::class, function (Faker $faker) {  
    return [
        'license_key'=>$faker->md5,
        'user_id'=> User::all()->random()->id,
        'product_id'=> Product::all()->random()->id,       
        'activation_date' => now(),   
        'expiration_date' => now()->addMonths(1),   
    ];
});