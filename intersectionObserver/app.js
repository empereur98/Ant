let observe=new IntersectionObserver(entries=>{
for (const entry of entries) {
    if(entry.isIntersecting){
        const link=document.querySelectorAll("ul li a")
         for (const iterator of link) {
            if (iterator.getAttribute("href").substring(1)==entry.target.getAttribute("id")) {
                iterator.classList.add("active")
            }
            else{
                iterator.classList.remove("active")
            }
         }
    }
}},{
    threshold:0.4
})
observe.observe(document.getElementById("section1"))
observe.observe(document.getElementById("section2"))
observe.observe(document.getElementById("section3"))
observe.observe(document.getElementById("section4"))