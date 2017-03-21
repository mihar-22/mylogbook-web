<?php

namespace App\Database\Schema\Grammars;

use Illuminate\Database\Schema\Grammars\SQLiteGrammar as LaravelGrammar;
use Illuminate\Support\Fluent;

class SQLiteGrammar extends LaravelGrammar 
{

    protected function typeSet(Fluent $column)
    {
        return implode("', '", $column->allowed);
    }
}
