class Stack {
  constructor() {
    this.iTop = -1;
    this.iArr = [];
  }
  push(iInput) {
    this.iTop++;
    this.iArr[this.iTop] = iInput;
  }
  pop() {
    this.iTop--;
    return this.iArr[this.iTop + 1];
  }
  top() {
    return this.iTop;
  }
  getStack(index) {
      return this.iArr[index];
  }
  isEmpty() {
    if (this.iTop == -1) {
      return true;
    } else {
      return false;
    }
  }
}
// Visualizer for sort algorithms (bubble sort, selection sort, insertion sort, merge sort, heap sort)
class VisualBar {
  constructor(iWidth, xLocation) {
    this.iWidth = iWidth;
    this.xLocation = xLocation;
    // generates a random height
    this.iHeight = Math.floor(Math.random() * (615 - 76));
    // generates a random number proportional to the height of the bar
    this.iData = this.iHeight;
    // each bar has the same y coordinates
    this.yLocation = 76;
    // set to grey by default (for all visual nodes)
    this.rColour = 100;
    this.gColour = 100;
    this.bColour = 100;
  }
  // takes in 3 ints as rgb values to change the colour
  changeColour(newRed, newGreen, newBlue) {
    this.rColour = newRed;
    this.gColour = newGreen;
    this.bColour = newBlue;
  }
  // return the height of bar
  getHeight() {
    return this.iHeight;
  }
  // set a new height for the bar
  setHeight(newHeight) {
    this.iHeight = newHeight;
    this.iData = newHeight;
  }
  disappear() {
    this.changeColour(245, 245, 255);
    this.draw();
  }
  draw() {
    fill(100);
    stroke(255);
    strokeWeight(0);
    fill(this.rColour, this.gColour, this.bColour);
    rect(this.xLocation, this.yLocation, this.iWidth, this.iHeight);
  }
}


// UI elements
// start/reset button
var startButton;
var resetButton;
var drawButton;
// algorithm buttons
var selectedIndex;
var algorithms = ['bubble', 'selection', 'insertion', 'quick'];
var bubbleButton;
var selectionButton;
var insertionButton;
// var quickButton;
// slider
var slider;
var sliderVal;
// create stack
let visualSort = new Stack();
// // set partition index to public
// let partitionIndex;

function setup() {
  // Initialize canvas
  createCanvas(1279, 615);
  background(245, 245, 255);
  fill(0, 100, 100);
  rect(0, 0, width, 75);
  // Initialize UI elements
  //   start/reset button
  startButton = createButton('Start');
  startButton.position(7, 25);
  startButton.mousePressed(sortFunction);
  resetButton = createButton('Reset');
  resetButton.position(50, 25);
  resetButton.mousePressed(reset);
  drawButton = createButton('Draw');
  drawButton.position(100, 25);
  drawButton.mousePressed(initialDraw);
  //   algorithm buttons
  bubbleButton = createButton('Bubble');
  selectionButton = createButton('Selection');
  insertionButton = createButton('Insertion');
  // quickButton = createButton('Quick');
  bubbleButton.position(999, 25);
  selectionButton.position(1055, 25);
  insertionButton.position(1125, 25);
  // quickButton.position(1190, 25);
  bubbleButton.mousePressed(setBubble);
  selectionButton.mousePressed(setSelection);
  insertionButton.mousePressed(setInsertion);
  // quickButton.mousePressed(setQuick);
  //   slider
  slider = createSlider(20, 200, 10, 2);
  slider.position(180, 25);
  slider.style('width', '750px');
}

function delay(time) {
  return new Promise(solve => setTimeout(solve, time));
}

function initialDraw() {
  // create stack
  visualSort = new Stack();
  // background(245, 245, 255);
  // fill(0, 100, 100);
  // rect(0, 0, width, 75);
  for (var i = 0; i < sliderVal; i++) {
    visualSort.push(new VisualBar(width / (sliderVal + 1), i * (width / sliderVal)));
    visualSort.getStack(i).draw();
  }
}

function mouseReleased() {
  sliderVal = slider.value();
  console.log(sliderVal);
}

function sortFunction() {
  switch (algorithms[selectedIndex]) {
    case 'bubble':
      bubbleSort(visualSort);
      break;
    case 'selection':
      selectionSort(visualSort);
      break;
    case 'insertion':
      insertionSort(visualSort);
      break;
    // case 'quick':
    //   quickSort(visualSort, 1,visualSort.top());
    //   break;
  }
}

function reset() {
  clear();
  background(245, 245, 255);
  fill(0, 100, 100);
  rect(0, 0, width, 75);
}
// a function that takes in two visual bars and swaps their heights
function swapBar(bar1 = VisualBar, bar2 = VisualBar) {
  // get each bar's current heights and store them as variables (int)
  var height1 = bar1.getHeight();
  var height2 = bar2.getHeight();
  bar1.setHeight(height2);
  bar2.setHeight(height1);
}
// Functions to set the index of 'algorithms', which will be the algorithm used
function setBubble() {
  selectedIndex = 0;
  console.log(algorithms[selectedIndex]);
  return selectedIndex;
}

function setSelection() {
  selectedIndex = 1;
  console.log(algorithms[selectedIndex]);
  return selectedIndex;
}

function setInsertion() {
  selectedIndex = 2;
  console.log(algorithms[selectedIndex]);
  return selectedIndex;
}
// function setQuick() {
//   selectedIndex = 3;
//   console.log(algorithms[selectedIndex]);
//   return selectedIndex;
// }
// algorithm functions
// Bubble sort algorithm (takes in array of VisualBars) - repeatedly swaps adjacent items if they're in the wrong order
async function bubbleSort(stack = Stack) {
  // countSwaps is here to make sure that the algorithm doesn't go through the array after it's been sorted
  var sorted = false;
  while (!sorted) {
    sorted = true;
    for (var i = 1; i < stack.top() + 1; i++) {
      // element that it is currently on turns blue
      if (stack.getStack(i-1).iData > stack.getStack(i).iData) {
        // move the visual items around the canvas
        stack.getStack(i-1).changeColour(255, 0, 255);
        stack.getStack(i).changeColour(255, 0, 255);
        stack.getStack(i-1).draw();
        stack.getStack(i).draw();
        await delay(10);
        stack.getStack(i-1).disappear();
        stack.getStack(i).disappear();
        stack.getStack(i-1).changeColour(100);
        stack.getStack(i).changeColour(100);
        swapBar(stack.getStack(i-1), stack.getStack(i));
        stack.getStack(i-1).draw();
        stack.getStack(i).draw();
        await delay(500 / (stack.top()+1));
        sorted = false;
      }
    }
  }
  clear();
  background(245, 245, 255);
  fill(0, 100, 100);
  rect(0, 0, width, 75);
  for (var i = 0; i < stack.top() + 1; i++) {
    stack.getStack(i).changeColour(0, 255, 0);
    stack.getStack(i).draw();
  }
  for (var i = 0; i < stack.top(); i++){
    if (!stack.isEmpty()){
      stack.pop();
    } else {
      console.log('Error. Stack is empty.');
    }
  }
}
/* selection sorts algorithm (takes in array of VisualBars) sorts the array by repeatedly finding
    the smallest element and putting it at the beginning
*/
async function selectionSort(stack = Stack) {
  for (var i = 0; i < stack.top(); i++) {
    fill(245, 245,255);
    // sets the index of the smallest element
    var minIndex = i;
    for (var j = i + 1; j < stack.top() + 1; j++) {
      //  this will find the smallest element after the current minimum and set the new index
      if (stack.getStack(j).iData < stack.getStack(minIndex).iData) {
        minIndex = j
      }
    }
    // move the visual bars on canvas
    stack.getStack(minIndex).changeColour(255, 0, 255);
    stack.getStack(i).changeColour(255, 0, 255);
    stack.getStack(minIndex).draw();
    stack.getStack(i).draw();
    await delay(10);
    stack.getStack(minIndex).disappear();
    stack.getStack(i).disappear();
    stack.getStack(minIndex).changeColour(100);
    stack.getStack(i).changeColour(100);
    swapBar(stack.getStack(minIndex), stack.getStack(i));
    stack.getStack(minIndex).draw();
    stack.getStack(i).draw();
    await delay(1250 / (stack.top()+1));
  }
  clear();
  background(245, 245, 255);
  fill(0, 100, 100);
  rect(0, 0, width, 75);
  for (var i = 0; i < stack.top() + 1; i++) {
    stack.getStack(i).changeColour(0, 255, 0);
    stack.getStack(i).draw();
  }
  for (var i = 0; i < stack.top(); i++){
    if (!stack.isEmpty()){
      stack.pop();
    } else {
      console.log('Error. Stack is empty.');
    }
  }
}
// insertion sort algorithm (takes in array of VisualBars) builds the final sorted array, one item at a time
async function insertionSort(stack = Stack) {
  for (var i = 1; i < stack.top()+1; i++) {
    var hole = i - 1;
    // check if the current element is smaller than each of the previous elements
    // shift all the elements that are larger ahead by 1
    while (hole >= 0 && stack.getStack(hole).iData > stack.getStack(hole + 1).iData) {
      stack.getStack(hole + 1).changeColour(255, 0, 255);
      stack.getStack(hole).changeColour(255, 0, 255);
      stack.getStack(hole + 1).draw();
      stack.getStack(hole).draw();
      await delay(10);
      stack.getStack(hole + 1).disappear();
      stack.getStack(hole).disappear();
      stack.getStack(hole + 1).changeColour(100);
      stack.getStack(hole).changeColour(100);
      swapBar(stack.getStack(hole + 1), stack.getStack(hole));
      stack.getStack(hole + 1).draw();
      stack.getStack(hole).draw();
      await delay(850 / (stack.top()+1));
      hole--;
    }
    // insert the current element into the correct spot in array

  }
  clear();
  background(245, 245, 255);
  fill(0, 100, 100);
  rect(0, 0, width, 75);
  for (var i = 0; i < stack.top() + 1; i++) {
    stack.getStack(i).changeColour(0, 255, 0);
    stack.getStack(i).draw();
  }
  for (var i = 0; i < stack.top(); i++){
    if (!stack.isEmpty()){
      stack.pop();
    } else {
      console.log('Error. Stack is empty.');
    }
  }
}


// async function partition(stack = Stack, startIndex, endIndex) {
//   // the pivot is the first element
//   var pivotIndex = startIndex;
//   var low = startIndex+1;
//   var high = endIndex;
  
//   console.log('testing');

//   while (low < high){
//     while (stack.getStack(low).iData <= stack.getStack(pivotIndex).iData) {
//       low++;
//       console.log('low'+low);
//     } 
//     while (stack.getStack(high).iData > stack.getStack(pivotIndex).iData) {
//       high--;
//       console.log('high'+ high);
//     } 

//     if (low < high){
//       console.log('swap high'+high+'swap low'+low);
//       stack.getStack(low).changeColour(255, 0, 255);
//       stack.getStack(high).changeColour(255, 0, 255);
//       stack.getStack(low).draw();
//       stack.getStack(high).draw();
//       await delay(10);
//       stack.getStack(low).disappear();
//       stack.getStack(high).disappear();
//       stack.getStack(low).changeColour(100);
//       stack.getStack(high).changeColour(100);
//       swapBar(stack.getStack(low), stack.getStack(high));
//       stack.getStack(low).draw();
//       stack.getStack(high).draw();
//       await delay(500 / (stack.top()+1));
//     }
//   }
//   if (high != startIndex){
//     stack.getStack(startIndex).changeColour(255, 0, 255);
//     stack.getStack(high).changeColour(255, 0, 255);
//     stack.getStack(startIndex).draw();
//     stack.getStack(high).draw();
//     await delay(10);
//     stack.getStack(startIndex).disappear();
//     stack.getStack(high).disappear();
//     stack.getStack(startIndex).changeColour(100);
//     stack.getStack(high).changeColour(100);
//     swapBar(stack.getStack(startIndex), stack.getStack(high));
//     stack.getStack(startIndex).draw();
//     stack.getStack(high).draw();
//     await delay(500 / (stack.top()+1));
//     console.log('swapping high'+high+'start index'+startIndex);
//     return(high);
//   }
// }
// /* quick sort algorithm (takes in array of VisualTreeNodes then start and end indices as ints)
// picks a pivot and makes it the middle of the array, putting everything larger on one side,
// and everything smaller on the other
// */
// async function quickSort(stack = Stack, startIndex, endIndex) {
//   if (startIndex < endIndex){
//     console.log('sorting');
//     var partitionIndex = partition(stack, startIndex, endIndex);
//     quickSort(stack, startIndex, partitionIndex);
//     quickSort(stack, partitionIndex + 1, endIndex);
//   }
//   else{
//     clear();
//     background(245, 245, 255);
//     fill(0, 100, 100);
//     rect(0, 0, width, 75);
//     for (var i = 0; i < visualSort.top() + 1; i++) {
//       visualSort.getStack(i).changeColour(0, 255, 0);
//       visualSort.getStack(i).draw();
//     }
//   }
// }