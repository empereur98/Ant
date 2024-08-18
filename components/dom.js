/**
 * 
 * @param {HTMLELEMENT} tag 
 * @param {object} option
 * @return {ELEMENT}
 */
export function CreateElement(tag,option={}){
   const cible=document.createElement(tag)
   for (const [attribute,value] of Object.entries(option)) {
      if(value!=null){
         cible.setAttribute(attribute,value)
      }
   }
   return cible
}
export function cloneTemplate(id){
   return document.getElementById(id).content.cloneNode(true)
}