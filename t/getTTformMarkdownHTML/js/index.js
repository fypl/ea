//序列化对象
function serialize(obj){
    switch(obj.constructor){
        case Object:{
            var str="{";
            for(var o in obj){str+=o+":"+serialize(obj[o])+",";}
            if(str.substr(str.length-1)==","){str=str.substr(0,str.length-1);}
            return str+"}";
            break;
        }
        case Array:{
            var str="[";
            for(var o in obj){str+=serialize(obj[o])+",";}
            if(str.substr(str.length-1)==","){str=str.substr(0,str.length-1);}
            return str+"]";
            break;
        }
        case Boolean:{
            return "\""+obj.toString()+"\"";
            break;   
        }
        case Date:{
            return "\""+obj.toString()+"\"";  
            break; 
        }
        case Function:{
            break;   
        }
        case Number:{
            return "\""+obj.toString()+"\"";
            break;   
        }
        case String:{
            return "\""+obj.toString()+"\"";
            break;   
        }
    }   
}
function getTT(context){
    context = context ? context : document.body;
    var ele = null, tag = null, oTmp = [], tmp = null, node = null, pop = null, children = context.children ? context.children : context.childNodes;
    for(var i = children.length-1; i > -1; --i){
        ele = children[i];
        tag = ele.tagName ? ele.tagName.toLowerCase() : null;
        if(tag) tag = (tag.length === 2 && tag.charAt(0) === "h") ? parseInt(tag.charAt(1)) : null;
        if(tag && tag > 0 && tag < 7){
            node = {"title": ele.innerHTML, "tag": tag, "node": ele, "children": []};
            if(!tmp) tmp = [node];
            else if(tmp[0].tag === tag) tmp.unshift(node);
            else if(tmp[0].tag < tag){
                oTmp.push(tmp);
                tmp = [node];
            }else{
                node.children = tmp;
                tmp = [node];
                while(pop = oTmp.pop()){
                    if(pop[0].tag === tmp[0].tag) tmp = tmp.concat(pop);
                    else if(pop[0].tag < tmp[0].tag){
                        oTmp.push(pop);break;
                    }else{
                        tmp[0].children = tmp[0].children.concat(pop);
                        continue;
                    }
                }
            }
        }
    }
    return tmp;
}
var re=getTT(document.getElementById("main"));
console.log(serialize(re));
