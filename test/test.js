const test=document.querySelector("form")
test.addEventListener('submit',(e)=>{
    e.preventDefault()
    const donnee=new FormData(e.currentTarget)
    console.log(e.currentTarget)
    console.log(donnee.get('personne'))
})