;
function boxData(props) {
    var regex = /\n/g;
    return {
        author: props.author.replace(regex, "").trim(),
        date: props.date,
        title: props.title.replace(regex, "").trim(),
        link: props.link,
    };
}
function wrapBox(box) {
    return function () {
        return boxData.apply(this, arguments);
    };
}
var exportBox = wrapBox(boxData);
module.exports = exportBox;
