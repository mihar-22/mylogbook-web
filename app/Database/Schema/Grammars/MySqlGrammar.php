<?php

namespace App\Database\Schema\Grammars;

use Illuminate\Database\Schema\Grammars\MySqlGrammar as LaravelGrammar;
use Illuminate\Support\Fluent;

class MySqlGrammar extends LaravelGrammar {

    protected function typeSet(Fluent $column)
    {
        return "set('".implode("', '", $column->allowed)."')";
    }

}