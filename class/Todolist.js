import { CreateElement } from "../components/dom.js";

export class Todolist{
  #todos;
  #listtodo;
  constructor(todos){
    this.#todos=todos
  }
  appendTo(element){
      this.#listtodo=document.querySelector(".list-group.mt-4")
      const form=document.querySelector("form")
      document.querySelectorAll('.btn-group button').forEach((button)=>
    button.addEventListener('click',(e)=>{this.#togglebutton(e)}))
      form.addEventListener('submit',e=>this.submit(e))
      for (const todo of this.#todos) {
        const tache=new TodoItem(todo)
        tache.appendto(this.#listtodo)
      }
      document.body.addEventListener('delete',({detail:todo})=>{
      this.#todos=this.#todos.filter(t =>t !==todo)
      this.#onUpdate()})
  }
  #togglebutton(e){
    e.preventDefault()
    let filter=e.currentTarget.getAttribute('id')
    console.log(filter)
    if(filter==='fait'){
      this.#listtodo.classList.remove('hide-todo')
      this.#listtodo.classList.add('completed-todo')
    }else if(filter==='pasfait'){
      this.#listtodo.classList.add('hide-todo')
      this.#listtodo.classList.remove('completed-todo')
    }else{
      this.#listtodo.classList.remove('hide-todo')
      this.#listtodo.classList.remove('completed-todo')
    }
  }
  submit(e){
    e.preventDefault()
    const form=e.currentTarget
    console.log(form)
    const tache=new FormData(form).get('tache').toString().trim()
    console.log(tache)
    console.log(tache)
    if (tache==='') {
      return
    }
    let date=new Date()
    let todo={
      userID:1,
      id:date.getMilliseconds(),
      title:tache,
      completed:false
    }
     let todoitem=new TodoItem(todo)
     this.#todos.push(todoitem.donnee(todo))
    this.#onUpdate()
    console.log(this.#todos)
     todoitem.appendto(document.querySelector(".list-group.mt-4"))
     form.reset()
  }
  #onUpdate(){
      
    localStorage.setItem('todos',JSON.stringify(this.#todos))
  }
}

class TodoItem{
  #element
  #todo
   constructor(todo){
    this.#todo=todo
     const li=CreateElement('li',{
      "class":"list-group-item"
     })   
     this.#element=li 
     const div=CreateElement('div',{
      "class":"float-start pt-1"
     })
     const button=CreateElement('button',{
      "class":"btn btn-danger float-end"
     })
     button.addEventListener('click',(e)=>{this.remove(e)})
     button.innerHTML='<i class="bi bi-trash"></i>'
     const input=CreateElement('input',{
      "class":"form-check-input me-1",
      "type":"checkbox",
      "value":"",
      "id":todo.id,
      checked:todo.completed? '': null
     })
     input.addEventListener('change',e=>{this.#toggle(e.currentTarget)})
     const label=CreateElement('label',{
      "class":"form-check-label",
      "for":todo.title
     })
     label.append(todo.title)
     div.append(input)
     div.append(label)
     li.append(div)
     li.append(button)
   }
   appendto(element){
    element.prepend(this.#element)
   }
   check(e){
    e.preventDefault()
    const input=e.currentTarget
    
   }
   remove(e){
    e.preventDefault()
    const li=e.currentTarget.parentElement
    const event=new CustomEvent('delete',{
      detail:this.#todo,
      bubbles:true
     })
     this.#element.dispatchEvent(event)
    li.remove()
   }
   #toggle(checkbox){
       if(checkbox.checked){
        this.#element.classList.add('is_completed')
        this.#todo.completed=true
        localStorage.setItem('todo',this.#todo)
       }else{
        this.#element.classList.remove('is_completed')
        localStorage.setItem('todo',this.#todo)
       }
       const event=new CustomEvent('toggle',{
        detail:this.#todo,
        bubbles:true
       })
       this.#element.dispatchEvent(event)
   }
   donnee(){
    return {
      id:this.#todo.id,
      title:this.#todo.title,
      completed:this.#todo.completed
    }
   }
}