import React from 'react';

const AddJobFrom = props => (
  <form>
    <div className="form-group">
      <h4>
        <strong>Add Company Name</strong>
      </h4>
      <input
        className="form-control"
        type="text"
        value={props.companyName}
        name="companyName"
        onChange={props.handleInputChange}
        required
      />
      <h4>
        <strong>Add Job Title</strong>
      </h4>
      <input
        className="form-control"
        type="text"
        value={props.jobTitle}
        name="jobTitle"
        onChange={props.handleInputChange}
        required
      />
      </div>

  </form>
);

export default AddJobFrom;

