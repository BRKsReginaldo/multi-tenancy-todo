<?php

namespace App\TenantModels;

use Hyn\Tenancy\Traits\UsesTenantConnection;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use UsesTenantConnection;

    protected $fillable = ['body'];
}
