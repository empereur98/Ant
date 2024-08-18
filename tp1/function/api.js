/**
 * 
 * @param {string} url 
 * @param {object} option 
 * @returns {[]}
 */
export async function FetchJson(url,option={}){
    const headers={Accept:'Application/json',...option.headers}
    try {
      const r=await fetch(url,{headers,...option})
    if (r.ok) {
       return r.json()
    }
    throw new Error("erreur serveur")
    } catch (error) {
      
    } 
 }