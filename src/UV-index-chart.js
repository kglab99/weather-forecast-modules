import ProgressBar from "progressbar.js/dist/progressbar"
import {forecast} from './fetch'


function createUV(i) {
        console.log();
        var bar = new ProgressBar.SemiCircle(UV, {
        strokeWidth: 4,
        color: '#000',
        trailColor: '#eee',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 500,
        svgStyle: null,
        text: {
          value: '',
          alignToBottom: false
        },
        from: {color: '#fb8500'},
        to: {color: '#fb8500'},
        // Set default step function for all animate calls
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
          var value = Math.round(bar.value() * 11);
          if (value === 0) {
            bar.setText('');
          } else {
            bar.setText(value);
          }
      
          bar.text.style.color = state.color;
        }
      });
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '2rem';
      
      bar.animate(forecast.forecast.forecastday[i].day.uv/1.1/10);
}



  export {
    createUV
  }