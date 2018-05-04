// Rory Dwyer
// 5/16/2017
//Graphic Design Type lab

function charSet(){

    let charsList = document.getElementById('chars-list');
    let bold = document.getElementById('chars-bold');
    let cond = document.getElementById('chars-cond');
    let book = document.getElementById('chars-book');
    let med = document.getElementById('chars-med');

    bold.addEventListener('click', function() {
        charsList.style.opacity = 0;
        setTimeout(function() {
            charsList.style.fontFamily = "futura-bold";
            charsList.style.opacity = 1;
        }, 500);


    });

    cond.addEventListener('click', function() {
      charsList.style.opacity = 0;
      setTimeout(function() {
          charsList.style.fontFamily = "futura-cond";
          charsList.style.opacity = 1;
      }, 500);
    });

    book.addEventListener('click', function() {
      charsList.style.opacity = 0;
      setTimeout(function() {
          charsList.style.fontFamily = "futura-book";
          charsList.style.opacity = 1;
      }, 500);
    });

    med.addEventListener('click', function() {
      charsList.style.opacity = 0;
      setTimeout(function() {
          charsList.style.fontFamily = "futura-medium";
          charsList.style.opacity = 1;
      }, 500);
    });
}

    function moveSquares() {
        document.getElementById("square-1").style.top = '250px';
        document.getElementById("square-2").style.top = '340px';
        document.getElementById("square-3").style.top = '205px';


        setTimeout(scrollDown, 3000);


    }

    function scrollDown() {
        document.getElementById("scroll-down").style.opacity = 1;
    }

    charSet();

    window.sr = ScrollReveal({ reset: true });
    sr.reveal('.futura-chars-list', { duration: 1000, distance: '20vw', origin: 'left'  });
    sr.reveal('#QA-Q', {duration: 1000, distance: '30vh', origin: 'left', delay: 200});
    sr.reveal('#QA-A', {duration: 1000, distance: '30vh', origin: 'right', delay: 200});
    sr.reveal('.using-img', {duration: 1000, distance: '50vw', origin: 'right', delay: 300}, 100);
