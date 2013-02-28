/*
 * 获取由Markdown生成的HTML文件的目录结构（Object结构）
 * 目录结构：
 * <h1>h1</h1>
 * <h2>h2</h2>
 * <h3>h3</h3>
 * <h3>h33</h3>
 * <h4>h4</h4>
 * <h6>h6</h6>
 * <h5>h5</h5>
 * <h6>h66</h6>
 * <h4>h44</h4>
 * <h3>h333</h3>
 * <h4>h444</h4>
 * <h5>h55</h5>
 * <h2>h22</h2>
 * <h4>h444</h4>
 * <h3>h3333</h3>
 * <h5>h555</h5>
 * 输出实例：
 * [
 *  {title:"h1",tag:"1",node:undefined,children:[
 *   {title:"h2",tag:"2",node:undefined,children:[
 *    {title:"h3",tag:"3",node:undefined,children:[]},
 *    {title:"h33",tag:"3",node:undefined,children:[
 *     {title:"h4",tag:"4",node:undefined,children:[
 *      {title:"h6",tag:"6",node:undefined,children:[]},
 *      {title:"h5",tag:"5",node:undefined,children:[
 *       {title:"h66",tag:"6",node:undefined,children:[]}
 *      ]}
 *     ]},
 *     {title:"h44",tag:"4",node:undefined,children:[]}
 *    ]},
 *    {title:"h333",tag:"3",node:undefined,children:[
 *     {title:"h444",tag:"4",node:undefined,children:[
 *      {title:"h55",tag:"5",node:undefined,children:[]}
 *     ]}
 *    ]}
 *   ]},
 *   {title:"h22",tag:"2",node:undefined,children:[
 *    {title:"h444",tag:"4",node:undefined,children:[]},
 *    {title:"h3333",tag:"3",node:undefined,children:[
 *     {title:"h555",tag:"5",node:undefined,children:[]}
 *    ]}
 *   ]}
 *  ]}
 * ]
 */
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