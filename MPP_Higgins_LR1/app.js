// Initialize English alphabet
function EnglishLettersList()
{
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
}

// Generate list of random numbers from 1 to 500 
function BuildList()
{
    const list = [];
    for (let i = 0; i < 100; i++)
    {
        list.push(Math.floor(Math.random() * 500));
    }
    return list;
}

// Sort list
function SortList(lst)
{
    return lst.slice().sort((a, b) => a - b);
}

// Find a first element of sorted list
function GetFirst(lst)
{
    return lst[0];
}

// Find a last element of sorted list
function GetLast(lst)
{
    return lst[lst.length - 1];
}

// Generate segment ends needed for exponential distribution
function EqualSegmentEnds(min, max, count)
{
    const segmentLength = (max - min) / count;
    const ends = [];
    for (let i = 1; i <= count; i++)
    {
        ends.push(min + i * segmentLength);
    }
    ends.push(max);
    return ends;
}

// Exponential distribution
function ExponentialDistribution(o, alphabetPower)
{
    const exponential = x => (1 / o) * Math.exp(-x / o);

    const xValues = Array.from({ length: alphabetPower }, (_, i) => (i + 1) * 0.1 / alphabetPower);
    const yValues = xValues.map(exponential);
    return xValues;
}

function MultiplyItemsInList(a, b)
{
    return a.map((x, i) => x * b[i]);
}

function InsertAtEnd(lst, item)
{
    lst.push(item);
    return lst;
}

// Classify numbers according to segments
function SegmentIndices(numbers, segments)
{
    return numbers.map(num =>
    {
        const index = segments.findIndex(s => s > num);
        return index === -1 ? segments.length - 1 : index;
    });
}

// Transform numbers to letters using english alphabet
function NumbersToLetters(numbers)
{
    const letters = EnglishLettersList();
    return numbers.map(num => letters[num]);
}

// Building a matrix 
function GetCrossOfMatrix(currentItem, innerClassifiedListWithoutFirstItem, innerCurrentClass, innerNextClass)
{
    if (innerClassifiedListWithoutFirstItem.length === 0)
        return 0;

    let result = 0;
    if (innerCurrentClass === currentItem && innerNextClass === innerClassifiedListWithoutFirstItem[0])
        result = 1;

    return result + GetCrossOfMatrix(innerClassifiedListWithoutFirstItem[0], innerClassifiedListWithoutFirstItem.slice(1), innerCurrentClass, innerNextClass);
}

function GetLineOfMatrix(classifiedList, numOfClasses, currentClass)
{
    for (let i = 0; i < numOfClasses; i++)
    {
        const crosses = GetCrossOfMatrix(classifiedList[0], classifiedList.slice(1), currentClass, i);
        process.stdout.write(`${crosses} `);
    }
    console.log("|");
}

function DisplayAllLinesOfMatrix(list, numOfClasses, letters)
{
    process.stdout.write("  ");
    letters.forEach(letter => {
        process.stdout.write(`${letter} `);
    });
    console.log();

    for (let i = 0; i < numOfClasses; i++)
    {
        process.stdout.write(`${letters[i]} `);
        GetLineOfMatrix(list, numOfClasses, i);
    }
    console.log("-");
}

console.log("English Alphabet:");
console.log(EnglishLettersList().join(" "));

const myList = BuildList();
const myList1 = myList.slice();
console.log("Input list:");
console.log(myList.join(" "));

const alphabetPower = 20;
console.log("Alphabet power:");
console.log(alphabetPower);

console.log("Sorted list:");
const sortedList = SortList(myList);
console.log(sortedList.join(" "));

console.log("First element of sorted list:");
console.log(GetFirst(sortedList));

console.log("Last element of sorted list:");
console.log(GetLast(sortedList));

console.log("Exponential distribution");
const points = ExponentialDistribution(1, alphabetPower + 1);
console.log(points.join(", "));

console.log("Segments for exponential distribution");
const exponentialSegment = MultiplyItemsInList(points, EqualSegmentEnds(GetFirst(sortedList), GetLast(sortedList), alphabetPower));
const exponentialSegmentEnds = InsertAtEnd(exponentialSegment, GetLast(sortedList));
console.log(exponentialSegmentEnds.join(" "));

console.log("Segment indices:");
const segmentIndices = SegmentIndices(myList1, exponentialSegmentEnds);
console.log(segmentIndices.join(" "));

console.log("Transform number to letters");
const letters = NumbersToLetters(segmentIndices);
console.log(letters.join(" "));

console.log("Matrix:");
DisplayAllLinesOfMatrix(segmentIndices, exponentialSegmentEnds.length, EnglishLettersList());

require('readline')
    .createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function ()
    {
        process.exit();
    });