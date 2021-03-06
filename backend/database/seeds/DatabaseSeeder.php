<?php

use App\User;
use App\Product;
use App\Role;
use App\Permission;
use App\License;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        User::truncate();
        Product::truncate();
        Role:: truncate();
        Permission::truncate();
        DB::table('permission_role')->truncate();
        DB::table('permission_user')->truncate();
        License::truncate();
    
        factory(Permission::class,10)->create();        
        factory(Role::class,5)->create()->each(
            function($role){
                $permissions = Permission::all()->random(rand(1,10))->pluck('id');
                $role->permissions()->attach($permissions);
            }
        );
        factory(User::class, 10)->create();
        foreach(User::all()as $user){
            $rol=$user->role_id;
            $permissions=Role::find($rol)->permissions()->pluck('id');
            $user->permissions()->attach($permissions);
        };
        factory(Product::class,20)->create();        
        factory(License::class, 10)->create();

    }
}
