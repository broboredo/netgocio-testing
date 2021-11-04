<?php

namespace App\Services;

use App\Models\ServiceResponses;
use GuzzleHttp\Client;

class BaseService
{
    const HTTP_STATUS_CODE_SUCCESS = 200;
    const HTTP_STATUS_CODE_CREATED = 201;

    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function get(string $url, array $headers = [])
    {
        try {
            if ($this->checkServiceExists($url)) {
                return $this->getResponseFromDatabase($url);
            }

            $response = $this->client->request('GET', $url, $headers);
            $data = $response->getBody()->getContents();

            if ($response->getStatusCode() === self::HTTP_STATUS_CODE_SUCCESS) {
                $this->saveResponse($url, $data, $response->getStatusCode());
            }

            return response($data, $response->getStatusCode());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() > 0 ? $e->getCode() : 500);
        }
    }

    private function checkServiceExists(string $url): bool
    {
        return ServiceResponses::where('url', $url)->exists();
    }

    private function getResponseFromDatabase(string $url)
    {
        $data = ServiceResponses::where('url', $url)->first();

        return response($data->response, $data->status_code);
    }

    private function saveResponse(string $url, $response, int $statusCode, $enabled = true): void
    {
        ServiceResponses::create([
            'url' => $url,
            'response' => $response,
            'status_code' => $statusCode,
            'enabled' => $enabled,
        ]);
    }
}
