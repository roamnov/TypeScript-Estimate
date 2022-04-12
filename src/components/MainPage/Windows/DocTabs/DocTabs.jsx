import  Box  from '@material-ui/core/Box';
import ReactDOM from 'react-dom';

function AppTabs(id, content) {
    if (id) {
        let WorkPlace = document.getElementById("WorkPlace");
        let Tab = document.getElementById("TabDoc" + id);
        if (!Tab) {

            WorkPlace.querySelectorAll('.TabDoc').forEach(n => {n.classList.remove("TabDocActiv"); n.classList.add('TabDocNoActiv')})
            let NewTabDoc = document.createElement("div");
            NewTabDoc.classList.add("TabDocActiv");
            NewTabDoc.classList.add("TabDoc");
            NewTabDoc.id = "TabDoc" + id

            ReactDOM.render(<Box>{content}</Box>, NewTabDoc);
            if (WorkPlace)
                WorkPlace.appendChild(NewTabDoc)
        }
        else {
            WorkPlace.querySelectorAll('.TabDoc').forEach(n => { n.classList.remove('TabDocActiv'); n.classList.add('TabDocNoActiv') })
            Tab.classList.add("TabDocActiv")
            Tab.classList.remove("TabDocNoActiv")
        }
    }

   
}
export { AppTabs }
