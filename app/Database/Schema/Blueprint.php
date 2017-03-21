<?php

namespace App\Database\Schema;

use Illuminate\Database\Schema\Blueprint as LaravelBlueprint;

class Blueprint extends LaravelBlueprint {

    public function set($column, array $allowed)
    {
        return $this->addColumn('set', $column, compact('allowed'));
    }

}