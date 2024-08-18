/**
 * 
 * @param {string} url 
 * @param {object} option 
 * @returns {[]}
 */
export async function FetchJson(url,option={}){
   const headers={Accept:'Application/json',...option.headers}
   const r=await fetch(url,{headers,...option})
   if (r.ok) {
      return r.json()
   }
   throw new Error("erreur serveur")
}