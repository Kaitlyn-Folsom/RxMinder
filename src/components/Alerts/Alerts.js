import React from 'react';
import { Alert } from 'react-bootstrap';
import "./Alerts.css"

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <Alert bsStyle="danger" className="Alert">

      <p><strong>Error! </strong>Required Field</p>
    </Alert>
  );
}

function WarningBanner2(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <Alert bsStyle="danger" className="Alert">
      <p><strong>Error! </strong>Password must be longer than 6 characters.</p>
    </Alert>
  );
}

function WarningBanner3(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <Alert bsStyle="danger" className="Alert">
      <p><strong>Error! </strong>Passwords don't match.</p>
    </Alert>
  );
}

function WarningBanner4(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <Alert bsStyle="danger" className="Alert">
      <p><strong>Sorry! </strong>A user already exists with that login.</p>
    </Alert>
  );
}

export {WarningBanner, WarningBanner2, WarningBanner3, WarningBanner4}


