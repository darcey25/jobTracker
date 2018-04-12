import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * A basic vertical non-linear implementation
 */
class Help extends React.Component {

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Create a job
            </StepButton>
            <StepContent>
              <p>
                First you will need to create a job card. This can be done on the Jobs page. This will hold the basic job info. You can move this card to the different stages tabs, ie if you get an interview, simple move the card to the interviewing section.
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Add job details
            </StepButton>
            <StepContent>
              <p>By clicking on the job card that you just built, you can then fill out the details, such as contacts, address and action dates for your prospective job. This info will automatically be loaded to your calendar and map.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Explore
            </StepButton>
            <StepContent>
              <p>
                Now that you have your details added, you can look at your current interviews or apply dates in the calendar or get a geographical overview of all your saved jobs on the maps page.
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default Help;
