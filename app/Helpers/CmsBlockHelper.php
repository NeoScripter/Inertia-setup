<?php

namespace App\Helpers;

use App\Models\CmsBlock;

class CmsBlockHelper
{
    public static function getByPage(string $pageSlug)
    {
        return CmsBlock::with(['images' => function ($query) {
            $query->orderBy('order');
        }])
            ->where('page_slug', $pageSlug)
            ->get()
            ->keyBy('block_slug');
    }
}
