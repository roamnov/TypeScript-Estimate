import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';

export default function SectionReports(props) {
    return <Splitter style={{ height: "100%", width: "100%" }}>
        <SplitterItem size="20%" collapsible id={"item_tree_params_reports_" + props.id} >
            <Splitter style={{ width: "100%" }} orientation="horizontal">
                <SplitterItem size="30%" collapsible id={"item_tree_reports_" + props.id} >
                    <div id="tree_reports">Дерево отчетов</div>
                </SplitterItem>
                <SplitterItem size="70%" collapsible id={"item_params_reports" + props.id} >
                    <div id="params_reports">Параметры отчета</div>
                </SplitterItem>
            </Splitter>
        </SplitterItem>
        <SplitterItem size="80%" collapsible id={"item_print_reports" + props.id} >
            <div id="print_reports">Печатный вид отчета</div>
        </SplitterItem>
    </Splitter>
}