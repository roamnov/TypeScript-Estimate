//elem("pluginImage").src="images/warning.png";
function TestPlug(){
    const VERSIONS_JSON_URL = 'http://stimate.krista.ru/workspaceex/config.json';
    const WORKSPACE_REQUEST_TYPE = "workspace-request";
    const WORKSPACE_RESPONSE_TYPE = "workspace-response";
    const IMG_OK = "images/ok.png";
    const IMG_WARNING = "images/warning.png";
    const IMG_ERROR = "images/error.png";

    var CmsDettachedUID;
    var CheckedCryptoUID;
    var VersionUID;
    var PluginVerUID;
    var CertUID;
    var CertUIDAsXML;
    var scanUid;
    var mySerialNumber;

    var workspaceConfig = null;

    include("certSelectionDialog.js");

    function include(url) {
        var script = document.createElement('script');
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function elem(name) {
    return document.getElementById(name);
    }

    navigator.sayswho = (function(){
        var ua= navigator.userAgent, tem, 
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();

    function isChrome() {
        return navigator.userAgent.match(/Chrome/i) && !isOpera();
    }

    function isFirefox() {
        return navigator.userAgent.match(/Firefox/i);
    }

    function isOpera() {
        return navigator.userAgent.match(/OPR/i) || navigator.userAgent.match(/Opera/i);
    }

    function CopyToClipboard() {
        var copyText = document.getElementById("resultCMS");
        if ((copyText.value == "") || (mySerialNumber == "")) {
            alert("Подпись не сформирована");
        } else {
            copyText.select();
            document.execCommand("copy");
        }
    }

    function isLinux() {
        return navigator.userAgent.match(/Linux/i);
    }

    function isWindows() {
        return navigator.userAgent.match(/Windows/i);
    }

    function getExtensionStoreLink() {
        if (workspaceConfig == null) return "";
        if (isChrome()) {
            return workspaceConfig.chrome.storeLink;
        } else if (isFirefox()) {
            return workspaceConfig.firefox.storeLink;
        } else if (isOpera()) {
            return workspaceConfig.opera.storeLink;
        } else return "";
    }

    function getExtensionOfflineLink() {
        if (workspaceConfig == null) return "";
        if (isChrome()) {
            return workspaceConfig.chrome.offlineLink;
        } else if (isFirefox()) {
            return workspaceConfig.firefox.offlineLink;
        } else if (isOpera()) {
            return workspaceConfig.opera.offlineLink;
        } else return "";
    }

    function getActualExtensionVersion() {
        if (workspaceConfig == null) return 0;
        if (isChrome()) {
            return workspaceConfig.chrome.version;
        } else if (isFirefox()) {
            return workspaceConfig.firefox.version;
        } else if (isOpera()) {
            return workspaceConfig.opera.version;
        } else return 0;
    }

    function updateExtensionLinks() {
        if (elem("browserLink") != null) {
            elem("browserLink").href = getExtensionStoreLink();
        }
        if (elem("browserLocalLink") != null) {
            elem("browserLocalLink").href = getExtensionOfflineLink();
        }
        if (isFirefox() && elem("appStoreBlock") != null) {
            elem("appStoreBlock").style.display = 'none';
        }
    }

    function getHostAppLink() {
        if (workspaceConfig == null) return "";
        if (isWindows()) {
            return workspaceConfig.hostApp.windowsLink;
        } else if (isLinux()) {
            return workspaceConfig.hostApp.linuxLink;
        } else return "";
    }

    function markExtensionNotInstalled() {
        updateExtensionLinks();
        elem("pluginImage").src = IMG_ERROR;
        elem("pluginBlock").style.display = 'block';
    }

    function markExtensionIsOutOfDate(currentVersion, actualVersion) {
        var htmlText = '';
        if (actualVersion == 0) {
            htmlText = 'Плагин установлен, версия ' + currentVersion + '. Не удалось получить информацию об обновлениях!';
        } else {
            htmlText = 'Плагин установлен, версия ' + currentVersion + '. Доступна версия ' + actualVersion + 
                '. Необходимо обновить <span id="appStoreBlock"> из <a id="browserLink" target="_blank" href="">магазина приложений</a>' +
                ' или </span><a id="browserLocalLink" target="_blank" href="">офлайн</a>';
        }
        elem("pluginID").innerHTML = htmlText;
        elem("pluginID").style.color = "orange";
        elem("pluginImage").src = IMG_WARNING;
        updateExtensionLinks();
        elem("pluginBlock").style.display = 'block';
    }

    function markExtensionIsRelevant(version) {
        elem("pluginID").innerHTML = "Плагин установлен, версия " + version;
        elem("pluginID").style.color = "green";
        elem("pluginImage").src = IMG_OK;
        elem("pluginBlock").style.display = 'block';
    }

    function isWorkspaceCryptoExtensionInstalled() {
        return elem("WorkspaceCrypto") != null && elem("WorkspaceCrypto").getAttribute("extension-is-installed") == "true";
    }

    function isExtensionInstalled() {
        return elem("WorkspaceEx") != null && elem("WorkspaceEx").getAttribute("is-installed") == "true";
    }

    function isExtensionWithNewApi() {
        return elem("WorkspaceEx") != null && elem("WorkspaceEx").getAttribute("is-new-api") == "true";
    }

    function showWarning() {
        elem("warning").style.display = 'block';
    }

    function markHostAppUninstalled() {
        var innerHtmlText = '';
        if (isLinux()) {
            innerHtmlText = 'Хост-приложение не установлено. Скачать для <a target="_blank" href="' + getHostAppLink() + '">Linux</a>';
        } else if (isWindows()) {
            innerHtmlText = 'Хост-приложение не установлено. Скачать для <a target="_blank" href="' + getHostAppLink() + '">Windows</a>';
        } else {
            innerHtmlText = 'Хост-приложение не установлено. Ваша ОС не поддерживается.</a>';
        }
        elem("hostAppImage").src = IMG_ERROR;
        elem("hostID").innerHTML = innerHtmlText;
        elem("hostAppBlock").style.display = 'block';
    }

    function markHostAppObsolete(currentVersion, actualVersion) {
        var innerHtmlText = '';
        if (actualVersion == 0) {
            innerHtmlText = 'Хост-приложение установлено, версия ' + currentVersion + '. Не удалось получить информацию об обновлениях!';
        } else {
            innerHtmlText = 'Хост-приложение установлено, версия ' + currentVersion + '. Доступна версия ' + actualVersion + '.';
            if (workspaceConfig != null) {
                if (isLinux()) {
                    innerHtmlText += ' Скачать для <a target="_blank" href="' + workspaceConfig.hostApp.linuxLink + '">Linux</a>';
                } else if (isWindows()) {
                    innerHtmlText += ' Скачать для <a target="_blank" href="' + workspaceConfig.hostApp.windowsLink + '">Windows</a>';
                }
            }
        }
        elem("hostAppImage").src = IMG_WARNING;
        elem("hostID").innerHTML = innerHtmlText;
        elem("hostID").style.color = "orange";
        elem("hostAppBlock").style.display = 'block';
    }

    function markHostAppRelevant(version) {
        var innerHtmlText = 'Хост-приложение установлено, версия ' + version;
        elem("hostAppImage").src = IMG_OK;
        elem("hostID").innerHTML = innerHtmlText;
        elem("hostID").style.color = "green";
        elem("hostAppBlock").style.display = 'block';
    }

    function getWorkspaceCryptoExtensionRemoveSteps() {
        var steps = "";
        if (isChrome()) {
            steps = "<li>в контекстном меню расширения выбрать пункт \"Удалить из Chrome\";</li>"; 
            steps += "<li>в всплывающем окне \"Удалить \"WorkspaceCrypto?\"\" нажать кнопку \"Удалить\".</li>"; 
        } else if (isFirefox()) {
            steps = "<li>в контекстном меню расширения выбрать пункт \"Удалить расширение\";</li>"; 
            steps += "<li>в всплывающем окне \"Удалить \"WorkspaceCrypto\" из Firefox?\" нажать кнопку \"Удалить\".</li>"; 
        } else if (isOpera()) {
            steps = "<li>в контекстном меню расширения выбрать пункт \"Управление расширением...\";</li>"; 
            steps += "<li>в открывшейся странице расширения выбрать пункт \"Удалить расширение\";</li>"; 
            steps += "<li>в всплывающем окне \"Удалить \"WorkspaceCrypto?\"\" нажать кнопку \"Удалить\".</li>"; 
        } 
        return steps;
    }

    function showWorkspaceCryptoExtensionInstalledWarning() {
        var innerHtmlText = "<div style='text-align: center;'>Расширение WorkspaceEx больше не поддерживается!!!<br>" + 
            "Необходимо удалить хост-приложение WorkspaceHostApp и расширение WorkspaceEx.</div>";
        if (isWindows()) {
            innerHtmlText += "<br>" +
                "Удаление хост-приложения:" + 
                "<ul>" + 
                "<li>в меню \"Пуск\" выбрать \"Деинсталлировать WorkspaceHostApp\"</li>" +
                "<li>или запутить средство удаления программ и удалить приложение \"WorkspaceHostApp\".</li>" +
                "</ul>" +
                "Удаление расширения:" + 
                "<ul>" + 
                getWorkspaceCryptoExtensionRemoveSteps() +
                "</ul>";
        } else if (isLinux()) {
            innerHtmlText += "" +
                "Удаление хост-приложения:" + 
                "<ul>" + 
                "<li>скачать <a target='_blank' href='http://stimate.krista.ru/WorkspaceEx/install.sh'><code>install.sh</code></a>;</li>" +
                "<li>файлу <code>install.sh</code> дать права на выполнение;</li>" +
                "<li>запустить <code>install.sh -u</code>;</li>" +
                "<li>удалить файл <code>install.sh</code>.</li>" +
                "</ul>" +
                "Удаление расширения:" + 
                "<ul>" + 
                getWorkspaceCryptoExtensionRemoveSteps() +
                "</ul>";
        }
        elem("warningWorkspaceCrypto").innerHTML = innerHtmlText;
        elem("warningWorkspaceCrypto").style.display = 'block';
        elem("warning").style.display = 'block';
    }

    function doCheckExtension() {
        var browserText = 'Данный браузер не поддерживает работу плагина. Для корректной работы Вам необходимо использовать браузеры: ' +
        '<a target="_blank" href="https://www.google.com/chrome/">Chrome</a>, ' +
        '<a target="_blank" href="https://www.opera.com/ru">Opera</a>, ' +
        '<a target="_blank" href="https://www.mozilla.org/ru/firefox/">Firefox</a>';
        if (isChrome() || isFirefox() || isOpera()) {
            browserText = navigator.sayswho;
        }

        elem("wait").style.display = 'none';

        elem("opersysID").innerHTML = navigator.platform;
        elem("menuOS").style.display = 'block';
        
        elem("browserID").innerHTML = browserText;
        elem("menuBrowser").style.display = 'block';
        
        if (isWorkspaceCryptoExtensionInstalled()) {
            showWorkspaceCryptoExtensionInstalledWarning();
            return;
        } 
        
        if (!isExtensionInstalled()) {
            markExtensionNotInstalled();
            showWarning();
        } else if (!isExtensionWithNewApi()) {
            markExtensionNotInstalled();
            showWarning();
        } else {
            onPluginVersionClick();
        }
            
    }

    function fromScanerButtonClick() {
        mask("Пожалуйста, подождите...");
        executeScaning();
    }

    document.addEventListener('DOMContentLoaded', function () {
        //обработчик нажатия кнопки "Выполнить"
        // elem("executeCommandBtn").addEventListener("click", function () {
        //     elem("resultCMS").value = "";
        //     if (mySerialNumber != "") {
        //     onExecuteSignCmsDettached(mySerialNumber);
        //     } else {
        //         alert("Необходимо выбрать сертификат");
        //     }
        // }, false);
        
        // elem("fromScanerButton").addEventListener("click", fromScanerButtonClick);

            // Получение конфигурации и старт проверки расширения
        setTimeout(() => {
            mySerialNumber = "";

            fetch(VERSIONS_JSON_URL, {
                headers : { 
                    //'Content-Type': 'application/json',
                    //'Accept': 'application/json'
                },
                cache: "no-store"})
            .then(response => { return response.json(); })
            .then(data => {
                workspaceConfig = data;
                //console.log(workspaceConfig);
                doCheckExtension();
            })
            .catch(error => {
            console.log("Error reading data from versions.json: " + error);
            doCheckExtension();
            });
            
        }, 1000);
    });

    window.addEventListener("message", (messageEvent) => {
        if (WORKSPACE_RESPONSE_TYPE == messageEvent.data.type) {
            var response = messageEvent.data;
            switch (response.requestId) {
                case PluginVerUID:
                    var actualExtensionVersion = getActualExtensionVersion();
                    if (actualExtensionVersion == 0 || parseFloat(response.result) < actualExtensionVersion) {
                        markExtensionIsOutOfDate(response.result, actualExtensionVersion);
                        showWarning();
                    } else {
                        markExtensionIsRelevant(response.result);
                    }
                    onVersionClick();
                    break;
                case VersionUID:
                    if (response.result != null) {
                        if (workspaceConfig == null || parseFloat(response.result) < workspaceConfig.hostApp.version) {
                            markHostAppObsolete(response.result, workspaceConfig == null ? 0 : workspaceConfig.hostApp.version);
                            showWarning();
                        } else {
                            markHostAppRelevant(response.result);
                        }
                        elem("tabs").style.display = 'block';
                        onCheckedCryptoProvider();
                    } else {
                        markHostAppUninstalled();
                        showWarning();
                    }
                    break;
                case CheckedCryptoUID:
                    elem("cryptoImage").src = IMG_OK;
                    if (response.result.indexOf("ошибка при получении криптопровайдера") == -1) {
                        elem("cryptoID").innerHTML = "Криптопровайдер установлен.";
                        elem("cryptoID").style.color = "green";
                        elem("cryptoImage").src = IMG_OK;
                        executeCertListAsXML();
                    } else {
                        showWarning();
                    }
                    elem("cryptoBlock").style.display = 'block';
                    break;    
                case CertUIDAsXML:
                        // elem("certBlock").style.display = 'block';
                        // if (response.successful == false) {
                        //     elem("certID").innerHTML = "Ошибка получения списка пользовательских сертификатов: " + response.result;
                        //     elem("certID").style.color = "red";
                        //     elem("certImage").src = IMG_ERROR;
                        //     showWarning();
                        // } else {
                        //     elem("certID").innerHTML = "Список личных сертификатов:";
                        //     elem("certID").style.color = "green";
                        //     elem("certImage").src = IMG_OK;
                        //     elem("menuCMS").style.display = 'block';
                        //     elem("certForm").style.display = 'block';
                        // }
                        // createCertsList(response.result);
                        console.log(response.result)
                    
                    break;
                case CmsDettachedUID:
                    elem("resultCMS").value = elem("resultCMS").value + "Серийный номер сертификата: " + mySerialNumber + "\n";
                    elem("resultCMS").value = elem("resultCMS").value + "Данные по-умолчанию:" + " SGVsbG8sIHdvcmxkIQ== " + "\n";
                    elem("resultCMS").value = elem("resultCMS").value + "Подпись в формате Cms: " + response.result + "\n";
                    break;
                case scanUid:
                    unmask();
                    if (response.successful == false) {
                        elem("scanImageId").src = "";
                        alert("Ошибка: " + response.result);
                    } else {
                        elem("scanImageId").src = "data:image/jpg;base64, " + response.result;
                    }
                    break;
            };

        }
    }, false);


    function onVersionClick() {
        VersionUID = uuid();
        sendRequest({
            type: WORKSPACE_REQUEST_TYPE,
            requestId: VersionUID, 
            params: {
                command: "version"
            }
        });
    }

    function onPluginVersionClick() {
        PluginVerUID = uuid();
        sendRequest({
            type: WORKSPACE_REQUEST_TYPE,
            requestId: PluginVerUID, 
            params: {
                command: "pluginVersion"
            }
        });
    }

    function onExecuteSignCmsDettached(mySerialNumber) {
        CmsDettachedUID = uuid();
        sendRequest({
            type: WORKSPACE_REQUEST_TYPE,
            requestId: CmsDettachedUID, 
            params: {
                command: "sign",
                format: "CMS",
                type: "detached",
                serialNumber: mySerialNumber,
                data: "SGVsbG8sIHdvcmxkIQ=="
            }
        });
    }

    function onCheckedCryptoProvider() {
        CheckedCryptoUID = uuid();
        sendRequest({
            type: WORKSPACE_REQUEST_TYPE,
            requestId: CheckedCryptoUID, 
            params: {
                command: "sign",
                format: "CMS",
                type: "detached",
                serialNumber: 'mySerialNumber',
                data: "SGVsbG8sIHdvcmxkIQ=="
            }
        });
    }

    function executeCertList() {
        CertUID = uuid();
        sendRequest(
            {
                type: WORKSPACE_REQUEST_TYPE,
                requestId: CertUID, 
                params: {
                    command: "certList"
                }
            });
    }

    function executeCertListAsXML() {
        CertUIDAsXML = uuid();
        sendRequest(
            {
                type: WORKSPACE_REQUEST_TYPE,
                requestId: CertUIDAsXML, 
                params: {
                    command: "certListAsXml"
                }
            });
    }

    function executeScaning() {
        scanUid = uuid();
        sendRequest(
                {
                    type: WORKSPACE_REQUEST_TYPE,
                    requestId: scanUid, 
                    params: {
                        command: "scan",
                        format: "JPG"
                    }
                });
    }

    function sendRequest(request) {
        window.postMessage(request, "*");
    }

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    
}