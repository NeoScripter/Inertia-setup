<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CmsBlock;
use App\Models\CmsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CMSController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'page_slug' => 'required|string|max:255',
            'block_slug' => 'required|string|max:255',

            'text' => 'nullable|string|max:255',
            'texts' => 'nullable|array',
            'texts.*' => 'required|string|max:255',

            'content' => 'nullable|string|max:65534',
            'contents' => 'nullable|array',
            'contents.*' => 'required|string|max:65534',

            'image' => 'nullable|image|max:1024',
            'images' => 'nullable|array',
            'images*' => 'nullable|image|max:1024',

            'date' => 'nullable|date_format:Y-m-d',

            'color' => 'nullable|string|max:255',
            'number' => 'nullable|integer|min:-2147483648|max:2147483647',
            'boolean' => 'nullable|boolean',
        ]);

        $block = CmsBlock::firstOrNew([
            'page_slug' => $validated['page_slug'],
            'block_slug' => $validated['block_slug'],
        ]);

        $block->fill([
            'text' => $validated['text'] ?? null,
            'texts' => $validated['texts'] ?? null,
            'content' => $validated['content'] ?? null,
            'contents' => $validated['contents'] ?? null,
            'color' => $validated['color'] ?? null,
            'number' => $validated['number'] ?? null,
            'boolean' => $validated['boolean'] ?? null,
            'date' => $validated['date'] ?? null,
        ]);

        $block->save();

        if ($request->hasFile('image')) {
            if ($block->image && Storage::disk('public')->exists($block->image)) {
                Storage::disk('public')->delete($block->image);
            }

            $path = $request->file('image')->store('cms_blocks/images', 'public');
            $block->image = $path;
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('cms_blocks/images', 'public');

                $block->images()->create([
                    'path' => $path,
                    'order' => $block->images()->count(),
                ]);
            }
        }

        return redirect()->back();
    }

    public function destroyImage(Request $request)
    {
        $validated = $request->validate([
            'page_slug' => 'required|string|max:255',
            'block_slug' => 'required|string|max:255',
        ]);

        $block = CmsBlock::where('page_slug', $validated['page_slug'])
            ->where('block_slug', $validated['block_slug'])
            ->firstOrFail();

        if ($block->image && Storage::disk('public')->exists($block->image)) {
            Storage::disk('public')->delete($block->image);
        }

        $block->image = null;
        $block->save();

        return redirect()->back();
    }

    public function destroyGalleryImage(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer',
            'page_slug' => 'required|string|max:255',
            'block_slug' => 'required|string|max:255',
        ]);

        $image = CmsImage::findOrFail($validated['id']);

        if (Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        $image->delete();

        $block = CmsBlock::where('page_slug', $validated['page_slug'])
            ->where('block_slug', $validated['block_slug'])
            ->firstOrFail();

        $images = $block->images()->orderBy('order')->get();

        foreach ($images as $index => $img) {
            if ($img->order !== $index) {
                $img->order = $index;
                $img->save();
            }
        }

        return redirect()->back();
    }

    public function reorderGalleryImages(Request $request)
    {
        $validated = $request->validate([
            'page_slug' => 'required|string|max:255',
            'block_slug' => 'required|string|max:255',
            'order' => 'required|array',
            'order.*' => 'integer|exists:cms_images,id',
        ]);

        $block = CmsBlock::where('page_slug', $validated['page_slug'])
            ->where('block_slug', $validated['block_slug'])
            ->firstOrFail();

        foreach ($validated['order'] as $index => $imageId) {
            CmsImage::where('id', $imageId)->update(['order' => $index]);
        }

        return back();
    }
}
