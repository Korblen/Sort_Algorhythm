const fs = require('fs');

function merge(left, right, count) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // Concaténer les valeurs dans resultArray dans l'ordre croissant
    while (leftIndex < left.length && rightIndex < right.length) {
        count.comparisons++;  // Compter chaque comparaison
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // déplacer l'index du tableau gauche
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // déplacer l'index du tableau droit
        }
    }

    // Concaténation des tableaux restants
    while (leftIndex < left.length) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
    }
    while (rightIndex < right.length) {
        resultArray.push(right[rightIndex]);
        rightIndex++;
    }

    return resultArray;
}

function mergeSort(array, count) {
    if (array.length <= 1) {
        return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left, count), mergeSort(right, count), count);
}

// Exemple d'utilisation
const main = () => {
    const filename = process.argv[2];
    try {
        const fileContents = fs.readFileSync(filename, 'utf8').trim();
        const numbers = fileContents.split(/\s+/).map(Number);
        let count = { comparisons: 0 }; // Objet pour suivre le nombre de comparaisons
        const sortedNumbers = mergeSort(numbers, count);
        console.log(`Tri fusion: ${count.comparisons} comparaisons - [${sortedNumbers.join(', ')}]`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

main();
