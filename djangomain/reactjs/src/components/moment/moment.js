import moment from 'moment';

const momentFunction = (date) => {
    return moment(date).format('D MMMM YYYY');
};

export default momentFunction;
