<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'color',
        'description',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    // Üst kategori ilişkisi
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Alt kategoriler
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('position');
    }

    // Kullanıcı ilişkisi
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Bu kategoriye ait Todoslar
    public function Todoss(): HasMany
    {
        return $this->hasMany(Todos::class);
    }

    // Varsayılan kategorileri getirme
    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }

    // Kullanıcıya özel kategoriler
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId)->orWhere('is_default', true);
    }
}
