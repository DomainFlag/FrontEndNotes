function spaceTab(depth, tabSize = 4) {
    let str = "";
    let count = depth*tabSize;
    while(count >= 0) {
        str += " ";
        count--;
    }

    return str;
}

//Needs improvement
let objToStr = (obj, depth = 1) => {
    if(!obj)
        return "";

    return ((obj, depth) => {
        let tag = {};
        if (obj instanceof Array) {
            tag.openingTag = "[";
            tag.closingTag = "]";
        } else if(obj instanceof Function) {
            return obj.toString();
        } else {
            tag.openingTag = "{";
            tag.closingTag = "}";
        }

        let str = tag.openingTag;
        str += "\n";

        let properties = Object.keys(obj);

        for (let g = 0; g < properties.length; g++) {
            let key = properties[g];
            str += spaceTab(depth);

            if (!(obj instanceof Array))
                str += key + " : ";

            if (obj[key] instanceof Function) {
                str += obj[key].toString();
            } else if (typeof obj[key] === "string" || obj[key] instanceof String) {
                str += "\"" + obj[key].toString() + "\"";
            } else if (obj[key] instanceof Object) {
                str += objToStr(obj[key], depth + 1);
            } else {
                str += obj[key];
            }

            if (g < properties.length - 1)
                str += ",";

            str += "\n";
        }

        str += spaceTab(depth - 1) + tag.closingTag;

        return str;
    })(obj, depth);
};

export default objToStr;