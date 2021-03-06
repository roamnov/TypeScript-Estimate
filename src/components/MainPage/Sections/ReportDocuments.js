import SectionToolsJS from '../Tools/SectionToolsJS';
import { Tabs, TabItem } from 'smart-webcomponents-react/tabs';
import SectionDocuments from './ElementsSections/SectionDocuments';
import SectionReports from './ElementsSections/SectionReports';
export default function SectionsReportDocuments(props) {

  return <div style={{ height: "100%" }}>
    <SectionToolsJS ID={props.id} />
    <Tabs class="Tabs" selectedIndex={0} style={{ height: "calc(100% - 37px)", width: "100%" }} >
      <TabItem style={{textTransform:"none"}} label="Документы">
        <SectionDocuments id={props.id} />
      </TabItem>
      <TabItem style={{textTransform:"none"}} label="Отчеты">
        <SectionReports id={props.id} CLSID = {props.CLSID} defaultButton = {props.defaultButton}/>
      </TabItem>
    </Tabs>

  </div>
}