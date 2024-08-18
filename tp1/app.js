import { FetchJson } from "./function/api.js"
import {AlertElement} from "./function/alert.js"
class infinitePaginate{
    /**
     * @type {HTMLTemplateElement}
     */
    #template
    /**
     * @type {string}
     */
    #endpoint
    /**
     * @type {HTMLElement}
     */
    #target
    /**
     * @type {IntersectionObserver}
     */
    #observer
    /**
     * @type {boolean}
     */
    #loading=false
    /**
     * @type {object}
     */
    #elements
    /**
     * @type {number}
     */
    #page=0
    /**
     * @type {HTMLElement}
     */
    #loader
    constructor(element) {
        this.#loader=element
        this.#template=document.querySelector(element.dataset.template)
        this.#endpoint=element.dataset.endpoint
        //console.log(this.#endpoint)
        this.#target=document.querySelector(element.dataset.target)
        this.#elements=JSON.parse(element.dataset.elements)
        this.#observer=new IntersectionObserver(entries=>{
            for (const entry of entries) {
                if(entry.isIntersecting){
                    this.#loadMore()
                }
            }
        })
        this.#observer.observe(element)
}
  async #loadMore(){
    if (this.#loading){
      return  // Si déjà en cours de chargement, on ne charge pas de nouveau commentaire
    }
    try {
    this.#loading=true  // On démarre le chargement de nouveaux commentaires
    const url=new URL(this.#endpoint)
    url.searchParams.set('_page',this.#page)
    const comments= await FetchJson(url.toString())
    console.log(url.toString())
    if (this.#page==3) {
      this.#observer.disconnect()
      this.#loader.remove()  // On masque le chargement lorsque on a atteint la dernière page
      return  // On arrête la fonction si on a atteint la dernière page
    }
    for (const comment of comments) {
      const commenttemplate=this.#template.content.cloneNode(true)
      for (const [key,values] of Object.entries(this.#elements)) {
         commenttemplate.querySelector(values).textContent=comment[key]
      }
      this.#target.append(commenttemplate)
    }
    this.#loading=false
    this.#page++  // On incremente la page pour la prochaine requête
    } catch (e) {
      this.#loader.style.display="none"
      const error=AlertElement("erreur de chargement")
      error.addEventListener('close',()=>{
         this.#loader.style.removeProperty('display')
         this.#loading=false
      })
      this.#target.append(error)
    }
  }
}

class FetchForm{
  /**
     * @type {HTMLTemplateElement}
     */
  #template
  /**
   * @type {string}
   */
  #endpoint
  /**
   * @type {HTMLElement}
   */
  #target
  /**
   * @type {object}
   */
  #elements
  /**
   * 
   * @param {HTMLFormElement} form 
   */
  constructor(form){
    this.#template=document.querySelector(form.dataset.template)
    this.#endpoint=form.dataset.endpoint
    this.#elements=JSON.parse(form.dataset.elements)
    console.log(Object.entries(this.#elements))
    this.#target=document.querySelector(form.dataset.target)
    form.addEventListener('submit',(e)=>{
      e.preventDefault()
      this.#submit(e.currentTarget)
    })
  }
  async #submit(form){
      const button=document.querySelector('button')
      button.setAttribute('disable','')
      try {
        const data=new FormData(form)
        const comment=await FetchJson(this.#endpoint, {
          method:'POST',
          body:JSON.stringify(Object.fromEntries(data)),
          headers:{
                 'Content-Type':'application/json'
          }
        })
        console.log(comment)
        const commenttemplate=this.#template.content.cloneNode(true)
        console.log(Object.entries(this.#elements))
        for (const [key,values] of Object.entries(this.#elements)) {
          commenttemplate.querySelector(values).innerText=comment[key]
       }
       form.reset()
       button.removeAttribute('disable')
       this.#target.prepend(commenttemplate)
       form.insertAdjacentElement(
        'beforebegin',
        AlertElement("commentaire ajouté avec succès",'success')
       )
       
      } catch (e) {
        const error=AlertElement("erreur serveur")
        form.insertAdjacentElement(
          'beforebegin',
          error
        )
        error.addEventListener('close',()=>{
          button.removeAttribute('disable')
        })
      }

  }
}
document.querySelectorAll(".js-infinite-pagination").forEach(el=>new infinitePaginate(el))
document.querySelectorAll(".fetchform").forEach(form=>new FetchForm(form))
