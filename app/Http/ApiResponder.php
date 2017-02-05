<?php

namespace App\Http;

use Illuminate\Http\Response;
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;
use League\Fractal\Serializer\DataArraySerializer;
use League\Fractal\TransformerAbstract;

class ApiResponder
{
    private $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }

    public function respondWithMessage($message)
    {
        return $this->respond($message);
    }

    public function respondWithData($message, $data)
    {
        return $this->respond($message, $data);
    }

    public function respondWithErrors($message, $errors)
    {
        return $this->respond($message, null, $errors);
    }

    public function respondWithNoContent()
    {
        return response([]);
    }

    public function respondWithCollection($collection, TransformerAbstract $transformer)
    {
        $message = "collection of {$collection[0]->getTable()}";

        $resource = new Collection($collection, $transformer);

        $data = $this->serialize($resource)['data']; 

        return $this->respond($message, $data);
    }

    private function respond($message = '', $data = null, $errors = null)
    {
        $response = array_filter([
            'message' => $message, 
            'data' => $data, 
            'errors' => $errors
        ]);

        return response($response);
    }

    private function serialize($resource)
    {
        return $this->manager->createData($resource)->toArray();
    }
}