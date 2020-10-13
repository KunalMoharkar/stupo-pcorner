import React from 'react';
import ReactDOM from 'react-dom';
import Loginform from './Loginform'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap-select/js/bootstrap-select.js'
<script type="text/javascript">
    $('.selectpicker').selectpicker({
      });
</script>
class App extends React.Component{
  constructor(props) {
    super(props)
  }



  render(){

    return(

      <Loginform />

    )

  }

}


export default App;
