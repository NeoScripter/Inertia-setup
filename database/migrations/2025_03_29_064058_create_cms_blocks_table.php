<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cms_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug');
            $table->string('block_slug');
            $table->string('text')->nullable()->default(null);
            $table->json('texts')->nullable()->default(null);
            $table->text('content')->nullable()->default(null);
            $table->json('contents')->nullable()->default(null);
            $table->string('image')->nullable()->default(null);
            $table->string('color')->nullable()->default(null);
            $table->integer('number')->nullable()->default(null);
            $table->boolean('boolean')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cms_blocks');
    }
};
