const hamburger = document.getElementById("h-menu")
const nav = document.getElementById("nav")
const closeIcon = document.querySelector('.close')
const openIcon = document.querySelector('.open')


const toggleMenu = ()=> {
    if (nav.classList.contains("nav-show")) {
      nav.classList.remove("nav-show");
     
    } else {
      nav.classList.add("nav-show");

    }
  }
  
  hamburger.addEventListener("click", toggleMenu);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', ()=>{
    const fName = document.querySelector('.im')
    const sofDev = document.querySelector('.sd')
    const cybEng = document.querySelector('.ce')
    
    fName.classList.remove('im')
    sofDev.classList.remove('sd')
    cybEng.classList.remove('ce')


})


window.addEventListener("scroll", ()=>{
    const scrollPosition = window.pageYOffset / 10 
    const navBar = document.querySelector('.navBar')

    


    const navBarTop = navBar.getBoundingClientRect().top

    console.log(scrollPosition)
    console.log(navBarTop)

    
    if(navBarTop < scrollPosition) {
        navBar.classList.add('nav-active')
    }else{
        navBar.classList.remove('nav-active')
    }
    
   
    
})


window.addEventListener('scroll', () => {
    const boxes = document.querySelectorAll('.box')
    const triggerBottom = window.innerHeight / 5 * 4


    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top


        if(boxTop < triggerBottom) {
            box.classList.add('show')
        }else{
            box.classList.remove('show')
        }
    })
})




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const myForm = document.getElementById("myForm")


const submitFormHandler = async () => {  
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value
    const name = document.getElementById("name").value
  
    
    if(name,email,message){
    
   const data = await axios.post('/api/message', {name, email, message}) 

   if(data)alert('Message sent!')

   } else {
    error => console.error(error)
   }

 }


myForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    submitFormHandler();
    e.target.reset();
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




{/**
    
 */}
