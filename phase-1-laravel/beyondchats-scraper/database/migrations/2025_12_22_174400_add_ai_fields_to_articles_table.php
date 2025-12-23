<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->unsignedBigInteger('original_article_id')->nullable()->after('source_url');
            $table->boolean('is_ai_generated')->default(false)->after('original_article_id');
            $table->json('references')->nullable()->after('is_ai_generated');
            $table->boolean('updated_version')->default(false)->after('references');
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn([
                'original_article_id',
                'is_ai_generated',
                'references',
                'updated_version',
            ]);
        });
    }
};
