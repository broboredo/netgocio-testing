import React from 'react';
import Ranking from '../Ranking';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        countries: [],
        countrySelected: null,
        competitions: [],
        competitionSelected: null,
        seasons: [],
        seasonSelected: null,
        ranking: null,
        error: null,
    }

    this.setCountries();
  }

  setCountries = () => {
    this.setState({selectedCompetition: null, competitions: [], seasonSelected: null, seasons: [], ranking: null});
    axios.get('/countries').then(
      response => {
        this.setState({countries: response.data.data});
      }
    )
    .catch(error => {
      console.error("ERROR:: ", error);
    });
  }

  setCompetitions = () => {
    this.setState({error: null, seasonSelected: null, seasons: [], ranking: null});
    const { countrySelected } = this.state;
    if (countrySelected) {
        axios.get(`/competitions/country/${countrySelected}`).then(
            response => {
                const data = response.data.data;
                this.setState({
                    competitions: data,
                    error: data.length === 0 ? 'No data' : null
                });
            }
        )
        .catch(error => {
            console.error("ERROR:: ", error);
        });
    }
  }

  setSeasons = () => {
    this.setState({error: null, ranking: null});
    const { competitionSelected } = this.state;
    if (competitionSelected) {
        axios.get(`/seasons/competition/${competitionSelected}`).then(
            response => {
              this.setState({seasons: response.data.data});
            }
          )
          .catch(error => {
            console.error("ERROR:: ", error);
          });
    }
  }

  setStandings = () => {
    this.setState({ error: null, ranking: null });
    const {seasonSelected} = this.state;
    if (seasonSelected) {
      axios.get(`/ranking/${seasonSelected}`).then(
        response => {
          const data = response.data.data[0];
          this.setState({
              ranking: data.standings.data
        });
        }
      )
      .catch(error => {
        this.setState({error: 'No data'});
        console.error("ERROR:: ", error);
      });
    }
  }

  render() {
    const { countries, competitions, seasons, error, ranking } = this.state;
    return <div className='container'>
        <form>
            <div className="form-row">
                <div className="form-group col-4">
                    <label html-for="select-country" className='form-label'>Country</label>
                    <select className="form-control form-select form-select-sm mb-3" id="select-country" onChange={e => this.setState({countrySelected: e.target.value}, this.setCompetitions)}>
                        <option>Select a Country</option>
                        {countries.map(country =>
                            <option data-thumbnail={country.image_path} key={country.id} value={country.id}>{country.name}</option>
                        )}
                    </select>
                </div>
                <div className='form-group col-4'>
                    <label html-for="select-competition" className='form-label'>Competition</label>
                    <select className="form-control form-select form-select-sm mb-3" id="select-competition" onChange={e => this.setState({competitionSelected: e.target.value}, this.setSeasons)}>
                        <option>Select a Competition</option>
                        {competitions.map(competition => <option key={competition.id} value={competition.id}>{competition.name}</option>)}
                    </select>
                </div>
                <div className='form-group col-4'>
                    <label html-for="select-season" className='form-label'>Season</label>
                    <select className="form-control form-select form-select-sm mb-3" id="select-season" onChange={e => this.setState({seasonSelected: e.target.value}, this.setStandings)}>
                        <option>Select a Season</option>
                        {seasons.map(season => <option key={season.id} value={season.id}>{season.name}</option>)}
                    </select>
                </div>
            </div>
        </form>
        <div className='col-md-12'>
            <div className='row'>
                { error &&
                    <div className='col-12'>
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                }
                <Ranking ranking={ranking} />
            </div>
        </div>
    </div>
  }
}

export default Index;
