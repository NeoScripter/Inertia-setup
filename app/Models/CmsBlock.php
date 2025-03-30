<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsBlock extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'texts' => 'array',
        'contents' => 'array',
        'images' => 'array',
        'boolean' => 'boolean',
        'number' => 'integer',
    ];
}
