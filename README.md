## Tesla Model Y Configurator site

## Overview
This is a simple site showcasing a tesla model Y configurator, where you can change the color, wheels and choose for an array of options various other options. It is built using HTML, CSS, tailwind as the framework of choice and vanilla Javascript. The project idea was gotten from Traversy media youtube channel with slight modifications

## Screenshot
![Site Image](./images/screen.jpg)

## Built with
- Semantic HTML5 markup
- Mobile-first workflow
- Tailwind CSS
- Javascript

```js
//Update exterior Image based on color and wheels
function updateExteriorImage(){
     const performance = selectedOptions['Performance Wheels'] ? '-performance' : '';
     const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
     exteriorImage.src = exteriorImages[colorKey].replace('.jpg', `${performance}.jpg`)
}

//Wheel Selection
function handleWheelSelection(event){
     if(event.target.tagName === 'BUTTON'){
          const buttons = document.querySelectorAll('#wheel-buttons button');
          buttons.forEach(btn => btn.classList.remove('bg-gray-700','text-white'));

          //Add selected styles to clicked buttons
          event.target.classList.add('bg-gray-700','text-white');

          selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance')
          updateExteriorImage()

          updateTotalPrice()
          
     }

}
```

## Author
-  Twitter - [@SamOtuonye](https://www.twitter.com/SamOtuonye)

## Ackwoledgments
- https://www.youtube.com/@TraversyMedia