<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Tymon\JWTAuth\Facades\JWTAuth;


class ArticleController extends Controller
{
    public function loadArticles(Request $request) {
        if ($request->query('search')) {
            $articles = Article::where('title', 'like', '%' . $request->query('search') . '%')->paginate(25);
            return json_encode($articles);
        } else if ($request->query('source')) {
            $articles = Article::where('source', '=' , $request->query('source'))->paginate(25);
            return json_encode($articles);
        } else {
            $articles = Article::paginate(15);
            return json_encode($articles);
        }
    }
}
