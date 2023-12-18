
function xml2json(srcDOM) {
    let children = [...srcDOM.children];
    
    // base case for recursion. 
    if (!children.length) {
        return srcDOM.innerHTML
    }
    
    // initializing object to be returned. 
    let jsonResult = {};
    
    for (let child of children) {
        
        // checking is child has siblings of same name. 
        let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

        // if child is array, save the values as array, else as strings. 
        if (childIsArray) {
        if (jsonResult[child.nodeName] === undefined) {
            jsonResult[child.nodeName] = [xml2json(child)];
        } else {
            jsonResult[child.nodeName].push(xml2json(child));
        }
        } else {
            jsonResult[child.nodeName] = xml2json(child);
        }
    }
    
    return jsonResult;
}

const isDarkTheme = () => {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return true
    }

    return false
}

const delaySkeleton = async (promise, time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time !== undefined ? time : 1000);
    }).then(() => promise);
}

export {
    xml2json, isDarkTheme, delaySkeleton
}