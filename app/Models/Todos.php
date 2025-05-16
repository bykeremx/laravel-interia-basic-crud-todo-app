<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Todos extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'user_id',          // Kullanıcı ID'si (todo'nun sahibi)
        'category_id',      // Kategori ID'si
        'parent_id',        // Üst todo ID'si (alt görevler için)
        'title',            // Görev başlığı
        'description',      // Görev açıklaması
        'priority',         // Öncelik (low, medium, high)
        'status',           // Durum (pending, in_progress, completed, archived)
        'due_date',         // Bitiş tarihi
        'completed_at',     // Tamamlanma tarihi
        'is_recurring',     // Tekrarlayan görev mi? (boolean)
        'recurring_pattern', // Tekrarlama periyodu (daily, weekly, monthly, yearly)
        'recurring_interval', // Tekrarlama aralığı (sayısal değer)
        'recurring_end_date', // Tekrarlama bitiş tarihi
        'position',         // Sıralama pozisyonu
        'tags',             // Etiketler (JSON formatında)
        'is_private'        // Özel görev mi? (boolean)
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'completed_at' => 'datetime',
        'recurring_end_date' => 'datetime',
        'is_recurring' => 'boolean',
        'is_private' => 'boolean',
        'tags' => 'array'
    ];

    // Durum sabitleri
    public const STATUS_PENDING = 'pending';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_ARCHIVED = 'archived';

    // Öncelik sabitleri
    public const PRIORITY_LOW = 'low';
    public const PRIORITY_MEDIUM = 'medium';
    public const PRIORITY_HIGH = 'high';

    // Kullanıcı ilişkisi
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Kategori ilişkisi
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Üst todo ilişkisi
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Todos::class, 'parent_id');
    }

    // Alt todolar
    public function children(): HasMany
    {
        return $this->hasMany(Todos::class, 'parent_id')->orderBy('position');
    }

    // Tamamlanmış todolar
    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    // Bekleyen todolar
    public function scopePending($query)
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    // Önceliğe göre filtreleme
    public function scopePriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    // Tekrarlanan todolar
    public function scopeRecurring($query)
    {
        return $query->where('is_recurring', true);
    }

    // Tamamlama metodu
    public function markAsCompleted()
    {
        $this->update([
            'status' => self::STATUS_COMPLETED,
            'completed_at' => now()
        ]);
    }
}
