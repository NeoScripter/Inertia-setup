<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/posts', function () {
    return Inertia::render('user/posts');
})->name('posts');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');
});

require __DIR__.'/pages.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
