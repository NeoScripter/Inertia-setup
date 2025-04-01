<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsBlock extends Model
{
    protected $guarded = ['id'];

    public function images()
    {
        return $this->hasMany(CmsImage::class)->orderBy('order');
    }

    protected $casts = [
        'texts' => 'array',
        'contents' => 'array',
        'boolean' => 'boolean',
        'number' => 'integer',
    ];
}
