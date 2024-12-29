import TreeView, { flattenTree } from "react-accessible-treeview";
import { Tooltip} from '@trendmicro/react-tooltip';
import '@trendmicro/react-tooltip/dist/react-tooltip.css';
import { addLinks } from "./utils";

const StudentCoursesTreeView = ({folder,setAttr,setCourse}) =>{
    const data = flattenTree(folder);

    const nodeRenderer = ({ element, getNodeProps, level, handleSelect }) => {
        let isChild = element.parent !== 0
        return <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1),padding:10 }}>
        
              {!isChild &&<Tooltip content={element.name}>
                    <span   style={{ height:200, border:"2px solid rgb(200,215,255)",borderRadius:5,padding:10,paddingLeft:isChild?50:0 ,background:isChild?"white":"rgb(200,230,230)"}} className="name">
                      {element.name.substring(0,100)}
                    
                    </span>
                  </Tooltip>}
                      {isChild &&<span style={{ height:200, border:"2px solid rgb(200,215,255)",borderRadius:5,padding:10,paddingLeft:isChild?50:0 ,background:isChild?"white":"rgb(200,230,230)"}} className="name">
                      {addLinks(element.name,setAttr,setCourse)}    
                    </span>}
              </div>
    }
       


    return <TreeView
    data={data}
    className="basic"
    aria-label="basic example tree"
    nodeRenderer={nodeRenderer}
/>
}

export default StudentCoursesTreeView