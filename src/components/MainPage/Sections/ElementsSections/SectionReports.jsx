import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';
import SectionToolsJS from '../../Tools/SectionToolsJS';
import Tree from '../../Windows/ViewData/Tree/tree';
import Params from './Params'
export default function SectionReports(props) {
    return  <>
    {props.SectionToolsJS ? <SectionToolsJS ID={props.id} />: <></>}
    {props.defaultButton}
    <Splitter style={{ height: "100%", width: "100%" }} id = {"ParamsFor_"+props.id}>
        <SplitterItem size="20%" collapsible id={"item_tree_params_reports_" + props.id} >
            <Splitter style={{ width: "100%" }} orientation="horizontal">
                <SplitterItem size="30%" collapsible id={"item_tree_reports_" + props.id} style={{overflow: "hidden"}}>
                    
                    <Tree CLSID={props.CLSID} multiCheck={false} SectionID = {props.id} Module = {"Reports_"+ props.id}/> 
                    
                </SplitterItem>
                <SplitterItem size="70%" collapsible id={"item_params_reports" + props.id} style={{ height: "100%" }}>
                
                </SplitterItem>
            </Splitter>
        </SplitterItem>
        <SplitterItem size="80%" collapsible id={"item_print_reports" + props.id} >
            <div id="print_reports">Печатный вид отчета</div>
        </SplitterItem>
    </Splitter>
    </>
}