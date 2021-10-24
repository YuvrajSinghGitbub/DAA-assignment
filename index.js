// global stuff for the web stuff -->
let algoheading = document.getElementById("algo-heading");
let algoInfo = document.getElementById("algo-info");
const input = document.getElementById("array-input");
const button = document.getElementById("submit-btn");
const output = document.getElementById("output");
const radioBtn = document.querySelectorAll('.radio-btn');

const infoObject = {
    'selectionSort': ['Selection Sort', 'In computer science, selection sort is an in-place comparison sorting algorithm. It has an O(n2) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort. Selection sort is noted for its simplicity and has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited. The algorithm divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right. The time efficiency of selection sort is quadratic, so there are a number of sorting techniques which have better time complexity than selection sort. One thing which distinguishes selection sort from other sorting algorithms is that it makes the minimum possible number of swaps, n − 1 in the worst case.'],
    'mergeSort': ['Merge Sort', 'In computer science, merge sort (also commonly spelled as mergesort) is an efficient, general-purpose, and comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945. A detailed description and analysis of bottom-up merge sort appeared in a report by Goldstine and von Neumann as early as 1948.'],
    'quickSort': ['Quick Sort', 'Quicksort is an in-place sorting algorithm. Developed by British computer scientist Tony Hoare in 1959 and published in 1961, it is still a commonly used algorithm for sorting. When implemented well, it can be somewhat faster than merge sort and about two or three times faster than heapsort. Quicksort is a divide-and-conquer algorithm. It works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. For this reason, it is sometimes called partition-exchange sort. The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting'],
    'insertionSort': ['Insertion Sort', 'Insertion sort is a sorting algorithm that places an unsorted element at its suitable place in each iteration.Insertion sort works similarly as we sort cards in our hand in a card game.We assume that the first card is already sorted then, we select an unsorted card. If the unsorted card is greater than the card in hand, it is placed on the right otherwise, to the left. In the same way, other unsorted cards are taken and put in their right place.A similar approach is used by insertion sort.']
}



// sorting algorithms -->
const findMinElemet = (currMin, currIndex, unsortedArray) => {

    for (let j = currIndex + 1; j < unsortedArray.length; j++) {
        if (unsortedArray[j] < unsortedArray[currMin]) {
            currMin = j;
        }
    }
    return currMin;
}


const swap = (min, currIndex, unsortedArray) => {

    let temp = unsortedArray[currIndex];
    unsortedArray[currIndex] = unsortedArray[min];
    unsortedArray[min] = temp;

}


const selectionSort = (unsortedArray) => {
    for (let i = 0; i < unsortedArray.length; i++) {
        let min = i;

        min = findMinElemet(min, i, unsortedArray)

        if (min != i) {
            swap(min, i, unsortedArray)
        }
    }
}


const merge = (left, right) => {
    let array = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            array.push(left.shift());
        }
        else {
            array.push(right.shift());
        }
    }

    return [...array, ...left, ...right];
}


const mergeSort = (unsortedArray) => {
    const half = unsortedArray.length / 2;

    if (unsortedArray.length < 2) {
        return unsortedArray;
    }

    const left = unsortedArray.splice(0, half);
    return merge(mergeSort(left), mergeSort(unsortedArray));
}


const partition = (array, start, end) => {
    const pivotValue = array[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
        }
    }

    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    return pivotIndex;
}


const quickSort = (unsortedArray, start = 0, end = unsortedArray.length - 1) => {
    if (start >= end) {
        return;
    }

    let index = partition(unsortedArray, start, end);

    quickSort(unsortedArray, start, index - 1);
    quickSort(unsortedArray, index + 1, end);
}


const insertionSort = (inputArr) => {

    let n = inputArr.length;

    for (let i = 1; i < n; i++) {

        let current = inputArr[i];
        let j = i - 1;

        while ((j > -1) && (current < inputArr[j])) {
            inputArr[j + 1] = inputArr[j];
            j--;
        }
        inputArr[j + 1] = current;
    }
}



// web stuff -->
const verifyTheArray = (inputArray) => {
    inputArray = inputArray.split(',').map(Number);

    if (inputArray.some(item => isNaN(item))) {
        return false;
    }
    return inputArray;
}


const sortingValue = () => {
    let sorting = '';

    for (let btn of radioBtn) {

        if (btn.checked) {
            console.log(btn.value);
            sorting = btn.value;
            break
        }
    }

    return sorting;
}


const doTheDeed = (sortingValue, array) => {
    const availabelSorts = Object.keys(infoObject);

    if (sortingValue === availabelSorts[0]) {
        algoheading.textContent = infoObject.selectionSort[0];
        algoInfo.textContent = infoObject.selectionSort[1];
        selectionSort(array);
    }
    else if (sortingValue === availabelSorts[1]) {
        algoheading.textContent = infoObject.mergeSort[0];
        algoInfo.textContent = infoObject.mergeSort[1];
        mergeSort(array);
    }
    else if (sortingValue === availabelSorts[2]) {
        algoheading.textContent = infoObject.quickSort[0];
        algoInfo.textContent = infoObject.quickSort[1];
        quickSort(array, 0, array.length - 1);
    }
    else if (sortingValue === availabelSorts[3]) {
        algoheading.textContent = infoObject.insertionSort[0];
        algoInfo.textContent = infoObject.insertionSort[1];
        insertionSort(array);
    }
    else {
        algoInfo.textContent = "ERROR";
    }

    output.textContent = `${array}`;
}


button.addEventListener("click", (e) => {

    let sorting = sortingValue();
    const array = verifyTheArray(input.value);

    if (array == 0 || array === NaN) {
        algoInfo.textContent = 'ERROR. Check the inputs and buttons.';
        output.textContent = 'ERROR : (';
    }

    else {
        doTheDeed(sorting, array);
    }

    input.value = "";
});



