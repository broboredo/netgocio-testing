<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('seasons', 'App\Http\Controllers\RankingController@seasons');
Route::get('seasons/competition/{competitionId}', 'App\Http\Controllers\RankingController@seasonsByCompetition');
Route::get('countries', 'App\Http\Controllers\RankingController@countries');
Route::get('competitions/{competitionId?}', 'App\Http\Controllers\RankingController@competitions');
Route::get('competitions/country/{countryId}', 'App\Http\Controllers\RankingController@competitionsByCountry');
Route::get('clubs/{seasonId}', 'App\Http\Controllers\RankingController@clubs');
Route::get('players/{clubId}', 'App\Http\Controllers\RankingController@players');
Route::get('ranking/{seasonId}', 'App\Http\Controllers\RankingController@ranking');
