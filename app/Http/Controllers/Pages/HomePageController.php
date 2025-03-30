<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\CmsBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index()
    {
        $blocks = CmsBlock::where('page_slug', 'home')
            ->get()
            ->keyBy('block_slug');

        return Inertia::render('user/welcome', [
            'blocks' => $blocks,
        ]);
    }

    /**
     * Show the edit page for a specific page's blocks.
     */
    public function edit()
    {
        $blocks = CmsBlock::where('page_slug', 'home')
            ->get()
            ->keyBy('block_slug');

        return Inertia::render('admin/home', [
            'blocks' => $blocks,
        ]);
    }

    /**
     * Update or create a block with a given slug.
     */
    public function update(Request $request, string $blockSlug)
    {
        $validated = $request->validate([
            'text' => 'nullable|string|max:255',
            'texts' => 'nullable|array',
            'texts.*' => 'nullable|string|max:255',

            'content' => 'nullable|string|max:65534',
            'contents' => 'nullable|array',
            'contents.*' => 'nullable|string|max:65534',

            'image' => 'nullable|image|max:1024',
            'images' => 'nullable|array',
            'images.*' => 'image|max:1024',

            'color' => 'nullable|string|max:255',
            'number' => 'nullable|integer',
            'boolean' => 'nullable|boolean',
        ]);

        $block = CmsBlock::firstOrNew([
            'page_slug' => 'home',
            'block_slug' => $blockSlug,
        ]);

        $block->fill([
            'text' => $validated['text'] ?? null,
            'texts' => $validated['texts'] ?? null,
            'content' => $validated['content'] ?? null,
            'contents' => $validated['contents'] ?? null,
            'color' => $validated['color'] ?? null,
            'number' => $validated['number'] ?? null,
            'boolean' => $validated['boolean'] ?? null,
        ]);

        if ($request->hasFile('image')) {
            if ($block->image && Storage::disk('public')->exists($block->image)) {
                Storage::disk('public')->delete($block->image);
            }

            $path = $request->file('image')->store('cms_blocks/images', 'public');
            $block->image = $path;
        }

        if ($request->hasFile('images')) {
            if (is_array($block->images)) {
                foreach ($block->images as $oldImage) {
                    if (Storage::disk('public')->exists($oldImage)) {
                        Storage::disk('public')->delete($oldImage);
                    }
                }
            }

            $storedPaths = [];
            foreach ($request->file('images') as $image) {
                $storedPaths[] = $image->store('cms_blocks/images', 'public');
            }

            $block->images = $storedPaths;
        }

        $block->save();

        return redirect()->back();
    }
}
