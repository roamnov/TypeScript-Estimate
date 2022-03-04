import { Splitter, SplitterItem, SplitterBar } from 'smart-webcomponents-react/splitter';

export default function SectionDocuments(props)
{
  return <Splitter style={{ height: "100%", width: "100%" }} id={"Tree_Doc_" + props.id}>
    <SplitterItem size="20%" collapsible id={"item_Tree_Doc_" + props.id}>
      <div style={{ height: "100%" }} >
        Дерево Документов
      </div>
    </SplitterItem>
    <SplitterItem size="80%" collapsible id={"item_Param_Grid_" + props.id}>
      <Splitter style={{ height: "100%", width: "100%" }}>
        <SplitterItem size="20%" collapsible id={"item_Param_" + props.id}>
          <div style={{ height: "100%" }}>
            Параметры
          </div>
        </SplitterItem>
        <SplitterItem size="80%" id={"item_Grid_" + props.id}>
          <div style={{ height: "100%", width: "100%" }}>
            Грид
          </div>
        </SplitterItem>
      </Splitter>
    </SplitterItem>
  </Splitter>
}