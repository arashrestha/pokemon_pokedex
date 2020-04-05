import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


class Spinner extends React.Component {

    render() {
        return (
            <div className='image-loader'>
                <CircularProgress size={80} thickness={2} style={{ color: '#ef5350' }} />
            </div>
        );
    }
}
export default Spinner