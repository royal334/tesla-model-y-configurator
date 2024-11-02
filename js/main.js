const topBar = document.getElementById("top-bar");
const exteriorColorSection = document.getElementById("exterior-buttons");
const interiorColorSection = document.getElementById("interior-buttons");  
const exteriorImage = document.getElementById("exterior-image");
const interiorImage = document.getElementById("interior-image");
const wheelBtns = document.getElementById("wheel-buttons");
const performancebtn = document.getElementById('performance-btn');
const totalPrice = document.getElementById("total-price");
const fullSelfDrivingCheckbox = document.getElementById('full-self-driving-checkbox');
const accessoriesCheckboxes = document.querySelectorAll('.accessory-form-checkbox')
const downPaymentElement = document.getElementById("down-payment");
const monthlyPaymentElement = document.getElementById("monthly-payment");

const basePrice = 52490;
let currentPrice = basePrice

let selectedColor = 'Stealth Grey'

const selectedOptions = {
     'Performance Wheels' : false,
     'Performance Package' : false,
     'Full Self-Driving' : false,
}

const pricing = {
     'Performance Wheels' : 2500,
     'Performance Package' : 5000,
     'Full Self-Driving' : 8500,
     'Accessories':{
          'Center Console Trays': 35,
          'Sunshade' : 105,
          'All-Weather Interior Liners' : 225,
     }
}

// Update total price
function updateTotalPrice(){
     //Reset the current Price to the base price
     currentPrice = basePrice

     if(selectedOptions['Performance Wheels']){
          currentPrice += pricing['Performance Wheels'];
     }

     if(selectedOptions['Performance Package']){
          currentPrice += pricing ['Performance Package']
     }

     if(selectedOptions['Full Self-Driving']){
          currentPrice += pricing['Full Self-Driving']
     }

     //Accessory checkboxes
     accessoriesCheckboxes.forEach(checkbox => { 
          const accessoryLabel= checkbox.closest('label').querySelector('span').textContent.trim();
          const accessoryPrice = pricing['Accessories'][accessoryLabel];
          if(checkbox.checked){
               currentPrice += accessoryPrice;
          }
     });

     
     //Update the total price in the UI
     totalPrice.textContent = `$${currentPrice.toLocaleString()}`;
     updatePaymentBreakdown();
}

//Updating payment breakdown
function updatePaymentBreakdown(){
     //Calculate the down payment
     const downPayment = currentPrice * 0.1;
     downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;

     //Calculate Loan details
     const loanMonths = 60;
     const intrestRate = 0.03;
     const loanAmount = currentPrice - downPayment;

     //Monthly Payment
     const monthlyIntrestRate = intrestRate / 12;
     
     const monthlyPayment = loanAmount * ((monthlyIntrestRate * Math.pow((1 + monthlyIntrestRate),loanMonths))/(Math.pow((1 + monthlyIntrestRate),loanMonths) - 1))
     monthlyPaymentElement.textContent = `$${monthlyPayment.toFixed(2).toLocaleString()}`
     
}


//Handle top bar On Scroll
function handleScroll(){
     const atTop = window.scrollY === 0;
     topBar.classList.toggle('visible-bar', atTop);
     topBar.classList.toggle('hidden-bar', !atTop);
}

// Image Mapping
const exteriorImages = {
     'Stealth Grey': '/images/model-y-stealth-grey.jpg',
     'Pearl White': '/images/model-y-pearl-white.jpg',
     'Deep Blue Metallic': '/images/model-y-deep-blue-metallic.jpg',
     'Solid Black': '/images/model-y-solid-black.jpg',
     'Ultra Red': '/images/model-y-ultra-red.jpg',
     'Quicksilver': '/images/model-y-quicksilver.jpg',
}

const interiorImages = {
     'Dark' : '../images/model-y-interior-dark.jpg',
     'Light' : '../images/model-y-interior-light.jpg'
}


//Handle Colour Selection
const handleColorButton = (event) => {
     let button;

     if(event.target.tagName === 'IMG'){
          button= event.target.closest('button')
     }
     else if (event.target.tagName === "BUTTON") {
          button = event.target
     }


     if(button){
          const buttons = event.currentTarget.querySelectorAll('button');
          buttons.forEach((btn) => btn.classList.remove('btn-selected'));
          button.classList.add('btn-selected');
     //Change Exterior Image
     if(event.currentTarget === exteriorColorSection){
          selectedColor = button.querySelector('img').alt;
          updateExteriorImage();
     }

     if(event.currentTarget === interiorColorSection){
          const color = button.querySelector('img').alt;
          interiorImage.src = interiorImages[color];
     }
}    
};

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
// Performance Package Selection
function handelperformanceBtn(){
     const isSelected = performancebtn.classList.toggle('bg-gray-700');
     performancebtn.classList.toggle('text-white');
     performancebtn.classList.toggle('hover:bg-gray-400');

     //Update selected Options
     selectedOptions['Performance Package'] = isSelected
     updateTotalPrice()
}
//full self Driving Selection
function fullSelfDrivingChange(){
     const isSelected = fullSelfDrivingCheckbox.checked;
     selectedOptions['Full Self-Driving'] = isSelected;
     updateTotalPrice();

}
// Handle Accessory Checkbox Listeners
accessoriesCheckboxes.forEach(checkbox => {
     checkbox.addEventListener('change', () => updateTotalPrice())
})

//Event Listeners
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener('click', handleColorButton);
interiorColorSection.addEventListener('click',handleColorButton);
wheelBtns.addEventListener('click', handleWheelSelection);
performancebtn.addEventListener('click', handelperformanceBtn);
fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingChange);
updateTotalPrice()