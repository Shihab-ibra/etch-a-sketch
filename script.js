function createGrid(rowSize, colSize) {
  let grid = [];
  for (let i = 0; i < rowSize; i++) {
    grid[i] = document.createElement('div');
    grid[i].classList.add('rows');
    
    let pixels = [];
    for (let j = 0; j < colSize; j++) {
      pixels[j] = document.createElement('div');
      pixels[j].classList.add('pixel');
    }
    
    grid[i].append(...pixels);
  }
  return grid;
}

(() => {

  const buttonsEl = document.querySelectorAll('.grid-buttons .button');
  const gridCont = document.getElementById('grid-container');
  const rangeSlider = document.getElementById('rangeSlider');
  const colorBtn = document.getElementById('color');

  let buttonStates = {
    eraser: false,
  };

  let prevBtn = null;
  let gridWidth, gridHeight;
  gridWidth = gridHeight = rangeSlider.min;
  let grid = createGrid(gridWidth, gridHeight);
  gridCont.append(...grid);

  buttonsEl.forEach(btn => btn.addEventListener('click', changeState));

  rangeSlider.addEventListener('change', changeSize);

  gridCont.addEventListener(
    'mouseover', event => {
      if (!event.target.classList.contains("pixel")) {
        return;

      } else {
        draw(event.target);
      }
    });
  
  function changeState(event) {
    let btn = event.target;
    let isToggledBtn = btn.classList.contains('toggle-btn');

    if (isToggledBtn) {
      if (prevBtn !== null && btn.classList.contains('active')) {
        prevBtn.classList.remove('active');
        buttonStates[prevBtn.id] = false;
      } else {
        btn.classList.add('active');
        buttonStates[btn.id] = true;
      }
      prevBtn = btn;
    }

    if (btn.id === 'clear') {
      prevBtn?.classList.remove('active');
      buttonStates.eraser = false;
      clearSketch();
    }
  }

  function clearSketch() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pxl => pxl.style.backgroundColor = 'transparent');
  }
  
  function changeSize(event) {
    const tempSliderValue = event.target.value;
    const sliderValue = document.getElementById('rangeValue');
    sliderValue.textContent = `${tempSliderValue} x ${tempSliderValue}`;
    grid = createGrid(tempSliderValue, tempSliderValue);
    gridCont.innerHTML = '';
    gridCont.append(...grid);
  }
  
  function draw(pixel) {
    let chosenColor = colorBtn.value;
    let isErase = buttonStates['eraser'];

    isErase 
      ? pixel.style.backgroundColor = 'transparent'
      : pixel.style.backgroundColor = chosenColor;
  }
})();