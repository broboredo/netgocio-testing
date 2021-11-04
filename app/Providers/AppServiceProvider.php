<?php

namespace App\Providers;

use App\Services\SportMonksService;
use App\Services\BaseService;
use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Client;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(BaseService::class, Client::class);
        $this->registerServices();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    public function registerServices()
    {
        app()->bind(SportMonksService::class, function () {
            $url = env('API_URL');
            $token = '?api_token=' . env('API_TOKEN');
            $client = new Client();

            return new SportMonksService($client, $url, $token);
        });
    }
}
