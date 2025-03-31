<?php

namespace App\Helpers;

use App\Models\CmsBlock;

class CmsBlockHelper
{
    public static function getByPage(string $pageSlug)
    {
        return CmsBlock::where('page_slug', $pageSlug)
            ->get()
            ->keyBy('block_slug');
    }
}
