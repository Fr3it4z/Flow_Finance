<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
        $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

        $monthlyTransactions = $user->transactions()
            ->whereBetween('transaction_date', [$startOfMonth, $endOfMonth]);

        $totalIncome = (clone $monthlyTransactions)->where('type', 'income')->sum('amount');
        $totalExpenses = (clone $monthlyTransactions)->where('type', 'expense')->sum('amount');

        $spendingByCategory = (clone $monthlyTransactions)
            ->where('type', 'expense')
            ->with('category')
            ->selectRaw('category_id, SUM(amount) as total')
            ->groupBy('category_id')
            ->orderByDesc('total')
            ->get()
            ->map(function ($row) use ($totalExpenses) {
                return [
                    'category' => $row->category->name,
                    'icon' => $row->category->icon,
                    'amount' => (float) $row->total,
                    'percentage' => $totalExpenses > 0
                        ? round(($row->total / $totalExpenses) * 100)
                        : 0,
                ];
            });

        $recentActivity = $user->transactions()
            ->with('category')
            ->latest('created_at')
            ->take(5)
            ->get();

        return response()->json([
            'summary' => [
                'total_income' => (float) $totalIncome,
                'total_expenses' => (float) $totalExpenses,
                'net_savings' => (float) ($totalIncome - $totalExpenses),
            ],
            'spending_by_category' => $spendingByCategory,
            'recent_activity' => TransactionResource::collection($recentActivity),
        ]);
    }
}
