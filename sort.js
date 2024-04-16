const fs = require('fs');

class Sorter {
  constructor(numbers) {
    this.numbers = numbers;
    this.comparisons = 0;
  }

  resetComparisons() {
    this.comparisons = 0;
  }

  bubbleSort() {
    let swapped;
    do {
      swapped = false;
      for (let i = 1; i < this.numbers.length; i++) {
        if (this.numbers[i - 1] > this.numbers[i]) {
          [this.numbers[i - 1], this.numbers[i]] = [this.numbers[i], this.numbers[i - 1]];
          swapped = true;
          this.comparisons++;
        }
      }
    } while (swapped);
    return this.comparisons;
  }

  insertionSort() {
    for (let i = 1; i < this.numbers.length; i++) {
      let current = this.numbers[i];
      let j = i - 1;
      while (j >= 0 && this.numbers[j] > current) {
        this.numbers[j + 1] = this.numbers[j];
        j--;
        this.comparisons++;
      }
      this.numbers[j + 1] = current;
    }
    return this.comparisons;
  }

  selectionSort() {
    for (let i = 0; i < this.numbers.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < this.numbers.length; j++) {
        if (this.numbers[j] < this.numbers[minIndex]) {
          minIndex = j;
          this.comparisons++;
        }
      }
      if (minIndex !== i) {
        [this.numbers[i], this.numbers[minIndex]] = [this.numbers[minIndex], this.numbers[i]];
      }
    }
    return this.comparisons;
  }

  quickSort(arr = this.numbers, left = 0, right = this.numbers.length - 1) {
    const partition = (arr, left, right) => {
      let pivot = arr[left];
      let i = left;
      let j = right;
      while (i <= j) {
        while (arr[i] < pivot) {
          i++;
          this.comparisons++;
        }
        while (arr[j] > pivot) {
          j--;
          this.comparisons++;
        }
        if (i <= j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          i++;
          j--;
        }
      }
      return i;
    }

    if (left < right) {
      let index = partition(arr, left, right);
      if (left < index - 1) {
        this.quickSort(arr, left, index - 1);
      }
      if (index < right) {
        this.quickSort(arr, index, right);
      }
    }
    return this.comparisons;
  }

  sortAndPrint() {
    const originalNumbers = [...this.numbers]; // Save a copy of the original numbers

    console.log(`Original list: ${this.numbers.join(' ')}`);
    this.resetComparisons();
    console.log(`Bubble Sort: ${this.bubbleSort()} comparisons - [${this.numbers.join(', ')}]`);
    this.numbers = [...originalNumbers]; // Reset numbers to original before next sort
    this.resetComparisons();

    console.log(`Insertion Sort: ${this.insertionSort()} comparisons - [${this.numbers.join(', ')}]`);
    this.numbers = [...originalNumbers]; // Reset numbers to original before next sort
    this.resetComparisons();

    console.log(`Selection Sort: ${this.selectionSort()} comparisons - [${this.numbers.join(', ')}]`);
    this.numbers = [...originalNumbers]; // Reset numbers to original before next sort
    this.resetComparisons();

    console.log(`Quick Sort: ${this.quickSort()} comparisons - [${this.numbers.join(', ')}]`);
    // No need to reset here as it's the last sort
  }
}

const main = () => {
  const filename = process.argv[2];
  try {
    const fileContents = fs.readFileSync(filename, 'utf8').trim();
    const numbers = fileContents.split(/\s+/).map(Number);
    const sorter = new Sorter(numbers);
    sorter.sortAndPrint();
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
