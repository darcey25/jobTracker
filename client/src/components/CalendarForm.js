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
    axios.get('/api/newjob/' + this.props.id).then(res=>
      this.setState({dateInfo:res.data.dateInfo}))
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))
    console.log(this.state.dateInfo)
  };

  loadDesc = () => {
    axios.get('/api/newjob/' + this.props.id).then(res=>
      this.setState({dateDesc:res.data.dateInfo[1]}))
      // this.setState({info: res.data.info})
    // ).then(this.setState({info: this.state.cardData.info}))
    console.log(this.state.dateInfo)
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleChangeDate = (value) => {
    this.setState({
      date: moment(value).format('YYYY-MM-DD')
    });
  }

  UpdateInfo = id => {
    this.setState({
  dateInfo: [this.state.date , this.state.dateDesc]
});
    axios.patch('/api/newjob/' + id, {
      // date: this.state.date,
      // dateDesc: this.state.dateDesc,
      dateInfo: this.state.dateInfo
    })
    .then(res=> res.json())
    .catch(err=> console.log(err));
  }
  render(){
    let defaultDate = this.state.date
    let newdate ={defaultDate}
    return(
      <div>
        <form>
          <div className="form-group">
            <DatePicker
              hintText="set interview date"
              defaultDate={newdate}
              name="date"
              onChange={(event, x) => {this.handleChangeDate(x);}}
             />
            <TextField
              id="text-field-controlled"
              name="dateDesc"
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
