const {top50songs} = require('../schemas')

module.exports = async function(date){
    var data;
    try {
        if(date === 'latest'){
            data = await top50songs.findOne({}, {}, { sort: { 'date' : -1 } });
        } else{
            let startDate = new Date(date);
            let endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            data = await top50songs.find({
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            },'-_id');
            data = data[0];
        }

    } catch (err) {
        console.log(err);
        data = err;
    }
    return data;
}