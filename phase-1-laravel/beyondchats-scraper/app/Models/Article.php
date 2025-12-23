<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'source_url',

        // Phase 2 fields
        'original_article_id',
        'is_ai_generated',
        'references',
        'updated_version',
    ];

    protected $casts = [
        'references' => 'array',
        'is_ai_generated' => 'boolean',
        'updated_version' => 'boolean',
    ];
}

