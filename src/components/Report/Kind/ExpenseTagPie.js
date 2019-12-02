import React from 'react';
import PropTypes from 'prop-types';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import 'chartist-plugin-tooltips';
import 'chartist/dist/chartist.min.css';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';

class ExpenseByTagsPie extends React.Component {
  render() {
    const _self = this;
    var total=0;
    var size=0;
    var pointer=0;
    const options = {
      labelInterpolationFnc: function(value , index) {
        const label = _self.props.data.series[index].name;
        if ( _self.props.data.series.length === 1 ) {
          return label + ' - 100%';
        }
        //Collecting total ammount of expenses
        size = _self.props.data.series.length;
        pointer = 0;
        total = 0;
        while(size>0){
          total += _self.props.data.series[pointer].value;
          console.log('total:'+total);
          size--;
          pointer++;
        }
        console.log('size after colection'+ size);
        //End of colecction

        return label + ' - ' + Math.round(value / total* 100) + '%';
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
