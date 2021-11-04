<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SportMonksService;
use GuzzleHttp\Client;

class RankingController extends Controller
{
    private $service;

    public function __construct(SportMonksService $service)
    {
        $this->service = $service;
    }

    public function seasons()
    {
        return $this->service->getSeasons();
    }

    public function seasonsByCompetition(int $competitionId)
    {
        return $this->service->getSeasonsByCompetition($competitionId);
    }

    public function competitions(int $competitionId = null)
    {
        if (is_null($competitionId)) {
            return $this->service->getCompetitions();
        }

        return $this->service->getCompetitionById($competitionId);
    }

    public function clubs(int $seasonId)
    {
        return $this->service->getClubsBySeason($seasonId);
    }

    public function players(int $clubId)
    {
        return $this->service->getPlayers($clubId);
    }

    public function ranking(int $seasonId)
    {
        return $this->service->getLeagueTable($seasonId);
    }

    public function countries()
    {
        return $this->service->getCountries();
    }

    public function competitionsByCountry(int $countryId)
    {
        return $this->service->getCompetitionsByCountry($countryId);
    }
}
