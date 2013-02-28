/* 
 * 序列化对象
 */
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