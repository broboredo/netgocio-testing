<?php

namespace App\Services;

use GuzzleHttp\Client;

class SportMonksService extends BaseService
{
    protected $url;
    protected $token;

    public function __construct(Client $client, string $url, string $token)
    {
        $this->url = $url;
        $this->token = $token;

        parent::__construct($client);
    }

    public function getSeasons()
    {
        $endpoint = 'seasons';
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }

    public function getSeasonsByCompetition($competitionId)
    {
        $allSeasons = json_decode($this->getSeasons()->getContent(), true)['data'];
        $seasonsFiltered = collect($allSeasons)->filter(function ($seasonObj, $key) use ($competitionId) {
            return $seasonObj['league_id'] === $competitionId;
        });

        return response()->json(['data' => $seasonsFiltered->all()], 200);
    }

    public function getCompetitions()
    {
        $endpoint = 'leagues';
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }

    public function getCompetitionById($id)
    {
        $endpoint = "leagues/$id";
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }

    public function getCompetitionsByCountry($id)
    {
        $endpoint = "countries/$id/leagues";
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }

    public function getClubsBySeason($id)
    {
        $endpoint = "teams/season/$id";
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }

    public function getPlayers($id)
    {
        $endpoint = "teams/$id";
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }

    public function getLeagueTable($id)
    {
        $endpoint = "standings/season/$id";
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }

    public function getCountries()
    {
        $endpoint = "countries";
        $url = $this->url . $endpoint . $this->token;
        return $this->get($url);
    }
}
