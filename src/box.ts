interface BoxProps {
    author: string,
    date: string,
    title: string,
    link: string,
};

function boxData(props: BoxProps){
    const regex : any = /\n/g;
    return {
        author: props.author.replace(regex, "").trim(),
        date: props.date,
        title: props.title.replace(regex, "").trim(),
        link: props.link,
    };
}

function wrapBox(box: any){
    return function(){
        return boxData.apply(this, arguments);
    }
}

const exportBox = wrapBox(boxData);

module.exports = exportBox;