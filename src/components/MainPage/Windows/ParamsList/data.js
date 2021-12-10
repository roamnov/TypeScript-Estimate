export const dataTree = [
    {
        "Tree": {
            "items": [
                {
                    "id": "101",
                    "text": "Данные",
                    "leaf": false
                },
                {
                    "id": "130",
                    "text": "Запросы",
                    "leaf": false
                },
                {
                    "id": "102",
                    "text": "Конфигурация",
                    "leaf": false
                },
                {
                    "id": "424",
                    "text": "Аудит",
                    "leaf": false
                },
                {
                    "id": "507",
                    "text": "OLAP",
                    "leaf": false
                }
            ]
        }
    }
]



export const dataDoc = [
    {
        "HasStatus": "1",
        "AutoStatus": "1",
        "Sequence": "Акт сдачи-приемки",
        "Name": "Поступление НФА",
        "Filter": "1",
        "Rights": "-1",
        "ImageFields": "Status,DSignStatus,OpravDocs,Attachments,InArchive,WasReversed",
        "Columns": [
            {
                "Title": "Номер",
                "DataType": "1",
                "FieldName": "SNumber",
                "ID": "2230",
                "EditStyle": "8",
                "Options": "66",
                "TitleAjust": "1",
                "TextAjust": "1",
                "Width": "60"
            },
            {
                "Title": "Вид документа",
                "DataType": "23026",
                "Module": "clsbook",
                "FieldName": "BaseDocType",
                "ID": "16210",
                "EditStyle": "17",
                "Options": "2",
                "Width": "100"
            },
            {
                "Title": "Дата",
                "DataType": "6",
                "FieldName": "UsedDate",
                "ID": "2229",
                "EditStyle": "2",
                "Options": "9218",
                "TitleAjust": "1",
                "TextAjust": "1",
                "Width": "70"
            },
            {
                "Title": "Проведено",
                "DataType": "6",
                "FieldName": "AcceptDate",
                "ID": "2237",
                "EditStyle": "2",
                "Options": "9218",
                "TextColor": "16711680",
                "TextAjust": "1",
                "Image": "2",
                "Width": "70"
            },
            {
                "Title": "Учреждение",
                "DataType": "2773",
                "Module": "departments",
                "FieldName": "AccTrans",
                "ID": "2231",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "120"
            },
            {
                "Title": "Расчетный счет",
                "DataType": "2320",
                "Module": "organizations",
                "FieldName": "DestAccount",
                "ID": "9965",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "120"
            },
            {
                "Title": "Раздел БК",
                "DemandParams": "1",
                "DataType": "3057",
                "Module": "documents",
                "FieldName": "Attr05",
                "ID": "2236",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "120",
                "OnEdit": "2047"
            },
            {
                "Title": "Дебет",
                "DemandParams": "1",
                "DataType": "3057",
                "Module": "documents",
                "FieldName": "D_Classifiers",
                "ID": "17388",
                "Deep": "1",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "90",
                "OnEdit": "2047"
            },
            {
                "Title": "Кредит",
                "DemandParams": "1",
                "DataType": "3057",
                "Module": "documents",
                "FieldName": "C_Classifiers",
                "ID": "17389",
                "Deep": "1",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "90",
                "OnEdit": "2047"
            },
            {
                "Title": "Источник",
                "DataType": "2463",
                "Module": "clsbook",
                "FieldName": "FinSource",
                "ID": "2283",
                "EditStyle": "17",
                "Options": "9218",
                "TitleAjust": "1",
                "Width": "60"
            },
            {
                "Title": "Операция",
                "DataType": "2117",
                "Module": "acctools",
                "FieldName": "Операция",
                "ID": "2232",
                "EditStyle": "17",
                "Width": "160",
                "OnEdit": "595",
                "OnList": "598"
            },
            {
                "Title": "Дебет",
                "DataType": "2172",
                "Module": "accounts",
                "FieldName": "СчетДебета",
                "ID": "2233",
                "Deep": "1",
                "EditStyle": "16",
                "Options": "1056",
                "TitleAjust": "1",
                "TextAjust": "1",
                "Width": "80",
                "OnHint": "1"
            },
            {
                "Title": "Кредит",
                "DataType": "2172",
                "Module": "accounts",
                "FieldName": "СчетКредита",
                "ID": "2234",
                "Deep": "1",
                "EditStyle": "16",
                "Options": "1056",
                "TitleAjust": "1",
                "TextAjust": "1",
                "Width": "80",
                "OnHint": "1"
            },
            {
                "Title": "№ журн.",
                "DataType": "23004",
                "Module": "clsbook",
                "FieldName": "ClassNo",
                "ID": "2235",
                "Deep": "1",
                "EditStyle": "17",
                "Options": "9218",
                "TitleAjust": "1",
                "TextAjust": "1",
                "Width": "50"
            },
            {
                "Title": "Внутривед(Безвозмезд)перемещение",
                "CheckField": "MoveIn",
                "DataType": "2172",
                "Module": "accounts",
                "FieldName": "СчетДоходов",
                "ID": "5424",
                "EditStyle": "21",
                "Width": "80"
            },
            {
                "Title": "Организация",
                "DataType": "2310",
                "Module": "organizations",
                "FieldName": "AccProfitOrgan",
                "ID": "8449",
                "Deep": "1",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "100"
            },
            {
                "Title": "Раздел БК",
                "DemandParams": "1",
                "DataType": "3057",
                "Module": "documents",
                "FieldName": "AccProfitClassifiers",
                "ID": "8323",
                "Deep": "1",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "80",
                "OnEdit": "2047"
            },
            {
                "Title": "МОЛ/Месторасположение",
                "DataType": "3298",
                "Module": "documents",
                "FieldName": "C_Point",
                "ID": "15358",
                "EditStyle": "17",
                "Options": "768",
                "Width": "150"
            },
            {
                "Title": "МОЛ/Месторасположение",
                "DataType": "3298",
                "Module": "documents",
                "FieldName": "ТекстМесторасположения",
                "ID": "16065",
                "EditStyle": "16",
                "Width": "150",
                "OnEdit": "4921"
            },
            {
                "Title": "Мат. отв. лицо",
                "DataType": "2040",
                "Module": "persons",
                "FieldName": "Person",
                "ID": "2238",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "120"
            },
            {
                "Title": "Комиссия",
                "DataType": "3024",
                "Module": "documents",
                "FieldName": "Committee",
                "ID": "2969",
                "Deep": "1",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "100"
            },
            {
                "Title": "Заключение комиссии",
                "DataType": "1",
                "FieldName": "Conclusion",
                "ID": "5260",
                "Deep": "1",
                "Options": "2",
                "Width": "100"
            },
            {
                "Title": "Основание для составления акта",
                "DataType": "5544",
                "Module": "books",
                "FieldName": "Osnovanie",
                "ID": "5261",
                "Deep": "1",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "80"
            },
            {
                "Title": "Номер",
                "DataType": "10",
                "FieldName": "NomerOsnovanija",
                "ID": "8646",
                "Deep": "1",
                "EditStyle": "8",
                "Options": "2",
                "Width": "60"
            },
            {
                "Title": "Дата",
                "DataType": "6",
                "FieldName": "DataOsnovanija",
                "ID": "8647",
                "Deep": "1",
                "EditStyle": "2",
                "Options": "2",
                "Width": "60"
            },
            {
                "Title": "Место",
                "DataType": "5548",
                "Module": "books",
                "FieldName": "Place",
                "ID": "11667",
                "EditStyle": "17",
                "Options": "9218",
                "Width": "80"
            },
            {
                "Title": "Сумма",
                "FieldName": "ОбщаяСумма",
                "ID": "2240",
                "EditStyle": "16",
                "Options": "132",
                "TitleAjust": "1",
                "TitleTextStyle": "1",
                "Width": "75"
            },
            {
                "Title": "Амортизация в т.ч.",
                "FieldName": "ИтогоИзнос",
                "ID": "2443",
                "EditStyle": "16",
                "Options": "132",
                "TitleTextStyle": "1",
                "Width": "75"
            },
            {
                "Title": "Счет списания копеек",
                "DataType": "2172",
                "Module": "accounts",
                "FieldName": "FracAccount",
                "ID": "2239",
                "EditStyle": "16",
                "Options": "26402",
                "TitleAjust": "1",
                "TextAjust": "1",
                "Width": "80",
                "OnHint": "1"
            },
            {
                "Title": "Счет списания объектов",
                "DataType": "2172",
                "Module": "accounts",
                "FieldName": "RelizeAccount",
                "ID": "2749",
                "EditStyle": "16",
                "Options": "26402",
                "Width": "80",
                "OnHint": "1"
            },
            {
                "Title": "Итого к списанию",
                "FieldName": "ИтогоСписано",
                "ID": "2750",
                "EditStyle": "16",
                "Options": "132",
                "Width": "60"
            },
            {
                "Title": "Электронная подпись",
                "DataType": "3473",
                "Module": "documents",
                "FieldName": "DSignDoc",
                "ID": "16879",
                "EditStyle": "16",
                "Options": "33806",
                "TitleAjust": "1",
                "Width": "120"
            },
            {
                "Title": "Пользователь ЭП",
                "DataType": "2425",
                "Module": "usercfg",
                "FieldName": "DSignUser",
                "ID": "16880",
                "EditStyle": "1",
                "Options": "41998",
                "TitleAjust": "1",
                "Width": "120"
            },
            {
                "Title": "Электронные подписи",
                "DataType": "1",
                "FieldName": "ОписаниеЭЦП",
                "ID": "16881",
                "Options": "4",
                "TitleAjust": "1",
                "Width": "120"
            },
            {
                "Title": "Комментарий ЭП",
                "DataType": "9",
                "FieldName": "CommentEP",
                "ID": "17156",
                "EditStyle": "16",
                "TitleAjust": "1",
                "Width": "120"
            },
            {
                "Title": "Списать объекты ОС стоимость до 10 тыс",
                "DataType": "4",
                "FieldName": "CheckDebit",
                "ID": "18132",
                "EditStyle": "4",
                "Options": "4",
                "Width": "200"
            },
            {
                "Title": "Документы архива",
                "DataType": "1",
                "FieldName": "ArchiveDocs",
                "ID": "22476",
                "Options": "41986",
                "TitleAjust": "1"
            },
            {
                "Title": "Вид затрат",
                "DataType": "23156",
                "Module": "clsbook",
                "FieldName": "VidZatrat",
                "ID": "18226",
                "EditStyle": "17",
                "Options": "9218"
            }
        ],
        "Details": {
            "items": [
                {
                    "DocCfgID": "3314",
                    "Caption": "Параметры",
                    "Name": "Параметры",
                    "Hidden": "1",
                    "ImageFields": "Status"
                },
                {
                    "DocCfgID": "3031",
                    "Caption": "Суммы",
                    "Name": "Суммы",
                    "ImageFields": "Status",
                    "items": [
                        {
                            "DocCfgID": "3291",
                            "Caption": "Аналитика",
                            "Name": "Аналитика",
                            "Hidden": "1",
                            "ImageFields": "Status"
                        },
                        {
                            "DocCfgID": "3188",
                            "Caption": "Параметры",
                            "Name": "Параметры",
                            "Hidden": "1",
                            "ImageFields": "Status"
                        }
                    ]
                },
                {
                    "DocCfgID": "3714",
                    "Caption": "Приложения",
                    "Name": "Приложения",
                    "ImageFields": "Status"
                }
            ]
        },
        "Tools": {},
        "Params": {
            "Path": "Documents\\Params\\3030\\108",
            "Title": "Документы\\3030\\Параметры",
            "ParamMapID": "551",
            "NextID": "16",
            "fix": "1",
            "Version": "77250509",
            "Items": [
                {
                    "ID": "15",
                    "EditStyle": "2",
                    "ShortName": "НачальнаяДата",
                    "DataType": "4",
                    "Name": "Начальная дата",
                    "ObjRef": "44470",
                    "Value": "2021-10-01",
                    "EditVal": "2021-10-01"
                },
                {
                    "ID": "16",
                    "EditStyle": "2",
                    "ShortName": "КонечнаяДата",
                    "DataType": "4",
                    "Name": "Конечная дата",
                    "ObjRef": "44500",
                    "Value": "2021-10-31",
                    "EditVal": "2021-10-31"
                },
                {
                    "ID": "805",
                    "Name": "Статус документа",
                    "ShortName": "Статус",
                    "DataType": "15",
                    "EditStyle": "65",
                    "Options": "32",
                    "MapID": "231",
                    "OrderNo": "1",
                    "OnInitialize": "-918",
                    "FieldName": "Status",
                    "Value": "(не учитывать)",
                    "EditVal": "(не учитывать)",
                    "Values": {
                        "item0": "(не учитывать)",
                        "item1": {
                            "id": "1",
                            "text": "Новые документы"
                        },
                        "item2": {
                            "id": "2",
                            "text": "Редактируемые"
                        },
                        "item3": {
                            "id": "3",
                            "text": "Проведенные"
                        },
                        "item4": {
                            "id": "4",
                            "text": "Закрытые"
                        },
                        "item5": {
                            "id": "5",
                            "text": "Закрытые и проведенные"
                        },
                        "item6": {
                            "id": "6",
                            "text": "Архивные"
                        },
                        "item7": {
                            "id": "7",
                            "text": "Новые и редактируемые"
                        },
                        "item8": {
                            "id": "8",
                            "text": "Отклоненные"
                        },
                        "item9": {
                            "id": "9",
                            "text": "Аннулированные"
                        }
                    }
                },
                {
                    "ID": "806",
                    "Name": "Пользователь",
                    "ShortName": "Пользователь",
                    "DataType": "2425",
                    "Module": "usercfg",
                    "EditStyle": "1",
                    "Options": "32",
                    "MapID": "231",
                    "OnDropDown": "-3563",
                    "OrderNo": "2",
                    "OnInitialize": "-918",
                    "FieldName": "Polzovatel",
                    "ObjRef": "312",
                    "Value": "Марусов Алексей Игоревич",
                    "EditVal": "Марусов Алексей Игоревич"
                },
                {
                    "ID": "1",
                    "Name": "Вид документа",
                    "ShortName": "Основание",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "23026",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                },
                {
                    "ID": "2",
                    "Name": "Учреждение",
                    "ShortName": "КСП",
                    "EditStyle": "21",
                    "CLSID": "{55682830-87CC-41E5-95AA-B4EC38177C48}",
                    "DataType": "2773",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "MultiCheckSet": "8193",
                    "Module": "departments"
                },
                {
                    "ID": "3",
                    "Name": "Организация",
                    "ShortName": "ОрганСчДоходов",
                    "EditStyle": "21",
                    "CLSID": "{9AD86284-480E-11D4-A4C7-0000E8D9CBDB}",
                    "DataType": "2310",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "MultiCheckSet": "8193",
                    "Module": "organizations"
                },
                {
                    "ID": "4",
                    "Name": "Дебет",
                    "ShortName": "Дебет",
                    "EditStyle": "20",
                    "CLSID": "{280F0860-87F8-11D4-91A4-000021670179}",
                    "DataType": "2170",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "Options": "8",
                    "Module": "accounts"
                },
                {
                    "ID": "5",
                    "Name": "Кредит",
                    "ShortName": "Кредит",
                    "EditStyle": "20",
                    "CLSID": "{280F0860-87F8-11D4-91A4-000021670179}",
                    "DataType": "2170",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "Options": "8",
                    "Module": "accounts"
                },
                {
                    "ID": "6",
                    "Name": "Источник",
                    "ShortName": "Источник",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "2463",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                },
                {
                    "ID": "7",
                    "Name": "Раздел БК",
                    "ShortName": "Раздел",
                    "EditStyle": "21",
                    "CLSID": "{28310E51-82FA-11D4-A51F-0000E8D9CBDB}",
                    "DataType": "3057",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "Options": "8",
                    "Module": "documents"
                },
                {
                    "ID": "8",
                    "Name": "Мат. отв. лицо",
                    "ShortName": "МОЛ",
                    "EditStyle": "21",
                    "CLSID": "{8B3130A0-5E48-11D4-91A4-000021670179}",
                    "DataType": "2040",
                    "NameStyle": "2",
                    "NameColor": "8388608",
                    "MultiCheckSet": "8193",
                    "Module": "persons"
                },
                {
                    "ID": "25485",
                    "Name": "Отбор по датам",
                    "ShortName": "РежимДаты",
                    "DataType": "15",
                    "EditStyle": "65",
                    "Options": "32",
                    "MapID": "231",
                    "OrderNo": "3",
                    "OnInitialize": "-918",
                    "FieldName": "RezhimDaty",
                    "Value": "по дате документа",
                    "EditVal": "по дате документа",
                    "Values": {
                        "item0": "по дате документа",
                        "item1": {
                            "id": "1",
                            "text": "по дате проведения"
                        }
                    }
                },
                {
                    "ID": "9",
                    "Name": "Мероприятие",
                    "ShortName": "!Детализация",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "23018",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                },
                {
                    "ID": "10",
                    "Name": "Суб-ЭКР",
                    "ShortName": "!Детализация2",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "23038",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                },
                {
                    "ID": "11",
                    "Name": "Код субсидии",
                    "ShortName": "!Детализация3",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "23100",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                },
                {
                    "ID": "12",
                    "Name": "Направление расхода",
                    "ShortName": "!Детализация4",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "23059",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                },
                {
                    "ID": "13",
                    "Name": "Код целевых средств",
                    "ShortName": "!Детализация5",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "23107",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                },
                {
                    "ID": "14",
                    "Name": "Тип денежных средств",
                    "ShortName": "!Детализация6",
                    "EditStyle": "21",
                    "CLSID": "{CE060203-147F-11D5-98B1-000021E6A31F}",
                    "DataType": "2467",
                    "MultiCheckSet": "8193",
                    "Module": "clsbook"
                }
            ]
        },
        "Forms": [
            {
                "ID": "182",
                "Name": "Акт приемки объектов НФА"
            },
            {
                "ID": "318",
                "Name": "Ведомость выдачи материалов"
            },
            {
                "ID": "501",
                "Name": "Товарная накладная"
            },
            {
                "ID": "519",
                "Name": "Требование-накладная"
            },
            {
                "ID": "652",
                "Name": "Приходный ордер"
            },
            {
                "ID": "733",
                "Name": "Извещение"
            },
            {
                "ID": "786",
                "Name": "Акт о модернизации"
            },
            {
                "ID": "674",
                "Name": "Акт приемки-передачи ОС-1"
            }
        ],
        "Samples": {},
        "Status": [
            {
                "Caption": "Новый документ",
                "Status": "0"
            },
            {
                "Caption": "Редактируется",
                "Image": "1",
                "Status": "1"
            },
            {
                "Image": "2",
                "Status": "2"
            },
            {
                "Caption": "Закрыт",
                "Image": "3",
                "Status": "3"
            }
        ]
    }
];