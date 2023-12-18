<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Preference;

class PreferenceController extends Controller
{
    public function set_user_preference(Request $request) {
        $preference = Preference::updateOrCreate(
            ['user_id' => $request->user->id],
            ['source' => $request->source]
        );
        return json_encode($preference);
    }
}
