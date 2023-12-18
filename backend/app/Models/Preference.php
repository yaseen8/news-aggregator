<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Preference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'source'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
