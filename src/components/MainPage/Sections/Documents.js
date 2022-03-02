import SectionToolsJS from '../Tools/SectionToolsJS';
import Split from 'react-split'
import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';
import { Tabs, TabItem, TabItemsGroup } from 'smart-webcomponents-react/tabs';
function clickTab(event) {
  let lbl = event.currentTarget;
  if (!lbl)
    lbl = event;
  let id = lbl.id.split("_")[1];
  let lbl2, contentTab1, contentTab2;
  contentTab1 = document.getElementById("content_tab1_" + id);
  contentTab2 = document.getElementById("content_tab2_" + id);
  if (lbl.id.split("_")[0] === "tab1") {
    lbl2 = document.getElementById("tab2_" + id);
    lbl.classList.add("activetab");
    contentTab1.classList.add("contentactive")
    lbl2.classList.remove("activetab");
    contentTab2.classList.remove("contentactive")
  }
  if (lbl.id.split("_")[0] === "tab2") {
    lbl2 = document.getElementById("tab1_" + id);
    lbl.classList.add("activetab");
    contentTab2.classList.add("contentactive")
    lbl2.classList.remove("activetab");
    contentTab1.classList.remove("contentactive")
  }
}
export default function SectionsDocuments(props) {
  return <div style={{height:"100%"}}>
    <SectionToolsJS ID={props.id} />
    <Tabs class="Tabs" selectedIndex={0} style={{ height: "calc(100% - 37px)", width: "100%" }} >
      <TabItem label="Документы">
        <Splitter style={{  height: "100%",width: "100%" }}>
          <SplitterItem size="15%" collapsible id="item_Doc">
            <div style={{ height: "100%" }}>
              Дерево Документов
            </div>
          </SplitterItem>
          <SplitterItem size="20%" collapsible id="item_Param">
            <div style={{ height: "100%" }}>
              Параметры
            </div>
          </SplitterItem>
          <SplitterItem size="65%" id="item_Data">
            <div style={{ height: "100%",width: "100%" }}>
              Грид
            </div>
          </SplitterItem>
        </Splitter>
      </TabItem>
      <TabItem label="Отчеты">
        <Splitter style={{  height: "100%", width: "100%" }}>
          <SplitterItem size="40%" collapsible id="item_tree_params_reports" >
            <Splitter style={{ width: "100%" }} orientation="horizontal">
              <SplitterItem size="30%" collapsible id="item_tree_reports" >
                <div id="tree_reports">Дерево отчетов</div>
              </SplitterItem>
              <SplitterItem size="70%" collapsible id="item_params_reports" >
                <div id="params_reports">Параметры отчета</div>
              </SplitterItem>
            </Splitter>
          </SplitterItem>
          <SplitterItem size="60%" collapsible id="item_print_reports" >
            <div id="print_reports">Печатный вид отчета</div>
          </SplitterItem>
        </Splitter>
      </TabItem>
    </Tabs>
    
  </div>
}