<?php

namespace App\Database;

use App\Database\Schema\Blueprint;
use App\Database\Schema\Grammars\SQLiteGrammar as SchemaGrammar;
use Illuminate\Database\SQLiteConnection as LaravelConnection;
use Illuminate\Database\Schema\Builder as SchemaBuilder;

class SQLiteConnection extends LaravelConnection
{

    public function getSchemaBuilder()
    {
        if (is_null($this->schemaGrammar)) {
            $this->useDefaultSchemaGrammar();
        }

        $builder = new SchemaBuilder($this);

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