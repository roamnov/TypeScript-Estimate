import SectionToolsJS from '../Tools/SectionToolsJS';
import Split from 'react-split'

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
export default function SectionsDocuments(props)
{
    return <>
    <SectionToolsJS  ID={props.id} />
    <div className='tabs activetabs' style={{ height:"83%", marginLeft:"5px"}}>
      <label id={"tab1_" + props.id} title="Документы" onClick={(event) => clickTab(event)} className='tablbl activetab'>Документы</label>
      <label id={"tab2_" + props.id} title="Отчеты" className='tablbl' onClick={(event) => clickTab(event)}>Отчеты</label>
      <section id={"content_tab1_" + props.id} >
      <Split className="wrap" sizes={[20, 20, 60]}>
        <div style={{height:"100%"}}>
           Дерево Документов 
        </div>
        <div style={{height:"100%"}}>
            Параметры
        </div>
        
        <div style={{height:"100%"}}>
           Грид 
        </div>
        </Split>
      </section>
      <section id={"content_tab2_" + props.id} className='contentactive'>
                
      </section>  
    </div>
    </>
}