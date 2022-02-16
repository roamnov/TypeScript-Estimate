import * as React from 'react';
import ReactDOM from 'react-dom';

export default function DocTabs(name, doccfgid, parent, cont) {
    function closeDocTab(even) {
        let content;
        content = document.querySelectorAll('.TabDocContent.TabDocContentActiv')
        content = content[0]
        if (content) {

            let nexttab
            nexttab = even.target.parentNode.nextSibling;
            if (nexttab) {
                nexttab = nexttab.getElementsByTagName("span")
                nexttab[0].click()

            }
            else {
                nexttab = even.target.parentNode.previousSibling;
                if (nexttab.classList.contains("TabDoc")) {
                    nexttab = nexttab.getElementsByTagName("span")
                    nexttab[0].click()
                }
            }
            even.target.parentNode.remove();
            content.remove()
        }
    }
    function ClickDocTab(event) {
        let DocTabs = document.getElementById("DocTabsBtn");
        let Content = document.getElementById("DocTabsContent")
        if (!event.target.parentNode.classList.contains("TabDocActiv"))
            if (DocTabs) {
                DocTabs.querySelectorAll('.TabDocActiv').forEach(n => n.classList.remove('TabDocActiv'));
                Content.querySelectorAll('.TabDocContentActiv').forEach(n => n.classList.remove('TabDocContentActiv'));
                event.target.parentNode.classList.add("TabDocActiv")
                let c = document.getElementById("Doc" + doccfgid + "Content")
                if (c) {
                    c.classList.add("TabDocContentActiv")
                }
            }
    }
    function ScrollTabDocLeft(event) {

    }
    function ScrollTabDocRight(event) {

    }
    function SummWidth(el) {
        let Sum = 0;
        let sumC = 0, sumO = 0;
        for (var i = 0; i < el.childElementCount; i++) {
            
            sumC = sumC + el.children[i].clientWidth;
            sumO = sumO + el.children[i].offsetWidth;
        }
        console.log("sum offsetWidth = " + sumO)
            console.log("sum clientWidth = " + sumC)
        return Sum
    }
    function ResizeBtnTab(event) {
        let divBtn = document.getElementById("DocTabsBtn");
        let btnScrollLeft = document.getElementById("btnScrollTabDocLeft");
        let btnScrollRight = document.getElementById("btnScrollTabDocRight");
      /*  console.log("__________________________________________")
        console.log(divBtn.getBoundingClientRect().width)
        console.log("__________________________________________")*/
        /*if (SummWidth(divBtn) < divBtn.clientWidth) {
            btnScrollLeft.classList.remove("hidden")
            btnScrollRight.classList.remove("hidden")
        }
        else {
            btnScrollLeft.classList.add("hidden")
            btnScrollRight.classList.add("hidden")
        }*/
    }
    function AddTab() {
        let divBtn = document.getElementById("DocTabsBtn")
        let content = document.getElementById("DocTabsContent")
        let tabContent;
        if (!divBtn) {
            divBtn = document.createElement("div");
            divBtn.id = "DocTabsBtn";
            window.addEventListener("resize", ResizeBtnTab)
            //кнопка прокрутки закладок влево
            let btnScrollLeft;
            btnScrollLeft = document.createElement("div");
            btnScrollLeft.id = "btnScrollTabDocLeft"
            btnScrollLeft.classList.add("btnScrollTabDocLeft")
            btnScrollLeft.addEventListener("click", ScrollTabDocLeft)
            divBtn.appendChild(btnScrollLeft)
            //кнопка прокрутки закладок вправо
            let btnScrollRight;
            btnScrollRight = document.createElement("div");
            btnScrollRight.id = "btnScrollTabDocRight"
            btnScrollRight.classList.add("btnScrollTabDocRight")
            btnScrollRight.addEventListener("click", ScrollTabDocRight)
            divBtn.appendChild(btnScrollRight)
            DocTabs.appendChild(divBtn)

        }

        if (!content) {
            content = document.createElement("div");
            content.id = "DocTabsContent";
            DocTabs.appendChild(content)
        }
        let tabButton = document.getElementById("TabDoc" + doccfgid)
        if (!tabButton) {
            divBtn.querySelectorAll('.TabDocActiv').forEach(n => n.classList.remove('TabDocActiv'))
            content.querySelectorAll('.TabDocContentActiv').forEach(n => n.classList.remove('TabDocContentActiv'))


            //закладка
            tabButton = document.createElement("div");
            tabButton.id = "TabDoc" + doccfgid
            tabButton.classList.add("TabDoc")
            tabButton.classList.add("TabDocActiv")
            let span = document.createElement("span");
            span.innerText = name;
            span.addEventListener('click', ClickDocTab)
            let btnClose = document.createElement("div")
            btnClose.classList.add("btnCloseTab")
            btnClose.addEventListener("click", closeDocTab)
            tabButton.appendChild(span);
            tabButton.appendChild(btnClose);
            divBtn.appendChild(tabButton)

            // контекст закладки
            tabContent = document.createElement("div");
            tabContent.id = "Doc" + doccfgid + "Content"
            tabContent.classList.add("TabDocContent")
            tabContent.classList.add("TabDocContentActiv")
            content.appendChild(tabContent)
            let type = cont.tagName;
            if (!type)
                ReactDOM.render(cont, tabContent)
            else
                tabContent.appendChild(cont)
        }
        else {
            tabButton.classList.add("TabDocActiv")
            tabContent = document.getElementById("Doc" + doccfgid + "Content")
            tabContent.classList.add("TabDocContentActiv")
        }
     

    }
    var docTabs = document.getElementById("DocTabs")

    if (docTabs) {
        docTabs.querySelectorAll('.TabDocContent').forEach(n => n.classList.remove('TabDocContentActiv'));
        AddTab()
    }
    else {
        var DocTabs = document.createElement("div");
        DocTabs.id = "DocTabs";
        AddTab();
        // DocTabs.appendChild(tab)
        parent.appendChild(DocTabs)

    }

}