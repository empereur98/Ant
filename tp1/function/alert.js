/**
 * message d'alerte
 * @param {string} message 
 * @param {string} type
 * @return {HTMLElement}
 */

export function AlertElement(message,type='danger'){
    /**
     * @type {HTMLElement}
     */
    const alert=document.querySelector('#alert').content.firstElementChild.cloneNode(true)
    alert.classList.add(`alert-${type}`)
    alert.querySelector('.js-text').textContent=message
    const btn=alert.querySelector('.btn-close')
    btn.addEventListener('click',()=>alert.remove())
    alert.dispatchEvent(new CustomEvent('close'))
    return alert  
}