const hamburger = document.getElementById("h-menu")
const nav = document.getElementById("nav")
const closeIcon = document.querySelector('.close')
const openIcon = document.querySelector('.open')
const hi = document.getElementById('hi')
const ispan = document.getElementById('i-span')
const img = document.querySelectorAll('.img')
const myForm = document.getElementById("myForm")




window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });


window.addEventListener('scroll', ()=>{
    const triggerBottom = window.innerHeight / 5 * 4

    img.forEach(img => {
        const rect = img.getBoundingClientRect().top
        if(rect < triggerBottom) {
            img.classList.add('img-animation')
        }else{
            img.classList.remove('img-animation')
        }
    })

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






const submitFormHandler = async () => {
    const name = document.getElementById("name").value  
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value
    
  
    
if(name,email,message){
    
   const data = await axios.post('/message', {name, email, message}) 

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




   /*
window.addEventListener("scroll", ()=>{
     
    const triggerBottom = window.innerHeight / 5 * 8

    const hiTop = hi.getBoundingClientRect().top

    if(hiTop < triggerBottom) {
        hi.classList.add('animate__animated', 'animate__bounceInLeft')
    }else{
        hi.classList.remove('animate__animated', 'animate__bounceInLeft')
    }
    
 
    const scrollPosition = window.pageYOffset / 10
    
    if(navBarTop < scrollPosition) {
        navBar.classList.add('nav-active')
    }else{
        navBar.classList.remove('nav-active')
    }
   
    
})
 */




















































/**
 * const toggleMenu = ()=> {
    if (nav.classList.contains("nav-show")) {
      nav.classList.remove("nav-show");
     
    } else {
      nav.classList.add("nav-show");

    }
  }
  
  hamburger.addEventListener("click", toggleMenu);
 */





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/**
 * window.addEventListener("scroll", ()=>{
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





 */


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




{/**
    
 */}
