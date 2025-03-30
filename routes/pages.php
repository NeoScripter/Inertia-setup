<?php

use App\Http\Controllers\Pages\HomePageController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/admin/home', [HomePageController::class, 'edit'])->name('home.edit');
    Route::post('/admin/home/{blockSlug}', [HomePageController::class, 'update'])->name('home.update');
    Route::delete('/blocks/{blockSlug}/image', [HomePageController::class, 'destroyImage'])
    ->name('home.image.destroy');
});

Route::get('/', [HomePageController::class, 'index'])->name('home');
