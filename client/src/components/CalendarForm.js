import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import moment from 'moment';

class CalendarForm extends Component {
  state = {
    dateInfo:"",
    date:"",
    dateDesc: "",
    id: this.props.id,
  };

  componentDidMount() {
    this.loadCards();
    this.loadDesc();
  }

  loadCards = () => {
    axios.get('/api/newjob/' + this.props.id).then(res=>{
      if(res.data.dateInfo[0] === undefined){
      this.setState({date: "choose a date for your interview"})}else{
        this.setState({date: res.data.dateInfo[0].date})
      }
    });
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))

  };

  loadDesc = () => {
    axios.get('/api/newjob/' + this.props.id).then(res=> {
      if(res.data.dateInfo[0] === undefined){
      this.setState({dateDesc: ""})}else{
        this.setState({dateDesc:res.data.dateInfo[0].dateDesc})
      }
    });
};

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleChangeDate = (value) => {
    console.log(value)
    console.log(moment(value).format('YYYY-MM-DD'))
    this.setState({
      date: moment(value).format('YYYY-MM-DD')
    });
  }

  UpdateInfo = id => {
//     this.setState({
//   dateInfo: [this.state.date , this.state.dateDesc]
// });
    axios.patch('/api/newjob/' + id, {
      // date: this.state.date,
      // dateDesc: this.state.dateDesc,
      dateInfo: {date: this.state.date, dateDesc: this.state.dateDesc}
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
  }
  render(){
    return(
      <div>
        <form>
          <div className="form-group">
            <DatePicker
              hintText={this.state.date}
              name="date"
              onChange={(event, x) => {this.handleChangeDate(x);}}
             />
            <TextField
              id="text-field-controlled"
              name="dateDesc"
              hintText="write a description and time of your interview"
              value={this.state.dateDesc}
              onChange={this.handleChange}
              fullWidth={true}
              multiLine={true}
            />
            <FlatButton
              label="Save"
              onClick={() => this.UpdateInfo(this.state.id)}
              secondary={true}
              style={{
                float: 'right'
              }}
            />
          </div>
        </form>
      </div>

    )
  }
}

export default CalendarForm;
