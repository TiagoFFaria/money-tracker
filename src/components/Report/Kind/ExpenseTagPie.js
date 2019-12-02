import React from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import abbreviate from 'number-abbreviate';
import 'chartist-plugin-tooltips';
import 'chartist/dist/chartist.min.css';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';

class ExpenseByTagsPie extends React.Component {
  render() {
    const sum = function(a, b) { return a.value + b.value };
    const _self = this;
    const options = {
      labelInterpolationFnc: function(value , index) {
        const label = _self.props.data.series[index].name;
        if ( _self.props.data.series.length === 1 ) {
          return label + ' - 100%';
        }
        return label + ' - ' + Math.round(value / _self.props.data.series.reduce(sum) * 100) + '%';
      },
      labelOffset: 80,
      chartPadding: 20,
      plugins: [
        Chartist.plugins.tooltip({
          class: 'mono',
          currency: this.props.currency,
        })
      ]
    };

    return (
      <ChartistGraph
        type="Pie"
        className="ct-octave mt-report-expense-tag-pie"
        data={this.props.data}
        options={options}
      />
    );
  }
}

ExpenseByTagsPie.propTypes = {
  currency: PropTypes.string,
  data: PropTypes.shape({
    labels: PropTypes.array,
    series: PropTypes.array
  })
};

export default ExpenseByTagsPie;
