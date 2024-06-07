const buttonCount = document.getElementById('button-count')
const labelDay = document.getElementById('label-day')
const labelMonth = document.getElementById('label-month')
const labelYear = document.getElementById('label-year')
const inputDay = document.getElementById('day')
const inputMonth = document.getElementById('month')
const inputYear = document.getElementById('year')
const ageYear = document.getElementById('num-year')
const ageMonth = document.getElementById('num-months')
const ageDay = document.getElementById('num-days')
let error = {
    day: false,
    month: false,
    year: false
}

buttonCount.addEventListener('click', countAge)

function countAge() {
    resetErrorState()
    zeroingResults()
    const validate = validateInput()
}

function validateInput() {
    console.log('validating input...')
    let valid = false;
    if (!inputDay.value) {
        error.day = true
        setErrorMessage('error-day', 'Day is required')
    } else if (inputDay.value < 1 || inputDay.value > 31 || inputDay === NaN) {
        error.day = true
        setErrorMessage('error-day', 'Must be a valid day')
    }
    if (!inputMonth.value) {
        error.month = true
        setErrorMessage('error-month', 'Month is required')
    } else if (inputMonth.value < 1 || inputMonth.value > 12 || inputMonth === NaN) {
        error.month = true
        setErrorMessage('error-month', 'Must be a valid month')
    }

    let birthday = new Date(inputYear.value, inputMonth.value - 1, inputDay.value)

    if (!inputYear.value) {
        error.year = true
        setErrorMessage('error-year', 'Year is required')
    } else if (inputYear.value < 1 || inputYear === NaN) {
        error.year = true
        setErrorMessage('error-year', 'Must be a valid year')
    } else if (birthday > new Date()) {
        error.year = true
        setErrorMessage('error-year', 'Must be in the past')
    }

    if (birthday.getMonth() !== inputMonth.value - 1) {
        error.day = true
        setErrorMessage('error-day', 'Must be a valid date')
    }

    if (!error.day && !error.month && !error.year) {
        valid = true
        const today = new Date()
        calculateAge(birthday, today)
    } else {
        console.log('invalid input')
        setErrorStyle()
        return false
    }
}

function calculateAge(fromDate, toDate) {
    console.log('calculating age...')
    const age = toDate.getFullYear() - fromDate.getFullYear()
    const months = toDate.getMonth() - fromDate.getMonth()
    const days = toDate.getDate() - fromDate.getDate()

    let ageYears = age
    let monthsLeftOver = months
    let daysLeftOver = days

    let yearsResult = 0
    let monthsResult = 0

    while (monthsLeftOver >= 12) {
        yearsResult++
        monthsLeftOver -= 12
    }
    if (monthsLeftOver < 0) {
        yearsResult--
        monthsLeftOver += 12
    }

    yearsResult += ageYears
    monthsResult = monthsLeftOver

    if (daysLeftOver < 0) {
        monthsResult--
        daysLeftOver += 30
    }

    ageYear.textContent = yearsResult
    animateValue(ageYear, 0, yearsResult, 300)
    ageMonth.textContent = monthsResult
    animateValue(ageMonth, 0, monthsResult, 600)
    ageDay.textContent = daysLeftOver
    animateValue(ageDay, 0, daysLeftOver, 900)
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function setErrorMessage(elementId, message) {
    const element = document.getElementById(elementId)
    element.textContent = message
}

function setErrorStyle() {
    if (error.day) {
        labelDay.classList.add('label-error')
        inputDay.classList.add('input-error')
    } else {
        labelDay.classList.remove('label-error')
        inputDay.classList.remove('input-error')
    }

    if (error.month) {
        labelMonth.classList.add('label-error')
        inputMonth.classList.add('input-error')
    } else {
        labelMonth.classList.remove('label-error')
        inputMonth.classList.remove('input-error')
    }

    if (error.year) {
        labelYear.classList.add('label-error')
        inputYear.classList.add('input-error')
    } else {
        labelYear.classList.remove('label-error')
        inputYear.classList.remove('input-error')
    }
}

function resetErrorState() {
    const errorElements = document.querySelectorAll('.error-message')
    errorElements.forEach(element => {
        element.textContent = ''
    })

    error = {
        day: false, month: false, year: false
    }

    setErrorStyle()
}

function zeroingResults() {
    ageYear.textContent = '--'
    ageMonth.textContent = '--'
    ageDay.textContent = '--'
}
