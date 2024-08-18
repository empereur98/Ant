import { FetchJson } from "./functions/api.js";
import { CreateElement,cloneTemplate } from "./components/dom.js";
import { Todolist } from "./class/Todolist.js";
try {
    //const todos=await FetchJson("https://jsonplaceholder.typicode.com/todos?_limit=5")
    //console.log(todos)
    let todos=[]
    const todoinstorage=localStorage.getItem('todos')?.toString()
    if(todoinstorage){
        todos=JSON.parse(todoinstorage)
    }
    document.body.append(cloneTemplate("todolist-layout"))
    const listtodo=new Todolist(todos)
    listtodo.appendTo(document.querySelector("#todolist"))
} catch (error) {
    const alertElement=CreateElement('div',{
        'class':'alert alert-danger'
    })
    alertElement.innerText ="impossible de contacter le serveur"
    document.querySelector("body").prepend(alertElement)
    console.log(error)
}

