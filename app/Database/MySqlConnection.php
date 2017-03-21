<?php

namespace App\Database;

use App\Database\Schema\Blueprint;
use App\Database\Schema\Grammars\MySqlGrammar as SchemaGrammar;
use Illuminate\Database\MySqlConnection as LaravelConnection;
use Illuminate\Database\Schema\MySqlBuilder;

class MySqlConnection extends LaravelConnection
{

    public function getSchemaBuilder()
    {
        if (is_null($this->schemaGrammar)) {
            $this->useDefaultSchemaGrammar();
        }

        $builder = new MySqlBuilder($this);

        $builder->blueprintResolver(function ($table, $callback) {
            return new Blueprint($table, $callback);
        });

        return $builder;
    }

    protected function getDefaultSchemaGrammar()
    {
        return $this->withTablePrefix(new SchemaGrammar);
    }
    
}

