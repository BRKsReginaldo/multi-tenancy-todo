<?php

namespace App\Enhancements;


use Illuminate\Support\Str;

trait HasPrimaryUuid
{

    /**
     * @return string
     */
    public function getPrimaryKey(): string
    {
        return $this->primaryKey;
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function($model) {
           $model->{$model->getPrimaryKey()} = Str::orderedUuid();
        });
    }
}
