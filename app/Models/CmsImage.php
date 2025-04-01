<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsImage extends Model
{
    protected $guarded = ['id'];

    public function block()
    {
        return $this->belongsTo(CmsBlock::class, 'cms_block_id');
    }
}
