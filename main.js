$(function(){
    $('#month, #day').on('change', function(e) {
        e.stopPropagation()
        changeNumberOfDays()
    })
})

const baseUrl = 'https://zukan.pokemon.co.jp/detail/'

const dateByMonthInleapYear = {
    1 : 31,
    2 : 29,
    3 : 31,
    4 : 30,
    5 : 31,
    6 : 30,
    7 : 31,
    8 : 31,
    9 : 30,
    10 : 31,
    11 : 30,
    12 : 31
}

function changeNumberOfDays() {
    const selectedMonth = $('#month').val()
    const selectedDay = $('#day').val()

    displayOnlyTheDaysOfTheSelectedMonth(selectedMonth, selectedDay)
    const convertedDay = $('#day').val()

    let theNumberOfDays = getTheNumberOfDays(selectedMonth, convertedDay)
    $('.numberOfDays').text(theNumberOfDays)
    let url = baseUrl + ( '0000' + theNumberOfDays ).slice( -4 )
    $('#resulLink').attr("href", (url))
    $('#resulLink').text(url)
    $('.inputedMonth').text(selectedMonth)
    $('.inputedDay').text(convertedDay)
}

function displayOnlyTheDaysOfTheSelectedMonth(selectedMonth, selectedDay) {
    const maxDateOfSelectedMonth = dateByMonthInleapYear[selectedMonth]
    const currentNumberOfDays = $('#day option').length
    if (maxDateOfSelectedMonth < selectedDay) {
        $('#day option[value="' + maxDateOfSelectedMonth + '"]').prop('selected', true)
    }

    if (maxDateOfSelectedMonth < currentNumberOfDays) {
        $('#day option:nth-child(n + ' + (maxDateOfSelectedMonth + 1) + ')').remove()
    } else if (maxDateOfSelectedMonth > currentNumberOfDays) {
        const dateDifference = maxDateOfSelectedMonth - currentNumberOfDays
        for (let d = currentNumberOfDays + 1; d <= maxDateOfSelectedMonth; d++) {
            $('#day').append($('<option value="' + d + '">' + d +'</option>'))
        }
    }
}

function getTheNumberOfDays(month, day) {
    let theNumberOfDays = 0
    for (let i = 1; i < month; i++) {
        theNumberOfDays += dateByMonthInleapYear[i]
    }

    theNumberOfDays += parseInt(day)

    return theNumberOfDays
}
