import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
    return(
        <div>
            <h1>Info </h1>
            <p>The info is: {props.info} </p>
        </div>
    )
}

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is calssified information, please do not share!</p>}
            <WrappedComponent {...props} />
        </div>
    )
}
const AdminInfo = withAdminWarning(Info);

ReactDOM.render(<AdminInfo isAdmin={false} info='This is premier league' />, document.getElementById('app'))