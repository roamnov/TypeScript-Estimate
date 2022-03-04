import SectionToolsJS from '../Tools/SectionToolsJS';
import { Tabs, TabItem, TabItemsGroup } from 'smart-webcomponents-react/tabs';
import SectionDocuments from './ElementsSections/SectionDocuments';
import SectionReports from './ElementsSections/SectionReports';
export default function SectionsReportDocuments(props) {

  return <div style={{ height: "100%" }}>
    <SectionToolsJS ID={props.id} />
    <Tabs class="Tabs" selectedIndex={0} style={{ height: "calc(100% - 37px)", width: "100%" }} >
      <TabItem label="Документы">
        <SectionDocuments id={props.id} />
      </TabItem>
      <TabItem label="Отчеты">
        <SectionReports id={props.id}/>
      </TabItem>
    </Tabs>

  </div>
}