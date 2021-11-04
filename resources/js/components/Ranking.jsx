import React from 'react';
import Table from './Table';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ranking } = this.props;

    return ranking && <Table data={ ranking } />
  }
}

export default Ranking;